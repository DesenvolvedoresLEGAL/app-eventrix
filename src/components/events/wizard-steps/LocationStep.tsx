/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LocationStepProps {
  data: any;
  updateData: (data: any) => void;
}

const brazilianStates = [
  'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal',
  'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul',
  'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí',
  'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia',
  'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
];

const LocationStep: React.FC<LocationStepProps> = ({ data, updateData }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Endereço Completo */}
        <div className="space-y-2">
          <Label htmlFor="address" className="text-sm font-medium">
            Endereço Completo <span className="text-destructive">*</span>
          </Label>
          <Input
            id="address"
            value={data.address}
            onChange={(e) => updateData({ address: e.target.value })}
            placeholder="Rua, número, bairro"
            className="w-full"
          />
        </div>

        {/* Cidade, Estado, País */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm font-medium">
              Cidade <span className="text-destructive">*</span>
            </Label>
            <Input
              id="city"
              value={data.city}
              onChange={(e) => updateData({ city: e.target.value })}
              placeholder="São Paulo"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Estado <span className="text-destructive">*</span>
            </Label>
            <Select value={data.state} onValueChange={(value) => updateData({ state: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o estado" />
              </SelectTrigger>
              <SelectContent>
                {brazilianStates.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="text-sm font-medium">
              País
            </Label>
            <Input
              id="country"
              value={data.country}
              onChange={(e) => updateData({ country: e.target.value })}
              placeholder="Brasil"
            />
          </div>
        </div>

        {/* Nome do Local */}
        <div className="space-y-2">
          <Label htmlFor="venueName" className="text-sm font-medium">
            Nome do Local (opcional)
          </Label>
          <Input
            id="venueName"
            value={data.venueName}
            onChange={(e) => updateData({ venueName: e.target.value })}
            placeholder="Ex: Centro de Convenções Anhembi"
          />
        </div>

        {/* Área e Capacidade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="totalArea" className="text-sm font-medium">
              Área Total (m²) (opcional)
            </Label>
            <Input
              id="totalArea"
              type="number"
              value={data.totalArea}
              onChange={(e) => updateData({ totalArea: e.target.value })}
              placeholder="1000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity" className="text-sm font-medium">
              Capacidade Estimada (opcional)
            </Label>
            <Input
              id="capacity"
              type="number"
              value={data.capacity}
              onChange={(e) => updateData({ capacity: e.target.value })}
              placeholder="500"
            />
          </div>
        </div>

        {/* Acessibilidade */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="accessibility"
              checked={data.accessibility}
              onCheckedChange={(checked) => updateData({ accessibility: checked })}
            />
            <Label htmlFor="accessibility" className="text-sm font-medium">
              Local possui recursos de acessibilidade
            </Label>
          </div>

          {data.accessibility && (
            <div className="space-y-2">
              <Label htmlFor="accessibilityInfo" className="text-sm font-medium">
                Informações de Acessibilidade
              </Label>
              <Textarea
                id="accessibilityInfo"
                value={data.accessibilityInfo}
                onChange={(e) => updateData({ accessibilityInfo: e.target.value })}
                placeholder="Descreva os recursos de acessibilidade disponíveis (rampas, elevadores, banheiros adaptados, etc.)"
                className="min-h-[80px]"
              />
            </div>
          )}
        </div>

        {/* Mapa/Localização */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Localização no Mapa
          </Label>
          <div className="p-4 border-2 border-dashed border-muted-foreground/25 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              Mapa será exibido automaticamente com base no endereço informado
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Integração com Google Maps será configurada após o cadastro
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationStep;
