import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Building2, Contact, MapPin, Palette, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useOrganizerData, useBrazilianStates, useBusinessSegments } from '@/hooks/queries/useOrganizerData';
import { useAuthValidation } from '@/hooks/useAuthValidation';
import { useToast } from '@/hooks/use-toast';
import { UpdateOrganizerData } from '@/services/organizerService';

// Schema de validação
const organizerFormSchema = z.object({
  razao_social: z.string().min(2, 'Razão social deve ter pelo menos 2 caracteres'),
  nome_fantasia: z.string().optional(),
  cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX'),
  inscricao_estadual: z.string().optional(),
  contact_email: z.string().email('Email inválido'),
  contact_phone: z.string().optional(),
  whatsapp_number: z.string().optional(),
  website_url: z.string().url('URL inválida').optional().or(z.literal('')),
  endereco_logradouro: z.string().min(5, 'Logradouro deve ter pelo menos 5 caracteres'),
  endereco_numero: z.string().optional(),
  endereco_complemento: z.string().optional(),
  endereco_bairro: z.string().min(2, 'Bairro deve ter pelo menos 2 caracteres'),
  endereco_cidade: z.string().min(2, 'Cidade deve ter pelo menos 2 caracteres'),
  cep: z.string().regex(/^\d{5}-\d{3}$/, 'CEP deve estar no formato XXXXX-XXX'),
  status_id: z.string().uuid('Selecione um estado'),
  primary_color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Cor deve estar no formato hexadecimal (#XXXXXX)'),
  secondary_color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Cor deve estar no formato hexadecimal (#XXXXXX)'),
  font_family: z.string().min(1, 'Selecione uma fonte'),
  timezone: z.string().min(1, 'Selecione um timezone'),
});

type FormData = z.infer<typeof organizerFormSchema>;

export const OrganizerDataForm: React.FC = () => {
  const { toast } = useToast();
  const { data: organizerData, isLoading, updateOrganizer, isUpdating } = useOrganizerData();
  const { data: states } = useBrazilianStates();
  const { isAuthenticated, isValidating, validateAuth, refreshSession } = useAuthValidation();

  // Memoização dos dados do formulário conforme solicitado
  const memoizedFormData = useMemo(() => {
    if (!organizerData) return null;
    
    return {
      razao_social: organizerData.razao_social || '',
      nome_fantasia: organizerData.nome_fantasia || '',
      cnpj: organizerData.cnpj || '',
      inscricao_estadual: organizerData.inscricao_estadual || '',
      contact_email: organizerData.contact_email || '',
      contact_phone: organizerData.contact_phone || '',
      whatsapp_number: organizerData.whatsapp_number || '',
      website_url: organizerData.website_url || '',
      endereco_logradouro: organizerData.endereco_logradouro || '',
      endereco_numero: organizerData.endereco_numero || '',
      endereco_complemento: organizerData.endereco_complemento || '',
      endereco_bairro: organizerData.endereco_bairro || '',
      endereco_cidade: organizerData.endereco_cidade || '',
      cep: organizerData.cep || '',
      status_id: organizerData.status_id || '',
      primary_color: organizerData.primary_color || '#4D2BFB',
      secondary_color: organizerData.secondary_color || '#03F9FF',
      font_family: organizerData.font_family || 'Neue Haas Unica',
      timezone: organizerData.timezone || 'America/Sao_Paulo',
    };
  }, [organizerData]);

  const form = useForm<FormData>({
    resolver: zodResolver(organizerFormSchema),
    defaultValues: memoizedFormData || undefined,
  });

  // Atualizar valores do form quando os dados chegarem
  React.useEffect(() => {
    if (memoizedFormData) {
      form.reset(memoizedFormData);
    }
  }, [memoizedFormData, form]);

  const onSubmit = async (data: FormData) => {
    console.log('OrganizerDataForm.onSubmit: Iniciando envio...', { data, isAuthenticated });
    
    try {
      // Estratégia de Recovery em 3 níveis
      
      // Nível 1: Verificação básica de estado React
      if (!isAuthenticated) {
        toast({
          title: "Não autenticado",
          description: "Você precisa estar logado para salvar as alterações.",
          variant: "destructive",
        });
        return;
      }

      // Nível 2: Validação completa com sincronização
      const isAuthValid = await validateAuth();
      if (!isAuthValid) {
        console.log('Auth validation failed, attempting session refresh...');
        
        // Nível 3: Tentativa de refresh ou redirect
        const refreshSuccessful = await refreshSession();
        if (!refreshSuccessful) {
          return; // refreshSession já mostra o toast e redireciona
        }
        
        // Revalidar após refresh bem-sucedido
        const isStillValid = await validateAuth();
        if (!isStillValid) {
          toast({
            title: "Falha na Autenticação",
            description: "Não foi possível validar sua sessão. Tente fazer login novamente.",
            variant: "destructive",
          });
          return;
        }
      }

      console.log('OrganizerDataForm.onSubmit: Auth validated, proceeding with update...');
      
      const updateData: UpdateOrganizerData = {
        ...data,
        website_url: data.website_url || null,
        nome_fantasia: data.nome_fantasia || null,
        inscricao_estadual: data.inscricao_estadual || null,
        contact_phone: data.contact_phone || null,
        whatsapp_number: data.whatsapp_number || null,
        endereco_numero: data.endereco_numero || null,
        endereco_complemento: data.endereco_complemento || null,
      };

      // 4. Tentar atualizar os dados
      await updateOrganizer.mutateAsync(updateData);
      
      toast({
        title: "Sucesso",
        description: "Dados da organização atualizados com sucesso!",
      });
    } catch (error) {
      console.error('OrganizerDataForm.onSubmit: Erro ao atualizar organização:', error);
      
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido ao atualizar dados.";
      
      // Verificar se é erro de autenticação
      if (errorMessage.includes('não autenticado') || errorMessage.includes('Usuário não autenticado') || errorMessage.includes('Sessão')) {
        toast({
          title: "Erro de Autenticação",
          description: "Sua sessão expirou. Tente fazer login novamente.",
          variant: "destructive",
        });
        
        // Tentar refresh automático
        setTimeout(async () => {
          const refreshed = await refreshSession();
          if (refreshed) {
            toast({
              title: "Sessão Renovada",
              description: "Tente enviar o formulário novamente.",
            });
          }
        }, 1000);
      } else {
        toast({
          title: "Erro",
          description: errorMessage,
          variant: "destructive",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Carregando dados da organização...</span>
      </div>
    );
  }

  const isDirty = form.formState.isDirty;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações da Organização</h1>
          <p className="text-muted-foreground">
            Gerencie as informações da sua organização e identidade visual
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs defaultValue="company" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="company" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Empresa
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <Contact className="h-4 w-4" />
                Contato
              </TabsTrigger>
              <TabsTrigger value="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Endereço
              </TabsTrigger>
              <TabsTrigger value="branding" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Identidade
              </TabsTrigger>
            </TabsList>

            <TabsContent value="company" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Dados da Empresa</CardTitle>
                  <CardDescription>
                    Informações básicas e documentação da empresa
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="razao_social"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Razão Social *</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite a razão social" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nome_fantasia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Fantasia</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite o nome fantasia" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cnpj"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CNPJ *</FormLabel>
                        <FormControl>
                          <Input placeholder="XX.XXX.XXX/XXXX-XX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="inscricao_estadual"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inscrição Estadual</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite a inscrição estadual" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Contato</CardTitle>
                  <CardDescription>
                    Canais de comunicação da organização
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contact_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email de Contato *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="contato@empresa.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contact_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="(11) 9999-9999" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="whatsapp_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp</FormLabel>
                        <FormControl>
                          <Input placeholder="(11) 9999-9999" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="website_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://www.empresa.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="address" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Endereço</CardTitle>
                  <CardDescription>
                    Localização física da organização
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="endereco_logradouro"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Logradouro *</FormLabel>
                        <FormControl>
                          <Input placeholder="Rua, Avenida, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endereco_numero"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número</FormLabel>
                        <FormControl>
                          <Input placeholder="123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endereco_complemento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Complemento</FormLabel>
                        <FormControl>
                          <Input placeholder="Sala, Andar, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endereco_bairro"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bairro *</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do bairro" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endereco_cidade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade *</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome da cidade" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cep"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CEP *</FormLabel>
                        <FormControl>
                          <Input placeholder="00000-000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o estado" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {states?.map((state: any) => (
                              <SelectItem key={state.id} value={state.id}>
                                {state.name} ({state.code})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="branding" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Identidade Visual</CardTitle>
                  <CardDescription>
                    Cores, fontes e elementos visuais da marca
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="primary_color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cor Primária *</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input 
                              type="color" 
                              className="w-16 h-10 p-1 border rounded cursor-pointer"
                              {...field} 
                            />
                            <Input 
                              placeholder="#4D2BFB" 
                              value={field.value}
                              onChange={field.onChange}
                              className="flex-1"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="secondary_color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cor Secundária *</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input 
                              type="color" 
                              className="w-16 h-10 p-1 border rounded cursor-pointer"
                              {...field} 
                            />
                            <Input 
                              placeholder="#03F9FF" 
                              value={field.value}
                              onChange={field.onChange}
                              className="flex-1"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="font_family"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Família da Fonte *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a fonte" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Neue Haas Unica">Neue Haas Unica</SelectItem>
                            <SelectItem value="Inter">Inter</SelectItem>
                            <SelectItem value="Roboto">Roboto</SelectItem>
                            <SelectItem value="Open Sans">Open Sans</SelectItem>
                            <SelectItem value="Lato">Lato</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="timezone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timezone *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o timezone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="America/Sao_Paulo">America/São_Paulo (UTC-3)</SelectItem>
                            <SelectItem value="America/Manaus">America/Manaus (UTC-4)</SelectItem>
                            <SelectItem value="America/Rio_Branco">America/Rio_Branco (UTC-5)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {isDirty && (
            <div className="flex justify-end flex-col items-end gap-2">
              <Button
                type="submit"
                disabled={isUpdating || !isAuthenticated || isValidating}
                className="min-w-32"
              >
                {isValidating ? "Verificando..." : isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  'Salvar Alterações'
                )}
              </Button>
              
              {!isAuthenticated && (
                <div className="text-sm text-destructive">
                  ⚠️ Você precisa estar autenticado para salvar alterações
                </div>
              )}
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};