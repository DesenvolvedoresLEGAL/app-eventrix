import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useOrganizerData, useBrazilianStates, useBusinessSegments } from '@/hooks/queries/useOrganizerData';
import { useFormOptimizations } from '@/hooks/useFormOptimizations';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Building2, MapPin, Users, Palette, FileText, Phone, Mail, ExternalLink } from 'lucide-react';

// Schema de validação para dados da organização
const organizerFormSchema = z.object({
  company_name: z.string()
    .min(2, 'Nome da empresa deve ter pelo menos 2 caracteres')
    .max(100, 'Nome da empresa deve ter no máximo 100 caracteres'),
  
  legal_name: z.string()
    .min(2, 'Razão social deve ter pelo menos 2 caracteres')
    .max(100, 'Razão social deve ter no máximo 100 caracteres')
    .optional()
    .or(z.literal('')),
  
  cnpj: z.string()
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX')
    .optional()
    .or(z.literal('')),
  
  description: z.string()
    .max(500, 'Descrição deve ter no máximo 500 caracteres')
    .optional()
    .or(z.literal('')),
  
  website: z.string()
    .url('URL deve ser válida (ex: https://exemplo.com)')
    .optional()
    .or(z.literal('')),
  
  phone: z.string()
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Telefone deve estar no formato (XX) XXXXX-XXXX')
    .optional()
    .or(z.literal('')),
  
  email: z.string()
    .email('Email deve ser válido')
    .optional()
    .or(z.literal('')),
  
  // Endereço
  address: z.string()
    .max(200, 'Endereço deve ter no máximo 200 caracteres')
    .optional()
    .or(z.literal('')),
  
  city: z.string()
    .max(100, 'Cidade deve ter no máximo 100 caracteres')
    .optional()
    .or(z.literal('')),
  
  state: z.string()
    .max(2, 'Estado deve ter 2 caracteres')
    .optional()
    .or(z.literal('')),
  
  cep: z.string()
    .regex(/^\d{5}-\d{3}$/, 'CEP deve estar no formato XXXXX-XXX')
    .optional()
    .or(z.literal('')),
  
  // Configurações visuais
  primary_color: z.string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Cor primária deve ser um código hex válido (#XXXXXX)')
    .optional()
    .or(z.literal('')),
  
  secondary_color: z.string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Cor secundária deve ser um código hex válido (#XXXXXX)')
    .optional()
    .or(z.literal('')),
  
  // Segmento de negócio
  business_segment_id: z.string().uuid('Segmento de negócio deve ser selecionado').optional()
});

type OrganizerFormData = z.infer<typeof organizerFormSchema>;

export const OrganizerDataForm: React.FC = () => {
  const { toast } = useToast();
  const { data: organizerData, isLoading, isError, error, updateOrganizer, isUpdating } = useOrganizerData();
  const { data: states, isLoading: statesLoading } = useBrazilianStates();
  const { data: segments, isLoading: segmentsLoading } = useBusinessSegments();

  const form = useForm<OrganizerFormData>({
    resolver: zodResolver(organizerFormSchema),
  defaultValues: useMemo(() => ({
      company_name: organizerData?.nome_fantasia || '',
      legal_name: organizerData?.razao_social || '',
      cnpj: organizerData?.cnpj || '',
      description: '',
      website: organizerData?.website_url || '',
      phone: organizerData?.contact_phone || '',
      email: organizerData?.contact_email || '',
      address: organizerData?.endereco_logradouro || '',
      city: organizerData?.endereco_cidade || '',
      state: '', // Will be populated by finding the state code from the state_id
      cep: organizerData?.cep || '',
      primary_color: organizerData?.primary_color || '',
      secondary_color: organizerData?.secondary_color || '',
      business_segment_id: ''
    }), [organizerData])
  });

  const onSubmit = async (data: OrganizerFormData) => {
    try {
      // Transform form data to match the database structure
      const updates = {
        nome_fantasia: data.company_name || null,
        razao_social: data.legal_name || null,
        cnpj: data.cnpj || null,
        contact_email: data.email || null,
        contact_phone: data.phone || null,
        website_url: data.website || null,
        endereco_logradouro: data.address || null,
        endereco_cidade: data.city || null,
        cep: data.cep || null,
        primary_color: data.primary_color || null,
        secondary_color: data.secondary_color || null,
        // Find state_id by code if state is selected
        state_id: data.state ? states?.find(s => s.code === data.state)?.id : null,
        // Set business segment if selected
        primary_segment_id: data.business_segment_id || null,
      };

      // Filter out null/empty values
      const filteredUpdates = Object.fromEntries(
        Object.entries(updates).filter(([_, value]) => value !== null && value !== '')
      );

      await updateOrganizer.mutateAsync(filteredUpdates);
      
      toast({
        title: "Sucesso",
        description: "Dados da organização atualizados com sucesso!",
      });
      
      // Reset form dirty state
      form.reset(data);
    } catch (error) {
      console.error('Erro ao atualizar organização:', error);
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro ao atualizar dados da organização. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const { handleSubmit, canSubmit } = useFormOptimizations({
    form,
    onSubmit,
    debounceMs: 500
  });

  // Reset form when data changes
  React.useEffect(() => {
    if (organizerData) {
      form.reset({
        company_name: organizerData.nome_fantasia || '',
        legal_name: organizerData.razao_social || '',
        cnpj: organizerData.cnpj || '',
        description: '',
        website: organizerData.website_url || '',
        phone: organizerData.contact_phone || '',
        email: organizerData.contact_email || '',
        address: organizerData.endereco_logradouro || '',
        city: organizerData.endereco_cidade || '',
        state: '', // Will be populated by finding the state code from the state_id
        cep: organizerData.cep || '',
        primary_color: organizerData.primary_color || '',
        secondary_color: organizerData.secondary_color || '',
        business_segment_id: ''
      });
    }
  }, [organizerData, form]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Erro ao carregar dados da organização: {error?.message || 'Erro desconhecido'}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Informações Básicas */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <CardTitle>Informações Básicas</CardTitle>
            </div>
            <CardDescription>
              Dados principais da sua organização
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Empresa *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Minha Empresa LTDA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="legal_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Razão Social</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Minha Empresa Sociedade Limitada" {...field} />
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
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl>
                    <Input placeholder="XX.XXX.XXX/XXXX-XX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="business_segment_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Segmento de Negócio</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={segmentsLoading}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o segmento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {segments?.map((segment) => (
                        <SelectItem key={segment.id} value={segment.id}>
                          {segment.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva sua organização..."
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Breve descrição sobre sua organização (máximo 500 caracteres)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Contato */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              <CardTitle>Informações de Contato</CardTitle>
            </div>
            <CardDescription>
              Dados para contato e comunicação
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="contato@empresa.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="(XX) XXXXX-XXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <ExternalLink className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        className="pl-9" 
                        placeholder="https://www.empresa.com" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Endereço */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <CardTitle>Endereço</CardTitle>
            </div>
            <CardDescription>
              Localização da sua organização
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Rua, Avenida, número" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="São Paulo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={statesLoading}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="UF" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {states?.map((state) => (
                        <SelectItem key={state.code} value={state.code}>
                          {state.code} - {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cep"
              render={({ field }) => (
                <FormItem className="md:col-span-2 lg:col-span-1">
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input placeholder="XXXXX-XXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Identidade Visual */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              <CardTitle>Identidade Visual</CardTitle>
            </div>
            <CardDescription>
              Cores que representam sua marca
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="primary_color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cor Primária</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input placeholder="#000000" {...field} />
                      <div 
                        className="w-10 h-10 rounded border border-border flex-shrink-0"
                        style={{ backgroundColor: field.value || '#f3f4f6' }}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Cor principal da sua marca (formato hex)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="secondary_color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cor Secundária</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input placeholder="#000000" {...field} />
                      <div 
                        className="w-10 h-10 rounded border border-border flex-shrink-0"
                        style={{ backgroundColor: field.value || '#f3f4f6' }}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Cor complementar da sua marca (formato hex)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Separator />

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={isUpdating || !form.formState.isDirty}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={!canSubmit || isUpdating}
          >
            {isUpdating ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>

        {/* Status Badge */}
        {organizerData && (
          <div className="flex justify-center">
            <Badge variant="secondary" className="text-xs">
              Última atualização: {new Date(organizerData.updated_at).toLocaleString('pt-BR')}
            </Badge>
          </div>
        )}
      </form>
    </Form>
  );
};