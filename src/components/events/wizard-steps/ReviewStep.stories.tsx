import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import ReviewStep from './ReviewStep';

const meta = {
  title: 'Events/WizardSteps/ReviewStep',
  component: ReviewStep,
  tags: ['autodocs'],
} satisfies Meta<typeof ReviewStep>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = {
  name: 'Festival de Música 2025',
  description: 'Um incrível festival com várias bandas e shows.',
  category: 'Festival',
  startDate: new Date('2025-06-15'),
  endDate: new Date('2025-06-17'),
  startTime: '18:00',
  endTime: '23:00',
  website: 'https://festival.com',
  address: 'Av. das Nações 1000',
  city: 'São Paulo',
  state: 'SP',
  country: 'Brasil',
  venueName: 'Parque Ibirapuera',
  totalArea: '20000',
  capacity: '5000',
  accessibility: true,
  accessibilityInfo: 'Rampas e banheiros adaptados',
  logo: new File([], 'logo.png'),
  banner: new File([], 'banner.jpg'),
  primaryColor: '#3B82F6',
  secondaryColor: '#8B5CF6',
  fontStyle: 'modern',
  organizerName: 'ABC Eventos',
  primaryEmail: 'contato@abc.com',
  phone: '(11) 99999-9999',
  company: 'ABC Ltda',
  teamMembers: [
    { name: 'João', email: 'joao@example.com', role: 'Produção' },
    { name: 'Maria', email: 'maria@example.com', role: 'Marketing' },
  ],
  publicRegistration: true,
  isHybrid: false,
  streamingPlatform: '',
  specialRequirements: '',
  lgpdAccepted: true,
  termsAccepted: true,
};

const emptyData = {
  name: '',
  description: '',
  category: '',
  startDate: null,
  endDate: null,
  startTime: '',
  endTime: '',
  website: '',
  address: '',
  city: '',
  state: '',
  country: 'Brasil',
  venueName: '',
  totalArea: '',
  capacity: '',
  accessibility: false,
  accessibilityInfo: '',
  logo: null,
  banner: null,
  primaryColor: '#3B82F6',
  secondaryColor: '#8B5CF6',
  fontStyle: 'modern',
  organizerName: '',
  primaryEmail: '',
  phone: '',
  company: '',
  teamMembers: [],
  publicRegistration: true,
  isHybrid: false,
  streamingPlatform: '',
  specialRequirements: '',
  lgpdAccepted: false,
  termsAccepted: false,
};

export const Prefilled: Story = {
  args: {
    data: sampleData,
    updateData: fn(),
  },
};

export const Empty: Story = {
  args: {
    data: emptyData,
    updateData: fn(),
  },
};