/* eslint-env jest */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

let mockSignUp: jest.Mock;
let mockProfilesInsert: jest.Mock;
let mockTenantsInsert: jest.Mock;
let mockFrom: any;
const supabaseMock: any = {};

jest.mock('react', () => {
  const React = jest.requireActual('react');
  return { ...React, default: React };
});

// Mock supabase client module directly to avoid import.meta usage
jest.mock('@/utils/supabase/client', () => {
  mockSignUp = jest.fn().mockResolvedValue({ data: { user: { id: 'user-id' } }, error: null });
  mockProfilesInsert = jest.fn().mockResolvedValue({ data: [], error: null });
  mockTenantsInsert = jest.fn().mockReturnValue({
    select: jest.fn().mockReturnValue({
      single: jest.fn().mockResolvedValue({ data: { id: 'tenant-id' }, error: null }),
    }),
  });
  mockFrom = jest.fn((table: string) => {
    switch (table) {
      case 'profiles':
        return { insert: mockProfilesInsert } as any;
      case 'tenants':
        return { insert: mockTenantsInsert } as any;
      case 'brazilian_states':
        return {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          order: jest.fn().mockResolvedValue({ data: [{ id: 'state-1', code: 'SP', name: 'São Paulo' }] }),
        } as any;
      case 'business_segments':
        return {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          order: jest.fn().mockResolvedValue({ data: [{ id: 'segment-1', name: 'Segmento 1' }] }),
        } as any;
      case 'subscription_plans':
        return {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          order: jest.fn().mockResolvedValue({ data: [{ id: 'plan-1', code: 'trial', price_monthly: 0 }] }),
        } as any;
      case 'tenant_statuses':
        return {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValue({ data: { id: 'status-1' } }),
        } as any;
      default:
        return { select: jest.fn(), eq: jest.fn(), order: jest.fn(), insert: jest.fn() } as any;
    }
  });
  const client = { auth: { signUp: mockSignUp }, from: mockFrom };
  Object.assign(supabaseMock, client);
  return { __esModule: true, default: client };
});

// Mock signUp service to use supabase mock and insert profile data
jest.mock('@/services/authService', () => ({
  signUp: jest.fn(async ({ email, password, fullName, firstName, lastName, whatsapp }) => {
    await supabaseMock.auth.signUp({ email, password });
    await supabaseMock.from('profiles').insert([
      {
        id: 'user-id',
        first_name: firstName,
        last_name: lastName,
        full_name: fullName,
        email,
        whatsapp_number: whatsapp ?? null,
      },
    ]);
    return { id: 'user-id', email };
  }),
}));

const mockGetCompany = jest.fn().mockResolvedValue({
  razao_social: 'Empresa Exemplo',
  nome_fantasia: 'Fantasia',
  cnpj: '12345678000199',
  email_contato: 'contato@empresa.com',
  telefone: '1100000000',
  cep: '01001000',
  logradouro: 'Av Paulista',
  numero: '1000',
  bairro: 'Centro',
  cidade: 'São Paulo',
  uf: 'SP',
});

jest.mock('@/hooks/use-cnpj', () => ({
  useCNPJ: () => ({ getCompanyByCNPJ: mockGetCompany }),
}));

const mockToastSuccess = jest.fn();
jest.mock('sonner', () => ({ toast: { success: mockToastSuccess } }));

// Import component after mocks are set up
// eslint-disable-next-line @typescript-eslint/no-require-imports
const EnterpriseOnboardWizardPage = require('@/features/Onboarding/pages/EnterpriseOnboardWizard').default;

test('fluxo feliz: registra usuário e tenant', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <EnterpriseOnboardWizardPage />
    </MemoryRouter>
  );

  // Step 1
  await user.type(screen.getByLabelText(/Primeiro Nome/i), 'John');
  await user.type(screen.getByLabelText(/Último Nome/i), 'Doe');
  await user.type(screen.getByLabelText(/^Email \*/i), 'john@example.com');
  await user.type(screen.getByLabelText(/^Senha \*/i), '123456');
  await user.type(screen.getByLabelText(/Confirmar Senha/i), '123456');

  await user.click(screen.getByRole('button', { name: /Próximo/i }));

  // Step 2
  await user.selectOptions(await screen.findByLabelText(/Segmento principal/i), 'segment-1');

  const cnpjInput = screen.getByLabelText(/CNPJ da Empresa/i);
  await user.type(cnpjInput, '12345678000199');
  cnpjInput.blur();

  await waitFor(() => expect(mockGetCompany).toHaveBeenCalled());
  await waitFor(() => expect((screen.getByLabelText(/Razão Social/i) as HTMLInputElement).value).toBe('Empresa Exemplo'));

  const contactEmail = screen.getByLabelText(/Email de Contato/i);
  await user.clear(contactEmail);
  await user.type(contactEmail, 'contato@empresa.com');

  await user.click(screen.getByRole('button', { name: /Finalizar Cadastro/i }));

  await waitFor(() => expect(mockSignUp).toHaveBeenCalled());

  expect(mockSignUp).toHaveBeenCalledWith(expect.objectContaining({
    email: 'john@example.com',
    password: '123456',
  }));

  expect(mockProfilesInsert).toHaveBeenCalledWith([
    expect.objectContaining({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
    }),
  ]);

  expect(mockTenantsInsert).toHaveBeenCalledWith([
    expect.objectContaining({
      razao_social: 'Empresa Exemplo',
      primary_segment_id: 'segment-1',
      cnpj: '12.345.678/0001-99',
      contact_email: 'contato@empresa.com',
    }),
  ]);

  expect(mockToastSuccess).toHaveBeenCalled();
});

