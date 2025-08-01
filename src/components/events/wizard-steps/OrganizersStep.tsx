/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, X, Mail, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OrganizersStepProps {
  data: any;
  updateData: (data: any) => void;
}

interface TeamMember {
  name: string;
  email: string;
  role: string;
}

const OrganizersStep: React.FC<OrganizersStepProps> = ({ data, updateData }) => {
  const [newMember, setNewMember] = useState<TeamMember>({ name: '', email: '', role: '' });
  const { toast } = useToast();

  const addTeamMember = () => {
    if (!newMember.name || !newMember.email) {
      toast({
        title: "Campos obrigatórios",
        description: "Nome e email são obrigatórios para adicionar um membro da equipe.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newMember.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um endereço de email válido.",
        variant: "destructive",
      });
      return;
    }

    const updatedMembers = [...(data.teamMembers || []), newMember];
    updateData({ teamMembers: updatedMembers });
    setNewMember({ name: '', email: '', role: '' });
    
    toast({
      title: "Membro adicionado",
      description: `${newMember.name} foi adicionado à equipe.`,
    });
  };

  const removeMember = (index: number) => {
    const updatedMembers = data.teamMembers.filter((_: any, i: number) => i !== index);
    updateData({ teamMembers: updatedMembers });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="space-y-6">
      {/* Organizador Principal */}
      <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <User className="h-5 w-5" />
          Organizador Principal
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="organizerName" className="text-sm font-medium">
              Nome Completo <span className="text-destructive">*</span>
            </Label>
            <Input
              id="organizerName"
              value={data.organizerName}
              onChange={(e) => updateData({ organizerName: e.target.value })}
              placeholder="Seu nome completo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="primaryEmail" className="text-sm font-medium">
              Email Principal <span className="text-destructive">*</span>
            </Label>
            <Input
              id="primaryEmail"
              type="email"
              value={data.primaryEmail}
              onChange={(e) => updateData({ primaryEmail: e.target.value })}
              placeholder="seu@email.com"
              className={!validateEmail(data.primaryEmail) && data.primaryEmail ? 'border-destructive' : ''}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Telefone/WhatsApp (opcional)
            </Label>
            <Input
              id="phone"
              value={data.phone}
              onChange={(e) => updateData({ phone: e.target.value })}
              placeholder="(11) 99999-9999"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm font-medium">
              Empresa/Instituição (opcional)
            </Label>
            <Input
              id="company"
              value={data.company}
              onChange={(e) => updateData({ company: e.target.value })}
              placeholder="Nome da empresa ou instituição"
            />
          </div>
        </div>
      </div>

      {/* Equipe */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Equipe do Evento</h3>
        <p className="text-sm text-muted-foreground">
          Adicione membros da sua equipe que terão acesso ao painel de organização
        </p>

        {/* Lista de membros existentes */}
        {data.teamMembers && data.teamMembers.length > 0 && (
          <div className="space-y-2">
            {data.teamMembers.map((member: TeamMember, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{member.name}</span>
                    {member.role && (
                      <span className="text-xs bg-muted px-2 py-1 rounded">
                        {member.role}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{member.email}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeMember(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Adicionar novo membro */}
        <div className="p-4 border-2 border-dashed border-muted rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <div className="space-y-2">
              <Label htmlFor="memberName" className="text-sm font-medium">
                Nome
              </Label>
              <Input
                id="memberName"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                placeholder="Nome do membro"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="memberEmail" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="memberEmail"
                type="email"
                value={newMember.email}
                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                placeholder="email@exemplo.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="memberRole" className="text-sm font-medium">
                Função (opcional)
              </Label>
              <Input
                id="memberRole"
                value={newMember.role}
                onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                placeholder="Ex: Coordenador"
              />
            </div>
          </div>

          <Button 
            onClick={addTeamMember}
            variant="outline"
            className="w-full flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Adicionar Membro da Equipe
          </Button>
        </div>
      </div>

      {/* Resumo */}
      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
        <h4 className="font-medium mb-2">Resumo da Equipe</h4>
        <div className="text-sm text-muted-foreground">
          <p>• 1 organizador principal: {data.organizerName || 'Não informado'}</p>
          <p>• {data.teamMembers?.length || 0} membros da equipe</p>
          {data.company && <p>• Empresa: {data.company}</p>}
        </div>
      </div>
    </div>
  );
};

export default OrganizersStep;
