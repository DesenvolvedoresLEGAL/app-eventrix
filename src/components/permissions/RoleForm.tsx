/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RoleFormProps {
  role?: any;
  permissions: any[];
  onClose: () => void;
}

const RoleForm: React.FC<RoleFormProps> = ({ role, permissions, onClose }) => {
  const [formData, setFormData] = useState({
    name: role?.name || '',
    description: role?.description || '',
    permissions: role?.permissions || []
  });

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = [];
    }
    acc[permission.module].push(permission);
    return acc;
  }, {});

  const handlePermissionChange = (permissionName: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked
        ? [...prev.permissions, permissionName]
        : prev.permissions.filter(p => p !== permissionName)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome do Perfil</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="ex: Administrador"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Descreva as responsabilidades deste perfil"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-base font-medium">Permissões</Label>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {Object.entries(groupedPermissions).map(([module, modulePermissions]) => (
            <Card key={module}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">{module}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(modulePermissions as any[]).map((permission) => (
                  <div key={permission.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={permission.name}
                      checked={formData.permissions.includes(permission.name)}
                      onCheckedChange={(checked) => 
                        handlePermissionChange(permission.name, checked as boolean)
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor={permission.name}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {permission.name.replace('_', ' ')}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {permission.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">
          {role ? 'Atualizar' : 'Criar'} Perfil
        </Button>
      </div>
    </form>
  );
};

export default RoleForm;
