/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VisualIdentityStepProps {
  data: any;
  updateData: (data: any) => void;
}

const fontStyles = [
  { value: 'modern', label: 'Moderno (Sans-serif)' },
  { value: 'classic', label: 'Clássico (Serif)' },
  { value: 'elegant', label: 'Elegante (Script)' },
  { value: 'tech', label: 'Tecnológico (Monospace)' }
];

const colorPalettes = [
  { name: 'Azul Corporativo', primary: '#3B82F6', secondary: '#1E40AF' },
  { name: 'Roxo Criativo', primary: '#8B5CF6', secondary: '#7C3AED' },
  { name: 'Verde Sustentável', primary: '#10B981', secondary: '#059669' },
  { name: 'Laranja Energético', primary: '#F59E0B', secondary: '#D97706' },
  { name: 'Vermelho Dinâmico', primary: '#EF4444', secondary: '#DC2626' },
  { name: 'Rosa Moderno', primary: '#EC4899', secondary: '#DB2777' },
];

const VisualIdentityStep: React.FC<VisualIdentityStepProps> = ({ data, updateData }) => {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (file: File, type: 'logo' | 'banner') => {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "Arquivo muito grande",
        description: "O arquivo deve ter no máximo 5MB.",
        variant: "destructive",
      });
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Formato inválido",
        description: "Por favor, selecione apenas arquivos de imagem.",
        variant: "destructive",
      });
      return;
    }

    updateData({ [type]: file });
  };

  const removeFile = (type: 'logo' | 'banner') => {
    updateData({ [type]: null });
    if (type === 'logo' && logoInputRef.current) {
      logoInputRef.current.value = '';
    }
    if (type === 'banner' && bannerInputRef.current) {
      bannerInputRef.current.value = '';
    }
  };

  const FileUploadArea = ({ 
    type, 
    file, 
    required = false 
  }: { 
    type: 'logo' | 'banner'; 
    file: File | null; 
    required?: boolean;
  }) => {
    const inputRef = type === 'logo' ? logoInputRef : bannerInputRef;
    const title = type === 'logo' ? 'Logo do Evento' : 'Banner Principal';
    const description = type === 'logo' ? 
      'Formato recomendado: PNG ou SVG, fundo transparente' : 
      'Formato recomendado: JPG ou PNG, proporção 16:9';

    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          {title} {required && <span className="text-destructive">*</span>}
        </Label>
        
        {!file ? (
          <div
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-1">
              Clique para fazer upload ou arraste o arquivo aqui
            </p>
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Máximo 5MB
            </p>
          </div>
        ) : (
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => inputRef.current?.click()}
                >
                  Trocar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeFile(type)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file, type);
          }}
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Upload do Logo */}
      <FileUploadArea type="logo" file={data.logo} required />

      {/* Upload do Banner */}
      <FileUploadArea type="banner" file={data.banner} />

      {/* Paleta de Cores */}
      <div className="space-y-4">
        <Label className="text-sm font-medium">Paleta de Cores (opcional)</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {colorPalettes.map((palette) => (
            <div
              key={palette.name}
              className={`border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
                data.primaryColor === palette.primary 
                  ? 'border-primary shadow-md' 
                  : 'border-muted'
              }`}
              onClick={() => updateData({ 
                primaryColor: palette.primary, 
                secondaryColor: palette.secondary 
              })}
            >
              <div className="flex gap-2 mb-2">
                <div 
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: palette.primary }}
                />
                <div 
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: palette.secondary }}
                />
              </div>
              <p className="text-xs font-medium">{palette.name}</p>
            </div>
          ))}
        </div>

        {/* Cores Personalizadas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
          <div className="space-y-2">
            <Label htmlFor="primaryColor" className="text-sm font-medium">
              Cor Primária
            </Label>
            <div className="flex gap-2">
              <input
                id="primaryColor"
                type="color"
                value={data.primaryColor}
                onChange={(e) => updateData({ primaryColor: e.target.value })}
                className="w-12 h-10 border rounded cursor-pointer"
              />
              <div className="flex-1 px-3 py-2 border rounded-md bg-muted text-sm">
                {data.primaryColor}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="secondaryColor" className="text-sm font-medium">
              Cor Secundária
            </Label>
            <div className="flex gap-2">
              <input
                id="secondaryColor"
                type="color"
                value={data.secondaryColor}
                onChange={(e) => updateData({ secondaryColor: e.target.value })}
                className="w-12 h-10 border rounded cursor-pointer"
              />
              <div className="flex-1 px-3 py-2 border rounded-md bg-muted text-sm">
                {data.secondaryColor}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estilo de Fonte */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Estilo de Fonte (opcional)</Label>
        <Select value={data.fontStyle} onValueChange={(value) => updateData({ fontStyle: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o estilo de fonte" />
          </SelectTrigger>
          <SelectContent>
            {fontStyles.map((style) => (
              <SelectItem key={style.value} value={style.value}>
                {style.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Preview */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Preview da Identidade</Label>
        <div 
          className="p-6 rounded-lg border-2"
          style={{ 
            backgroundColor: `${data.primaryColor}10`,
            borderColor: data.primaryColor 
          }}
        >
          <div className="text-center">
            <div 
              className="inline-block px-4 py-2 rounded-lg text-white font-semibold mb-2"
              style={{ backgroundColor: data.primaryColor }}
            >
              {data.name || 'Nome do Evento'}
            </div>
            <p 
              className="text-sm"
              style={{ color: data.secondaryColor }}
            >
              Preview da identidade visual do seu evento
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualIdentityStep;
