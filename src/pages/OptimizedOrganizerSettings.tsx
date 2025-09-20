import React, { useMemo } from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { useOrganizerData, useBrazilianStates, useBusinessSegments } from '@/hooks/queries/useOrganizerData';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const OptimizedOrganizerSettings: React.FC = () => {
  const { data: organizerData, isLoading: organizerLoading, error } = useOrganizerData();
  const { data: states } = useBrazilianStates();
  const { data: segments } = useBusinessSegments();

  // Query para buscar usuários vinculados ao tenant
  const { data: linkedUsers, isLoading: usersLoading } = useQuery({
    queryKey: ['linked-users', organizerData?.id],
    queryFn: async () => {
      if (!organizerData?.id) {
        console.log('OptimizedOrganizerSettings: organizerData.id is missing');
        return [];
      }
      
      console.log('OptimizedOrganizerSettings: Searching users for tenant_id:', organizerData.id);
      
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
          role
        `)
        .eq('tenant_id', organizerData.id);

      if (error) {
        console.error('OptimizedOrganizerSettings: Query error:', error);
        throw error;
      }
      
      console.log('OptimizedOrganizerSettings: Query result:', data);
      return data || [];
    },
    enabled: !!organizerData?.id,
    staleTime: 5 * 60 * 1000,
  });

  // Memoizar o estado do segmento de negócio
  const selectedSegment = useMemo(() => {
    if (!organizerData?.segmento_id || !segments) return null;
    return segments.find(segment => segment.id === organizerData.segmento_id);
  }, [organizerData?.segmento_id, segments]);

  // Memoizar o estado brasileiro
  const selectedState = useMemo(() => {
    if (!organizerData?.estado || !states) return null;
    return states.find(state => state.code === organizerData.estado);
  }, [organizerData?.estado, states]);

  if (organizerLoading) {
    return (
      <DashboardLayout title="Configurações da Organização">
        <div className="space-y-6">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[200px] w-full" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title="Configurações da Organização">
        <Card>
          <CardHeader>
            <CardTitle>Erro</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">Erro ao carregar dados da organização: {String(error)}</p>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  if (!organizerData) {
    return (
      <DashboardLayout title="Configurações da Organização">
        <Card>
          <CardHeader>
            <CardTitle>Dados não encontrados</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Os dados da organização não foram encontrados.</p>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Configurações da Organização">
      <div className="space-y-6">
        {/* Informações Básicas */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
            <CardDescription>Dados principais da organização</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-medium">Razão Social</label>
                <p className="text-gray-600">{organizerData.razao_social || 'Não informado'}</p>
              </div>
              <div>
                <label className="font-medium">Nome Fantasia</label>
                <p className="text-gray-600">{organizerData.nome_fantasia || 'Não informado'}</p>
              </div>
              <div>
                <label className="font-medium">CNPJ</label>
                <p className="text-gray-600">{organizerData.cnpj || 'Não informado'}</p>
              </div>
              <div>
                <label className="font-medium">Email</label>
                <p className="text-gray-600">{organizerData.email || 'Não informado'}</p>
              </div>
              <div>
                <label className="font-medium">Telefone</label>
                <p className="text-gray-600">{organizerData.telefone || 'Não informado'}</p>
              </div>
              <div>
                <label className="font-medium">WhatsApp</label>
                <p className="text-gray-600">{organizerData.whatsapp || 'Não informado'}</p>
              </div>
              <div>
                <label className="font-medium">Website</label>
                <p className="text-gray-600">{organizerData.website || 'Não informado'}</p>
              </div>
              <div>
                <label className="font-medium">Segmento</label>
                <p className="text-gray-600">
                  {selectedSegment ? selectedSegment.name : 'Não informado'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Endereço */}
        <Card>
          <CardHeader>
            <CardTitle>Endereço</CardTitle>
            <CardDescription>Localização da organização</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-medium">CEP</label>
                <p className="text-gray-600">{organizerData.cep || 'Não informado'}</p>
              </div>
              <div>
                <label className="font-medium">Logradouro</label>
                <p className="text-gray-600">{organizerData.endereco || 'Não informado'}</p>
              </div>
              <div>
                <label className="font-medium">Número</label>
                <p className="text-gray-600">{organizerData.numero || 'Não informado'}</p>
              </div>
              <div>
                <label className="font-medium">Complemento</label>
                <p className="text-gray-600">{organizerData.complemento || 'Não informado'}</p>
              </div>
              <div>
                <label className="font-medium">Bairro</label>
                <p className="text-gray-600">{organizerData.bairro || 'Não informado'}</p>
              </div>
              <div>
                <label className="font-medium">Cidade</label>
                <p className="text-gray-600">{organizerData.cidade || 'Não informado'}</p>
              </div>
              <div>
                <label className="font-medium">Estado</label>
                <p className="text-gray-600">
                  {selectedState ? `${selectedState.name} (${selectedState.code})` : organizerData.estado || 'Não informado'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Identidade Visual */}
        <Card>
          <CardHeader>
            <CardTitle>Identidade Visual</CardTitle>
            <CardDescription>Cores e visual da organização</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-medium">Cor Primária</label>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: organizerData.cor_primaria || '#e5e7eb' }}
                  />
                  <p className="text-gray-600">{organizerData.cor_primaria || 'Não definida'}</p>
                </div>
              </div>
              <div>
                <label className="font-medium">Cor Secundária</label>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: organizerData.cor_secundaria || '#e5e7eb' }}
                  />
                  <p className="text-gray-600">{organizerData.cor_secundaria || 'Não definida'}</p>
                </div>
              </div>
              <div>
                <label className="font-medium">Logo</label>
                <p className="text-gray-600">{organizerData.logo_url ? 'Configurada' : 'Não configurada'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usuários Vinculados */}
        <Card>
          <CardHeader>
            <CardTitle>Usuários Vinculados</CardTitle>
            <CardDescription>
              Usuários que fazem parte desta organização
            </CardDescription>
          </CardHeader>
          <CardContent>
            {usersLoading ? (
              <Skeleton className="h-[200px] w-full" />
            ) : linkedUsers && linkedUsers.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Criado em</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {linkedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        {user.full_name || `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Sem nome'}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {user.role || 'user'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.is_active ? "default" : "secondary"}>
                          {user.is_active ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR') : 'N/A'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-gray-500">Nenhum usuário vinculado encontrado.</p>
            )}
          </CardContent>
        </Card>

        {/* Informações do Sistema */}
        <Card>
          <CardHeader>
            <CardTitle>Informações do Sistema</CardTitle>
            <CardDescription>Dados técnicos da organização</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-medium">ID da Organização</label>
                <p className="text-gray-600 font-mono text-sm">{organizerData.id}</p>
              </div>
              <div>
                <label className="font-medium">Slug</label>
                <p className="text-gray-600">{organizerData.slug}</p>
              </div>
              <div>
                <label className="font-medium">Criado em</label>
                <p className="text-gray-600">
                  {new Date(organizerData.created_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div>
                <label className="font-medium">Última atualização</label>
                <p className="text-gray-600">
                  {new Date(organizerData.updated_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default OptimizedOrganizerSettings;