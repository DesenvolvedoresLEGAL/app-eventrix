import React, { useMemo, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useOrganizerData } from '@/hooks/queries/useOrganizerData';
import { Building2, MapPin, Phone, Palette, Save, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useFormOptimizations } from '@/hooks/useFormOptimizations';
import { useDirtyFields } from '@/hooks/useDirtyFields';
import { handleFormError } from '@/utils/errorHandlers';
import { UnsavedChangesDialog } from '@/components/form/UnsavedChangesDialog';
import supabase from '@/utils/supabase/client';

const organizerSchema = z.object({
  razao_social: z.string().min(2, 'Razão social é obrigatória'),
  nome_fantasia: z.string().optional(),
  cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ deve ter formato XX.XXX.XXX/XXXX-XX'),
  inscricao_estadual: z.string().optional(),
  cnae_principal: z.string().optional(),
  contact_email: z.string().email('Email inválido'),
  contact_phone: z.string().optional(),
  whatsapp_number: z.string().optional(),
  website_url: z.string().url('URL inválida').optional().or(z.literal('')),
  endereco_logradouro: z.string().min(1, 'Logradouro é obrigatório'),
  endereco_numero: z.string().optional(),
  endereco_complemento: z.string().optional(),
  endereco_bairro: z.string().min(1, 'Bairro é obrigatório'),
  endereco_cidade: z.string().min(1, 'Cidade é obrigatória'),
  cep: z.string().regex(/^\d{5}-\d{3}$/, 'CEP deve ter formato XXXXX-XXX'),
  primary_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Cor deve ser hexadecimal válida'),
  secondary_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Cor deve ser hexadecimal válida'),
  font_family: z.string().min(1, 'Família da fonte é obrigatória'),
});

type OrganizerFormData = z.infer<typeof organizerSchema>;

