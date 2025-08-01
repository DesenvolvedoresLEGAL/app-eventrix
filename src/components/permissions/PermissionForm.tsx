/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PermissionFormProps {
  permission?: any;
  onClose: () => void;
}

const PermissionForm: React.FC<PermissionFormProps> = ({ permission, onClose }) => {
  const [formData, setFormData] = useState({
    name: permission?.name || '',
    description: permission?.description || '',
    module: permission?.module || ''
  });

  const modules = [
    'Eventos',
    'Usuários',
    'Palestras',
    'Trilhas',
    'Atividades',
    'Credenciamento',
    'Relatórios',
    'Configurações',
    'Conteúdo'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome da Permissão</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="ex: create_events"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descreva o que esta permissão permite fazer"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="module">Módulo</Label>
        <Select
          value={formData.module}
          onValueChange={(value) => setFormData({ ...formData, module: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o módulo" />
          </SelectTrigger>
          <SelectContent>
            {modules.map((module) => (
              <SelectItem key={module} value={module}>
                {module}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">
          {permission ? 'Atualizar' : 'Criar'} Permissão
        </Button>
      </div>
    </form>
  );
};

export default PermissionForm;
