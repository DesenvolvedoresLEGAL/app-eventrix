import React, { useMemo } from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { useOrganizerData, useBrazilianStates, useBusinessSegments } from '@/hooks/queries/useOrganizerData';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const OrganizerSettings: React.FC = () => {
  const { data: organizerData, isLoading: organizerLoading, error } = useOrganizerData();
  const { data: states } = useBrazilianStates();
  const { data: segments } = useBusinessSegments();

  // Query para buscar usuários vinculados ao tenant
  const { data: linkedUsers, isLoading: usersLoading } = useQuery({
    queryKey: ['linked-users', organizerData?.id],
    queryFn: async () => {
      if (!organizerData?.id) return [];
      
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          email,
          first_name,
          last_name,
          full_name,
          whatsapp_number,
          is_active,
          created_at,
          role,
          user_roles!inner(code, description)
        `)
        .eq('tenant_id', organizerData.id)
        .eq('is_active', true);

      if (error) throw error;
      return data;
    },
    enabled: !!organizerData?.id,
    staleTime: 5 * 60 * 1000,
  });

  // Memoized formatters para evitar recálculos
  const formatters = useMemo(() => ({
    cnpj: (cnpj: string) => cnpj?.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') || 'N/A',
    cep: (cep: string) => cep || 'N/A',
    phone: (phone: string | null) => phone || 'N/A',
    website: (url: string | null) => url || 'N/A',
    date: (date: string) => new Date(date).toLocaleDateString('pt-BR'),
    state: (stateId: string) => states?.find(s => s.id === stateId)?.name || 'N/A',
    segment: (segmentId: string) => segments?.find(s => s.id === segmentId)?.name || 'N/A',
  }), [states, segments]);

  if (organizerLoading) {
    return (
      <DashboardLayout title="Dados da Organização">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-96" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !organizerData) {
    return (
      <DashboardLayout title="Dados da Organização">
        <Card>
          <CardContent className="pt-6">
            <p className="text-destructive">
              Erro ao carregar dados da organização: {error?.message || 'Dados não encontrados'}
            </p>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Dados da Organização">
      <div className="space-y-6">
        {/* Informações da Empresa */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Informações da Empresa</CardTitle>
            <CardDescription>
              Dados cadastrais e institucionais da organização
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium text-muted-foreground">ID:</span>
                  <span className="font-mono text-sm">{organizerData.id}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium text-muted-foreground">Slug:</span>
                  <span>{organizerData.slug}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium text-muted-foreground">Razão Social:</span>
                  <span className="text-right">{organizerData.razao_social}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium text-muted-foreground">Nome Fantasia:</span>
                  <span className="text-right">{organizerData.nome_fantasia || 'N/A'}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium text-muted-foreground">CNPJ:</span>
                  <span className="font-mono">{formatters.cnpj(organizerData.cnpj)}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium text-muted-foreground">Inscrição Estadual:</span>
                  <span>{organizerData.inscricao_estadual || 'N/A'}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium text-muted-foreground">CNAE Principal:</span>
                  <span>{organizerData.cnae_principal || 'N/A'}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium text-muted-foreground">Email de Contato:</span>
                  <span>{organizerData.contact_email}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium text-muted-foreground">Telefone:</span>
                  <span>{formatters.phone(organizerData.contact_phone)}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium text-muted-foreground">WhatsApp:</span>
                  <span>{formatters.phone(organizerData.whatsapp_number)}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium text-muted-foreground">Website:</span>
                  <span className="text-right break-all">{formatters.website(organizerData.website_url)}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium text-muted-foreground">Timezone:</span>
                  <span>{organizerData.timezone}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium text-muted-foreground">Idioma:</span>
                  <span>{organizerData.locale}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium text-muted-foreground">Criado em:</span>
                  <span>{formatters.date(organizerData.created_at)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Endereço */}
        <Card>
          <CardHeader>
            <CardTitle>Endereço</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium text-muted-foreground">Logradouro:</span>
                  <span className="text-right">{organizerData.endereco_logradouro}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium text-muted-foreground">Número:</span>
                  <span>{organizerData.endereco_numero || 'S/N'}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium text-muted-foreground">Complemento:</span>
                  <span className="text-right">{organizerData.endereco_complemento || 'N/A'}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium text-muted-foreground">Bairro:</span>
                  <span className="text-right">{organizerData.endereco_bairro}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium text-muted-foreground">Cidade:</span>
                  <span className="text-right">{organizerData.endereco_cidade}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium text-muted-foreground">CEP:</span>
                  <span className="font-mono">{formatters.cep(organizerData.cep)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Branding */}
        <Card>
          <CardHeader>
            <CardTitle>Identidade Visual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium text-muted-foreground">Cor Primária:</span>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: organizerData.primary_color }}
                    />
                    <span className="font-mono">{organizerData.primary_color}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium text-muted-foreground">Cor Secundária:</span>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: organizerData.secondary_color }}
                    />
                    <span className="font-mono">{organizerData.secondary_color}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium text-muted-foreground">Fonte:</span>
                  <span>{organizerData.font_family}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium text-muted-foreground">Logo URL:</span>
                  <span className="text-right break-all">{organizerData.logo_url || 'N/A'}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium text-muted-foreground">Favicon URL:</span>
                  <span className="text-right break-all">{organizerData.favicon_url || 'N/A'}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usuários Vinculados */}
        <Card>
          <CardHeader>
            <CardTitle>Usuários Vinculados</CardTitle>
            <CardDescription>
              Lista de todos os usuários associados a esta organização
            </CardDescription>
          </CardHeader>
          <CardContent>
            {usersLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : linkedUsers && linkedUsers.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>WhatsApp</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Criado em</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {linkedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.full_name || `${user.first_name} ${user.last_name}`.trim() || 'N/A'}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {(user.user_roles as any)?.description || (user.user_roles as any)?.code || 'N/A'}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.whatsapp_number || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge variant={user.is_active ? "default" : "destructive"}>
                          {user.is_active ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatters.date(user.created_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Nenhum usuário vinculado encontrado.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default OrganizerSettings;