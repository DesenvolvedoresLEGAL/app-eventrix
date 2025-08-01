/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LectureFormProps {
  lecture?: any;
  onClose: () => void;
}

const LectureForm: React.FC<LectureFormProps> = ({ lecture, onClose }) => {
  const [formData, setFormData] = useState({
    title: lecture?.title || '',
    speaker: lecture?.speaker || '',
    date: lecture?.date || '',
    time: lecture?.time || '',
    duration: lecture?.duration || 60,
    venue: lecture?.venue || '',
    track: lecture?.track || '',
    description: lecture?.description || '',
    status: lecture?.status || 'pendente'
  });

  const venues = ['Auditório Principal', 'Sala de Conferências A', 'Sala de Conferências B', 'Sala de Workshops', 'Área Externa'];
  const tracks = ['Tecnologia', 'Sustentabilidade', 'Marketing', 'Inovação', 'Negócios', 'Design'];
  const statuses = ['pendente', 'confirmada', 'cancelada'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 space-y-2">
          <Label htmlFor="title">Título da Palestra</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Digite o título da palestra"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="speaker">Palestrante</Label>
          <Input
            id="speaker"
            value={formData.speaker}
            onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
            placeholder="Nome do palestrante"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="track">Trilha</Label>
          <Select
            value={formData.track}
            onValueChange={(value) => setFormData({ ...formData, track: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a trilha" />
            </SelectTrigger>
            <SelectContent>
              {tracks.map((track) => (
                <SelectItem key={track} value={track}>
                  {track}
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
            placeholder="Descreva o conteúdo da palestra"
            rows={3}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">
          {lecture ? 'Atualizar' : 'Criar'} Palestra
        </Button>
      </div>
    </form>
  );
};

export default LectureForm;
