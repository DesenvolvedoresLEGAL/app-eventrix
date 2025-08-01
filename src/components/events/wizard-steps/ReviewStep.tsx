/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Palette, 
  Mail, 
  Settings, 
  Edit3,
  CheckCircle,
  AlertCircle 
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ReviewStepProps {
  data: any;
  updateData: (data: any) => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ data }) => {
  const formatDate = (date: Date | null) => {
    if (!date) return 'Não informado';
    return format(date, 'dd/MM/yyyy', { locale: ptBR });
  };

  const isComplete = (fields: any[]) => {
    return fields.every(field => field);
  };

  const ReviewSection = ({ 
    icon: Icon, 
    title, 
    children, 
    isValid = true 
  }: { 
    icon: any; 
    title: string; 
    children: React.ReactNode; 
    isValid?: boolean;
  }) => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon className="h-5 w-5" />
          {title}
          {isValid ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <AlertCircle className="h-4 w-4 text-destructive" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {children}
      </CardContent>
    </Card>
  );

  const InfoRow = ({ label, value, optional = false }: { label: string; value: any; optional?: boolean }) => (
    <div className="flex justify-between items-center py-1">
      <span className="text-sm font-medium text-muted-foreground">{label}:</span>
      <span className="text-sm">
        {value || (optional ? 'Não informado' : <span className="text-destructive">Obrigatório</span>)}
      </span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Revisão do Evento</h2>
        <p className="text-muted-foreground">
          Confira todas as informações antes de criar o evento
        </p>
      </div>

      {/* Informações Básicas */}
      <ReviewSection 
        icon={Calendar} 
        title="Informações Básicas"
        isValid={isComplete([data.name, data.description, data.category, data.startDate, data.endDate])}
      >
        <InfoRow label="Nome do Evento" value={data.name} />
        <InfoRow label="Descrição" value={data.description} />
        <InfoRow label="Categoria" value={data.category} />
        <InfoRow label="Data de Início" value={formatDate(data.startDate)} />
        <InfoRow label="Data de Término" value={formatDate(data.endDate)} />
        <InfoRow label="Horário de Início" value={data.startTime} optional />
        <InfoRow label="Horário de Término" value={data.endTime} optional />
        <InfoRow label="Site Oficial" value={data.website} optional />
      </ReviewSection>

      {/* Local e Estrutura */}
      <ReviewSection 
        icon={MapPin} 
        title="Local & Estrutura"
        isValid={isComplete([data.address, data.city, data.state])}
      >
        <InfoRow label="Endereço" value={data.address} />
        <InfoRow label="Cidade" value={data.city} />
        <InfoRow label="Estado" value={data.state} />
        <InfoRow label="País" value={data.country} />
        <InfoRow label="Nome do Local" value={data.venueName} optional />
        <InfoRow label="Área Total" value={data.totalArea ? `${data.totalArea} m²` : ''} optional />
        <InfoRow label="Capacidade" value={data.capacity ? `${data.capacity} pessoas` : ''} optional />
        <InfoRow label="Acessibilidade" value={data.accessibility ? 'Sim' : 'Não'} />
        {data.accessibility && (
          <InfoRow label="Info. Acessibilidade" value={data.accessibilityInfo} optional />
        )}
      </ReviewSection>

      {/* Identidade Visual */}
      <ReviewSection 
        icon={Palette} 
        title="Identidade Visual"
        isValid={isComplete([data.logo])}
      >
        <InfoRow label="Logo" value={data.logo ? data.logo.name : ''} />
        <InfoRow label="Banner" value={data.banner ? data.banner.name : ''} optional />
        <div className="flex justify-between items-center py-1">
          <span className="text-sm font-medium text-muted-foreground">Cores:</span>
          <div className="flex gap-2">
            <div 
              className="w-6 h-6 rounded border"
              style={{ backgroundColor: data.primaryColor }}
              title={`Primária: ${data.primaryColor}`}
            />
            <div 
              className="w-6 h-6 rounded border"
              style={{ backgroundColor: data.secondaryColor }}
              title={`Secundária: ${data.secondaryColor}`}
            />
          </div>
        </div>
        <InfoRow label="Estilo de Fonte" value={data.fontStyle} optional />
      </ReviewSection>

      {/* Organizadores */}
      <ReviewSection 
        icon={Users} 
        title="Organizadores e Equipe"
        isValid={isComplete([data.organizerName, data.primaryEmail])}
      >
        <InfoRow label="Organizador Principal" value={data.organizerName} />
        <InfoRow label="Email Principal" value={data.primaryEmail} />
        <InfoRow label="Telefone" value={data.phone} optional />
        <InfoRow label="Empresa" value={data.company} optional />
        <InfoRow label="Membros da Equipe" value={`${data.teamMembers?.length || 0} pessoas`} optional />
        
        {data.teamMembers && data.teamMembers.length > 0 && (
          <div className="mt-3 space-y-1">
            {data.teamMembers.map((member: any, index: number) => (
              <div key={index} className="text-xs bg-muted p-2 rounded">
                <span className="font-medium">{member.name}</span> - {member.email}
                {member.role && <span className="text-muted-foreground"> ({member.role})</span>}
              </div>
            ))}
          </div>
        )}
      </ReviewSection>

      {/* Opções Avançadas */}
      <ReviewSection 
        icon={Settings} 
        title="Opções Avançadas"
        isValid={isComplete([data.lgpdAccepted, data.termsAccepted])}
      >
        <InfoRow label="Inscrição Pública" value={data.publicRegistration ? 'Sim' : 'Não'} />
        <InfoRow label="Evento Híbrido" value={data.isHybrid ? 'Sim' : 'Não'} />
        {data.isHybrid && (
          <InfoRow label="Plataforma de Transmissão" value={data.streamingPlatform} optional />
        )}
        <InfoRow label="Requisitos Especiais" value={data.specialRequirements || 'Nenhum'} optional />
        
        <div className="pt-2 border-t">
          <div className="flex justify-between items-center py-1">
            <span className="text-sm font-medium text-muted-foreground">LGPD Aceito:</span>
            <Badge variant={data.lgpdAccepted ? "default" : "destructive"}>
              {data.lgpdAccepted ? 'Sim' : 'Não'}
            </Badge>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-sm font-medium text-muted-foreground">Termos Aceitos:</span>
            <Badge variant={data.termsAccepted ? "default" : "destructive"}>
              {data.termsAccepted ? 'Sim' : 'Não'}
            </Badge>
          </div>
        </div>
      </ReviewSection>

      {/* Status Geral */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Status do Cadastro</h3>
            <div className="flex justify-center gap-6 mb-4">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-1" />
                <p className="text-sm">Pronto para criar</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Todas as informações obrigatórias foram preenchidas. 
              Seu evento será criado e você poderá começar a configurar agenda, 
              usuários e outras funcionalidades.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewStep;
