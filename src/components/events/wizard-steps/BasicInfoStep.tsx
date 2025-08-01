/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface BasicInfoStepProps {
  data: any;
  updateData: (data: any) => void;
}

const eventCategories = [
  'Conferência',
  'Workshop',
  'Seminário',
  'Feira/Exposição',
  'Festival',
  'Congresso',
  'Treinamento',
  'Lançamento de Produto',
  'Networking',
  'Webinar',
  'Outro'
];

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ data, updateData }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Nome do Evento */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Nome do Evento <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            placeholder="Ex: Tech Summit 2024"
            className="w-full"
          />
        </div>

        {/* Descrição */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">
            Descrição Breve <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="description"
            value={data.description}
            onChange={(e) => updateData({ description: e.target.value })}
            placeholder="Descreva brevemente seu evento (máximo 300 caracteres)"
            className="min-h-[80px] resize-none"
            maxLength={300}
          />
          <div className="text-xs text-muted-foreground text-right">
            {data.description.length}/300 caracteres
          </div>
        </div>

        {/* Categoria */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Categoria/Tipo do Evento <span className="text-destructive">*</span>
          </Label>
          <Select value={data.category} onValueChange={(value) => updateData({ category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a categoria do evento" />
            </SelectTrigger>
            <SelectContent>
              {eventCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Datas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Data de Início <span className="text-destructive">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !data.startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {data.startDate ? (
                    format(data.startDate, "PPP", { locale: ptBR })
                  ) : (
                    <span>Selecione a data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={data.startDate}
                  onSelect={(date) => updateData({ startDate: date })}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Data de Término <span className="text-destructive">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !data.endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {data.endDate ? (
                    format(data.endDate, "PPP", { locale: ptBR })
                  ) : (
                    <span>Selecione a data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={data.endDate}
                  onSelect={(date) => updateData({ endDate: date })}
                  disabled={(date) => data.startDate ? date < data.startDate : date < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Horários */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startTime" className="text-sm font-medium">
              Horário de Início (opcional)
            </Label>
            <Input
              id="startTime"
              type="time"
              value={data.startTime}
              onChange={(e) => updateData({ startTime: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endTime" className="text-sm font-medium">
              Horário de Término (opcional)
            </Label>
            <Input
              id="endTime"
              type="time"
              value={data.endTime}
              onChange={(e) => updateData({ endTime: e.target.value })}
            />
          </div>
        </div>

        {/* Website */}
        <div className="space-y-2">
          <Label htmlFor="website" className="text-sm font-medium">
            Site Oficial (opcional)
          </Label>
          <Input
            id="website"
            type="url"
            value={data.website}
            onChange={(e) => updateData({ website: e.target.value })}
            placeholder="https://www.exemplo.com"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoStep;
