import React, { useState, useEffect, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserRole, RoleFormData } from '@/types/roles.types';
import { Permission } from '@/utils/permissions';
import { usePermissionsList } from '@/hooks/queries/usePermissionsList';
import { 
  formatRoleName, 
  groupFormattedPermissions, 
  formatPermission,
  ROLE_TEMPLATES 
} from '@/utils/roleFormatter';
import { useCreateRole } from '@/hooks/mutations/useCreateRole';
import { useUpdateRole } from '@/hooks/mutations/useUpdateRole';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, X } from 'lucide-react';

interface RoleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit' | 'view';
  role?: UserRole | null;
}

const RoleFormModal: React.FC<RoleFormModalProps> = ({ 
  isOpen, 
  onClose, 
  mode, 
  role 
}) => {
  const [formData, setFormData] = useState<RoleFormData>({
    code: '',
    description: '',
    permissions: []
  });

  const { permissions } = usePermissionsList();
  
  // Group permissions using the formatter utility
  const groupedPermissions = useMemo(() => {
    return groupFormattedPermissions(permissions.map(p => p.key));
  }, [permissions]);
  const { createRole, isLoading: isCreating } = useCreateRole();
  const { updateRole, isLoading: isUpdating } = useUpdateRole();
  const { toast } = useToast();

  const isLoading = isCreating || isUpdating;
  const isReadOnly = mode === 'view';

  // Initialize form data when role changes
  useEffect(() => {
    if (role && (mode === 'edit' || mode === 'view')) {
      setFormData({
        code: role.code,
        description: role.description || '',
        permissions: role.permissions
      });
    } else if (mode === 'create') {
      setFormData({
        code: '',
        description: '',
        permissions: []
      });
    }
  }, [role, mode, isOpen]);

  const handleInputChange = (field: keyof RoleFormData, value: string) => {
    if (isReadOnly) return;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePermissionChange = (permission: Permission, checked: boolean) => {
    if (isReadOnly) return;
    
    setFormData(prev => ({
      ...prev,
      permissions: checked
        ? [...prev.permissions, permission]
        : prev.permissions.filter(p => p !== permission)
    }));
  };

  const handleSelectAllModule = (modulePermissions: Permission[], checked: boolean) => {
    if (isReadOnly) return;

    setFormData(prev => ({
      ...prev,
      permissions: checked
        ? [...new Set([...prev.permissions, ...modulePermissions])]
        : prev.permissions.filter(p => !modulePermissions.includes(p))
    }));
  };

  const getModuleSelectionState = (modulePermissions: Permission[]) => {
    const selectedCount = modulePermissions.filter(p => formData.permissions.includes(p)).length;
    
    if (selectedCount === 0) return 'none';
    if (selectedCount === modulePermissions.length) return 'all';
    return 'partial';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isReadOnly) {
      onClose();
      return;
    }

    if (!formData.code.trim()) {
      toast({
        title: "Erro",
        description: "O código do perfil é obrigatório.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (mode === 'create') {
        await createRole({
          code: formData.code.trim(),
          description: formData.description.trim() || undefined,
          permissions: formData.permissions
        });
      } else if (mode === 'edit' && role) {
        await updateRole(role.id, {
          code: formData.code.trim(),
          description: formData.description.trim() || undefined,
          permissions: formData.permissions
        });
      }
      
      onClose();
    } catch (error) {
      // Error handling is done in the mutation hooks
      console.error('Error submitting form:', error);
    }
  };

  const modalTitle = {
    create: 'Criar Novo Perfil',
    edit: 'Editar Perfil',
    view: 'Visualizar Perfil'
  }[mode];

  const submitButtonText = {
    create: 'Criar Perfil',
    edit: 'Salvar Alterações',
    view: 'Fechar'
  }[mode];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>
            {mode === 'create' && 'Defina as informações e permissões para o novo perfil.'}
            {mode === 'edit' && 'Modifique as informações e permissões do perfil.'}
            {mode === 'view' && 'Visualize as informações e permissões do perfil.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <ScrollArea className="max-h-[60vh] pr-4">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Código do Perfil *</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => handleInputChange('code', e.target.value)}
                    placeholder="ex: gerente_eventos"
                    disabled={isReadOnly}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Permissões Selecionadas</Label>
                  <div className="text-sm text-muted-foreground">
                    {formData.permissions.length} de {groupedPermissions.reduce((acc, group) => acc + group.permissions.length, 0)} permissões
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Descreva as responsabilidades deste perfil..."
                  disabled={isReadOnly}
                  rows={3}
                />
              </div>
            </div>

            <Separator className="my-6" />

            {/* Permissions Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">Permissões</Label>
                <Badge variant="outline">
                  {formData.permissions.length} selecionadas
                </Badge>
              </div>

              <div className="space-y-6">
                {groupedPermissions.map((group) => {
                  const modulePermissions = group.permissions.map(p => p.key);
                  const selectionState = getModuleSelectionState(modulePermissions);
                  
                  return (
                    <div key={group.module} className="space-y-3 border rounded-lg p-4 bg-card">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id={`module-${group.module}`}
                            checked={selectionState === 'all'}
                            onCheckedChange={(checked) => 
                              handleSelectAllModule(modulePermissions, checked as boolean)
                            }
                            disabled={isReadOnly}
                            className={selectionState === 'partial' ? 'data-[state=checked]:bg-muted' : ''}
                          />
                          <span className="text-xl">{group.permissions[0]?.icon || '📁'}</span>
                          <Label 
                            htmlFor={`module-${group.module}`} 
                            className="text-sm font-semibold text-primary cursor-pointer"
                          >
                            {group.module}
                          </Label>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {group.permissions.filter(p => formData.permissions.includes(p.key)).length}/{group.permissions.length} selecionadas
                        </Badge>
                      </div>
                      
                      <div className="ml-9 grid grid-cols-1 gap-3">
                        {group.permissions.map((permission) => (
                          <div 
                            key={permission.key} 
                            className="flex items-start space-x-3 p-3 rounded-md border hover:bg-muted/30 transition-colors"
                          >
                            <Checkbox
                              id={permission.key}
                              checked={formData.permissions.includes(permission.key)}
                              onCheckedChange={(checked) => 
                                handlePermissionChange(permission.key, checked as boolean)
                              }
                              disabled={isReadOnly}
                            />
                            <span className="text-lg mt-0.5" style={{ color: permission.color }}>
                              {permission.icon}
                            </span>
                            <div className="flex-1 grid gap-1.5 leading-none">
                              <Label 
                                htmlFor={permission.key}
                                className="text-sm font-medium leading-none cursor-pointer"
                              >
                                {permission.name}
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                {permission.description}
                              </p>
                              <Badge 
                                variant="outline" 
                                className="w-fit text-xs mt-1"
                                style={{ borderColor: permission.color, color: permission.color }}
                              >
                                {permission.level === 'basic' ? 'Básico' : 
                                 permission.level === 'intermediate' ? 'Intermediário' : 'Avançado'}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollArea>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {!isLoading && mode !== 'view' && <Save className="w-4 h-4 mr-2" />}
              {submitButtonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RoleFormModal;