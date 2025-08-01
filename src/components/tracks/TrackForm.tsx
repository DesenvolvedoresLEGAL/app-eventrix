/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TrackFormProps {
  track?: any;
  onClose: () => void;
}

const TrackForm: React.FC<TrackFormProps> = ({ track, onClose }) => {
  const [formData, setFormData] = useState({
    name: track?.name || '',
    description: track?.description || '',
    color: track?.color || '#3B82F6',
    coordinator: track?.coordinator || '',
    duration: track?.duration || '',
    status: track?.status || 'planejamento'
  });

  const coordinators = ['Dr. João Silva', 'Dra. Maria Santos', 'Carlos Oliveira', 'Ana Costa', 'Pedro Souza'];
  const statuses = ['planejamento', 'ativa', 'finalizada'];
  const colors = [
    { name: 'Azul', value: '#3B82F6' },
    { name: 'Verde', value: '#10B981' },
    { name: 'Amarelo', value: '#F59E0B' },
    { name: 'Vermelho', value: '#EF4444' },
    { name: 'Roxo', value: '#8B5CF6' },
    { name: 'Rosa', value: '#EC4899' },
    { name: 'Índigo', value: '#6366F1' },
    { name: 'Teal', value: '#14B8A6' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 space-y-2">
          <Label htmlFor="name">Nome da Trilha</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Digite o nome da trilha"
            required
          />
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Descreva o foco e objetivos desta trilha"
            rows={3}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="coordinator">Coordenador</Label>
          <Select
            value={formData.coordinator}
            onValueChange={(value) => setFormData({ ...formData, coordinator: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o coordenador" />
            </SelectTrigger>
            <SelectContent>
              {coordinators.map((coordinator) => (
                <SelectItem key={coordinator} value={coordinator}>
                  {coordinator}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duração</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="ex: 2 dias, 4 horas"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="color">Cor da Trilha</Label>
          <Select
            value={formData.color}
            onValueChange={(value) => setFormData({ ...formData, color: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma cor" />
            </SelectTrigger>
            <SelectContent>
              {colors.map((color) => (
                <SelectItem key={color.value} value={color.value}>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color.value }}
                    />
                    <span>{color.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">
          {track ? 'Atualizar' : 'Criar'} Trilha
        </Button>
      </div>
    </form>
  );
};

export default TrackForm;
