/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, Monitor, FileText } from 'lucide-react';

interface AdvancedOptionsStepProps {
  data: any;
  updateData: (data: any) => void;
}

const AdvancedOptionsStep: React.FC<AdvancedOptionsStepProps> = ({ data, updateData }) => {
  return (
    <div className="space-y-6">
      {/* Configurações de Inscrição */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Configurações de Inscrição</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="publicRegistration"
                checked={data.publicRegistration}
                onCheckedChange={(checked) => updateData({ publicRegistration: checked })}
              />
              <Label htmlFor="publicRegistration" className="text-sm font-medium">
                Permitir inscrição pública no evento
              </Label>
            </div>
            
            {data.publicRegistration && (
              <div className="pl-6 text-sm text-muted-foreground">
                Visitantes poderão se inscrever diretamente pela página do evento
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Configurações de Transmissão */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Monitor className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Transmissão Online</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isHybrid"
                checked={data.isHybrid}
                onCheckedChange={(checked) => updateData({ isHybrid: checked })}
              />
              <Label htmlFor="isHybrid" className="text-sm font-medium">
                Evento híbrido (presencial + online)
              </Label>
            </div>

            {data.isHybrid && (
              <div className="space-y-2">
                <Label htmlFor="streamingPlatform" className="text-sm font-medium">
                  Plataforma de Transmissão
                </Label>
                <Input
                  id="streamingPlatform"
                  value={data.streamingPlatform}
                  onChange={(e) => updateData({ streamingPlatform: e.target.value })}
                  placeholder="Ex: YouTube Live, Zoom, Teams, Plataforma própria"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Requisitos Especiais */}
      <div className="space-y-2">
        <Label htmlFor="specialRequirements" className="text-sm font-medium">
          Observações/Requisitos Especiais (opcional)
        </Label>
        <Textarea
          id="specialRequirements"
          value={data.specialRequirements}
          onChange={(e) => updateData({ specialRequirements: e.target.value })}
          placeholder="Descreva qualquer requisito especial, informações adicionais ou observações importantes sobre o evento"
          className="min-h-[100px]"
        />
      </div>

      {/* Termos e LGPD */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Termos e Privacidade</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="lgpdAccepted"
                checked={data.lgpdAccepted}
                onCheckedChange={(checked) => updateData({ lgpdAccepted: checked })}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="lgpdAccepted" className="text-sm font-medium">
                  Aceito as políticas de proteção de dados (LGPD) <span className="text-destructive">*</span>
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Declaro estar ciente e concordar com o tratamento de dados pessoais conforme a Lei Geral de Proteção de Dados.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="termsAccepted"
                checked={data.termsAccepted}
                onCheckedChange={(checked) => updateData({ termsAccepted: checked })}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="termsAccepted" className="text-sm font-medium">
                  Aceito os termos de uso da plataforma Eventrix <span className="text-destructive">*</span>
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Li e concordo com os termos de uso, condições de serviço e políticas da plataforma.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Aviso de Validação */}
      {(!data.lgpdAccepted || !data.termsAccepted) && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-destructive" />
            <p className="text-sm font-medium text-destructive">
              É necessário aceitar os termos obrigatórios para continuar
            </p>
          </div>
        </div>
      )}

      {/* Resumo das Configurações */}
      <div className="p-4 bg-muted/30 rounded-lg">
        <h4 className="font-medium mb-2">Resumo das Configurações</h4>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>• Inscrição pública: {data.publicRegistration ? 'Sim' : 'Não'}</p>
          <p>• Evento híbrido: {data.isHybrid ? 'Sim' : 'Não'}</p>
          {data.isHybrid && data.streamingPlatform && (
            <p>• Plataforma: {data.streamingPlatform}</p>
          )}
          <p>• Aceites obrigatórios: {(data.lgpdAccepted && data.termsAccepted) ? 'Completo' : 'Pendente'}</p>
        </div>
      </div>
    </div>
  );
};

export default AdvancedOptionsStep;
