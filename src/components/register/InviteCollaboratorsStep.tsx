
import React from 'react';
import { Users, Mail, Plus, X, Send, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface Collaborator {
  id: string;
  email: string;
  role: string;
  invited: boolean;
}

interface InviteCollaboratorsStepProps {
  collaborators: Collaborator[];
  newCollaboratorEmail: string;
  onNewEmailChange: (email: string) => void;
  onAddCollaborator: () => void;
  onRemoveCollaborator: (id: string) => void;
  onSendInvites: () => void;
  isSendingInvites: boolean;
}

/**
 * Componente para o terceiro passo do wizard - Convitar Colaboradores
 */
const InviteCollaboratorsStep: React.FC<InviteCollaboratorsStepProps> = ({
  collaborators,
  newCollaboratorEmail,
  onNewEmailChange,
  onAddCollaborator,
  onRemoveCollaborator,
  onSendInvites,
  isSendingInvites
}) => {
  const handleAddCollaborator = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCollaboratorEmail.trim()) {
      onAddCollaborator();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Users className="text-primary" size={24} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Convitar Colaboradores</h2>
        <p className="text-muted-foreground">Adicione membros à sua equipe (opcional)</p>
      </div>

      <div className="space-y-4">
        <form onSubmit={handleAddCollaborator} className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="collaboratorEmail" className="sr-only">Email do colaborador</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                id="collaboratorEmail"
                type="email"
                value={newCollaboratorEmail}
                onChange={(e) => onNewEmailChange(e.target.value)}
                placeholder="colaborador@empresa.com"
                className="pl-10"
              />
            </div>
          </div>
          <Button type="submit" disabled={!newCollaboratorEmail.trim()}>
            <Plus size={16} />
          </Button>
        </form>

        {collaborators.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium text-sm">Colaboradores adicionados:</h3>
            <div className="space-y-2">
              {collaborators.map((collaborator) => (
                <div
                  key={collaborator.id}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      {collaborator.invited ? (
                        <Check className="text-green-500" size={14} />
                      ) : (
                        <Mail className="text-primary" size={14} />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{collaborator.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {collaborator.invited ? 'Convite enviado' : 'Aguardando convite'}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveCollaborator(collaborator.id)}
                    disabled={collaborator.invited}
                  >
                    <X size={14} />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              onClick={onSendInvites}
              disabled={isSendingInvites || collaborators.every(c => c.invited)}
              className="w-full"
            >
              {isSendingInvites ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enviando convites...
                </>
              ) : (
                <>
                  <Send size={16} className="mr-2" />
                  Enviar convites por email
                </>
              )}
            </Button>
          </div>
        )}

        <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-secondary">
          <h4 className="font-medium text-sm mb-2">✨ Sobre os convites</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Os colaboradores receberão um link mágico por email</li>
            <li>• Eles poderão acessar diretamente sem criar senha</li>
            <li>• Você pode gerenciar permissões depois na área de configurações</li>
            <li>• Este passo é opcional, você pode pular se preferir</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InviteCollaboratorsStep;
