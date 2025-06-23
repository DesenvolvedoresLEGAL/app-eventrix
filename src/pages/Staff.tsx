
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import PageWrapper from '@/components/common/PageWrapper';
import StaffList from '@/components/staff/StaffList';

const Staff = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('eventId');

  // Verificar se eventId foi fornecido
  if (!eventId) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Evento Necessário</h2>
            <p className="text-muted-foreground">
              Para gerenciar a equipe, é necessário selecionar um evento específico.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Acesse através da página de eventos ou forneça o parâmetro eventId na URL.
            </p>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <StaffList />
    </PageWrapper>
  );
};

export default Staff;
