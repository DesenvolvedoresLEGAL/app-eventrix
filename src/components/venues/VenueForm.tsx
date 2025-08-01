/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface VenueFormProps {
  venue?: any;
  onClose: () => void;
}

const VenueForm: React.FC<VenueFormProps> = ({ venue, onClose }) => {
  const [formData, setFormData] = useState({
    name: venue?.name || '',
    type: venue?.type || '',
    capacity: venue?.capacity || 50,
    area: venue?.area || 30,
    location: venue?.location || '',
    description: venue?.description || '',
    price_per_hour: venue?.price_per_hour || 100,
    status: venue?.status || 'disponível',
    amenities: venue?.amenities || []
  });

  const types = [
    { value: 'auditório', label: 'Auditório' },
    { value: 'sala_conferência', label: 'Sala de Conferência' },
    { value: 'workshop', label: 'Sala de Workshop' },
    { value: 'área_externa', label: 'Área Externa' },
    { value: 'foyer', label: 'Foyer' },
    { value: 'stand', label: 'Stand' }
  ];

  const statuses = ['disponível', 'ocupada', 'manutenção'];
  
  const availableAmenities = [
    'Wifi',
    'Ar Condicionado',
    'Projetor',
    'Sistema de Som',
    'TV 65"',
    'Flipchart',
    'Quadro Branco',
    'Mesas Móveis',
    'Tomadas',
    'Estacionamento',
    'Coffee Break',
    'Banheiro Adaptado'
  ];

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenity]
        : prev.amenities.filter(a => a !== amenity)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 space-y-2">
          <Label htmlFor="name">Nome do Local</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Digite o nome do local"
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

        <div className="space-y-2">
          <Label htmlFor="capacity">Capacidade (pessoas)</Label>
          <Input
            id="capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
            placeholder="50"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="area">Área (m²)</Label>
          <Input
            id="area"
            type="number"
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: parseInt(e.target.value) })}
            placeholder="30"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price_per_hour">Preço por Hora (R$)</Label>
          <Input
            id="price_per_hour"
            type="number"
            value={formData.price_per_hour}
            onChange={(e) => setFormData({ ...formData, price_per_hour: parseInt(e.target.value) })}
            placeholder="100"
            required
          />
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="location">Localização</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="ex: 1º Andar - Ala Norte"
            required
          />
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Descreva as características do local"
            rows={3}
          />
        </div>

        <div className="col-span-2 space-y-3">
          <Label>Comodidades</Label>
          <div className="grid grid-cols-3 gap-3 max-h-40 overflow-y-auto">
            {availableAmenities.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={formData.amenities.includes(amenity)}
                  onCheckedChange={(checked) => 
                    handleAmenityChange(amenity, checked as boolean)
                  }
                />
                <Label
                  htmlFor={amenity}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">
          {venue ? 'Atualizar' : 'Criar'} Local
        </Button>
      </div>
    </form>
  );
};

export default VenueForm;
