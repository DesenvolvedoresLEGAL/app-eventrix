
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ActivityFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  activity?: any;
  onClose: () => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ activity, onClose }) => {
  const [formData, setFormData] = useState({
    name: activity?.name || '',
    type: activity?.type || '',
    description: activity?.description || '',
    date: activity?.date || '',
    time: activity?.time || '',
    duration: activity?.duration || 60,
    venue: activity?.venue || '',
    facilitator: activity?.facilitator || '',
    max_participants: activity?.max_participants || 50,
    status: activity?.status || 'aberta'
  });

  const types = [
    { value: 'workshop', label: 'Workshop' },
    { value: 'networking', label: 'Networking' },
    { value: 'mesa_redonda', label: 'Mesa Redonda' },
    { value: 'coffee_break', label: 'Coffee Break' },
    { value: 'almoco', label: 'Almoço' },
    { value: 'abertura', label: 'Abertura' },
    { value: 'encerramento', label: 'Encerramento' }
  ];

  const venues = ['Auditório Principal', 'Sala de Conferências A', 'Sala de Conferências B', 'Sala de Workshops', 'Área de Convivência', 'Área Externa'];
  const facilitators = ['Ana Costa', 'Dr. João Silva', 'Dra. Maria Santos', 'Carlos Oliveira', 'Equipe do Evento'];
  const statuses = ['aberta', 'confirmada', 'lotada', 'cancelada'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 space-y-2">
          <Label htmlFor="name">Nome da Atividade</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Digite o nome da atividade"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Tipo</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              {types.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="facilitator">Facilitador</Label>
          <Select
            value={formData.facilitator}
            onValueChange={(value) => setFormData({ ...formData, facilitator: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o facilitador" />
            </SelectTrigger>
            <SelectContent>
              {facilitators.map((facilitator) => (
                <SelectItem key={facilitator} value={facilitator}>
                  {facilitator}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Data</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Horário</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duração (minutos)</Label>
          <Input
            id="duration"
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
            placeholder="60"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="venue">Local</Label>
          <Select
            value={formData.venue}
            onValueChange={(value) => setFormData({ ...formData, venue: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o local" />
            </SelectTrigger>
            <SelectContent>
              {venues.map((venue) => (
                <SelectItem key={venue} value={venue}>
                  {venue}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="max_participants">Máximo de Participantes</Label>
          <Input
            id="max_participants"
            type="number"
            value={formData.max_participants}
            onChange={(e) => setFormData({ ...formData, max_participants: parseInt(e.target.value) })}
            placeholder="50"
            required
          />
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

        <div className="col-span-2 space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Descreva a atividade"
            rows={3}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">
          {activity ? 'Atualizar' : 'Criar'} Atividade
        </Button>
      </div>
    </form>
  );
};

export default ActivityForm;