export const OrganizerDataForm: React.FC = () => {
  const { data: organizerData, isLoading } = useOrganizerData();
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = useMemo(() => {
    // Se não tem dados ainda, retorna valores vazios para evitar re-renders
    if (!organizerData) {
      return {
        razao_social: '',
        nome_fantasia: '',
        cnpj: '',
        inscricao_estadual: '',
        cnae_principal: '',
        contact_email: '',
        contact_phone: '',
        whatsapp_number: '',
        website_url: '',
        endereco_logradouro: '',
        endereco_numero: '',
        endereco_complemento: '',
        endereco_bairro: '',
        endereco_cidade: '',
        cep: '',
        primary_color: '#4D2BFB',
        secondary_color: '#03F9FF',
        font_family: 'Neue Haas Unica',
      };
    }
    
    return {
      razao_social: organizerData.razao_social || '',
      nome_fantasia: organizerData.nome_fantasia || '',
      cnpj: organizerData.cnpj || '',
      inscricao_estadual: organizerData.inscricao_estadual || '',
      cnae_principal: organizerData.cnae_principal || '',
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
      primary_color: organizerData.primary_color || '#4D2BFB',
      secondary_color: organizerData.secondary_color || '#03F9FF',
      font_family: organizerData.font_family || 'Neue Haas Unica',
    };
  }, [organizerData]);

  const form = useForm<OrganizerFormData>({
    resolver: zodResolver(organizerSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { dirtyFields, hasDirtyFields, dirtyFieldsCount, resetDirtyFields } = useDirtyFields({ form });

  const handleSubmitWithOptimizations = useCallback(async (data: OrganizerFormData) => {
    setIsSubmitting(true);
    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error('Usuário não autenticado');
      }

      // Get user's profile to get tenant_id
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('tenant_id')
        .eq('id', user.id)
        .single();

      if (profileError) {
        throw new Error(`Erro ao buscar perfil: ${profileError.message}`);
      }

      if (!profile?.tenant_id) {
        throw new Error('Usuário não está associado a uma organização');
      }

      // Build update object with only dirty fields
      const updateData: Record<string, any> = {
        updated_at: new Date().toISOString()
      };

      // Only include fields that have been modified
      Object.keys(dirtyFields).forEach(key => {
        const fieldKey = key as keyof OrganizerFormData;
        if (dirtyFields[fieldKey]) {
          // Handle null/empty values appropriately
          if (data[fieldKey] === '' || data[fieldKey] === null || data[fieldKey] === undefined) {
            updateData[fieldKey] = null;
          } else {
            updateData[fieldKey] = data[fieldKey];
          }
        }
      });

      // Only proceed with update if there are dirty fields
      if (Object.keys(updateData).length <= 1) { // Only updated_at would be present
        toast({
          title: "Nenhuma alteração",
          description: "Nenhum dado foi modificado.",
        });
        setIsSubmitting(false);
        return;
      }

      // Update tenant data directly with only modified fields
      const { data: updatedData, error } = await supabase
        .from('tenants')
        .update(updateData)
        .eq('id', profile.tenant_id)
        .select()
        .single();

      if (error) {
        throw new Error(`Erro ao atualizar dados: ${error.message}`);
      }

      if (!updatedData) {
        throw new Error('Dados atualizados não retornados');
      }

      // Success
      resetDirtyFields();
      toast({
        title: "Dados atualizados",
        description: "Os dados da organização foram atualizados com sucesso.",
      });
    } catch (error) {
      handleFormError(error);
    } finally {
      setIsSubmitting(false);
    }
  }, [dirtyFields, resetDirtyFields]);

  const { handleSubmit, canSubmit, shouldPreventReset } = useFormOptimizations({
    form,
    onSubmit: handleSubmitWithOptimizations
  });

  // Smart reset - only reset if user hasn't made changes
  React.useEffect(() => {
    if (organizerData && !shouldPreventReset) {
      form.reset(defaultValues);
    }
  }, [form, organizerData, defaultValues, shouldPreventReset]);

  const handleDiscardChanges = useCallback(() => {
    form.reset(defaultValues);
    setShowUnsavedDialog(false);
  }, [form, defaultValues]);

  const handleShowDiscardDialog = useCallback(() => {
    if (hasDirtyFields) {
      setShowUnsavedDialog(true);
    }
  }, [hasDirtyFields]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Dados Básicos */}
        <Card className="border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Dados Básicos
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="razao_social"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Razão Social *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nome da empresa" />
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
                      <Input {...field} placeholder="Nome comercial" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNPJ *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="XX.XXX.XXX/XXXX-XX" />
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
                      <Input {...field} placeholder="Número da IE" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="cnae_principal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNAE Principal</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Código CNAE" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {organizerData && (
              <div className="flex gap-2">
                <Badge variant="outline">Status: {organizerData.status_id ? 'Ativo' : 'Inativo'}</Badge>
                <Badge variant="secondary">Plano: {organizerData.plan_id ? 'Configurado' : 'Pendente'}</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Endereço */}
        <Card className="border-secondary/20">
          <CardHeader className="bg-gradient-to-r from-secondary/5 to-secondary/10 rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-secondary" />
              Endereço
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="endereco_logradouro"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logradouro *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Rua, Av, etc." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="endereco_numero"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="123" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="endereco_complemento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complemento</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Sala, andar, etc." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="endereco_bairro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nome do bairro" />
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
                      <Input {...field} placeholder="Nome da cidade" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="cep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="XXXXX-XXX" className="w-40" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Contato */}
        <Card className="border-accent/20">
          <CardHeader className="bg-gradient-to-r from-accent/5 to-accent/10 rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-accent-foreground" />
              Contato
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contact_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email de Contato *</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="contato@empresa.com" />
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
                      <Input {...field} placeholder="(11) 9999-9999" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="whatsapp_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="(11) 9999-9999" />
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
                      <Input {...field} placeholder="https://empresa.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Identidade Visual */}
        <Card className="border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              Identidade Visual
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="primary_color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cor Primária</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input {...field} placeholder="#4D2BFB" className="flex-1" />
                        <div 
                          className="w-12 h-10 rounded border-2 border-border" 
                          style={{ backgroundColor: field.value }} 
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
                    <FormLabel>Cor Secundária</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input {...field} placeholder="#03F9FF" className="flex-1" />
                        <div 
                          className="w-12 h-10 rounded border-2 border-border" 
                          style={{ backgroundColor: field.value }} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="font_family"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Família da Fonte</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma fonte" />
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
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          {hasDirtyFields && (
            <Button
              type="button"
              variant="outline"
              onClick={handleShowDiscardDialog}
              disabled={isSubmitting}
            >
              Descartar Alterações ({dirtyFieldsCount})
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={!canSubmit || isSubmitting}
            className="min-w-32"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>
        </form>
      </Form>

      <UnsavedChangesDialog
        open={showUnsavedDialog}
        onOpenChange={setShowUnsavedDialog}
        onConfirm={handleDiscardChanges}
        onCancel={() => setShowUnsavedDialog(false)}
        changedFieldsCount={dirtyFieldsCount}
      />
    </>
  );
};