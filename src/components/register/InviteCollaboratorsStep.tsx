
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Users, Mail, Plus, X, Send, Check } from 'lucide-react';
import { emailPattern } from '@/hooks/useFormValidation';
import supabase from '@/utils/supabase/client';

interface InviteCollaboratorsStepProps {
  tenantSlug: string;
}

interface Invite {
  email: string;
  status: 'pending' | 'sent' | 'error';
}

export const InviteCollaboratorsStep: React.FC<InviteCollaboratorsStepProps> = ({ 
  tenantSlug 
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [invites, setInvites] = useState<Invite[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addEmail = () => {
    if (!emailInput.trim() || !emailPattern.test(emailInput)) {
      return;
    }

    if (invites.some(invite => invite.email === emailInput.toLowerCase())) {
      return;
    }

    setInvites(prev => [...prev, { 
      email: emailInput.toLowerCase(), 
      status: 'pending' 
    }]);
    setEmailInput('');
  };

  const removeEmail = (emailToRemove: string) => {
    setInvites(prev => prev.filter(invite => invite.email !== emailToRemove));
  };

  const sendInvite = async (email: string) => {
    setInvites(prev => prev.map(invite => 
      invite.email === email 
        ? { ...invite, status: 'pending' }
        : invite
    ));

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/invite/${tenantSlug}`
        }
      });

      if (error) throw error;

      setInvites(prev => prev.map(invite => 
        invite.email === email 
          ? { ...invite, status: 'sent' }
          : invite
      ));
    } catch (error) {
      console.error('Error sending invite:', error);
      setInvites(prev => prev.map(invite => 
        invite.email === email 
          ? { ...invite, status: 'error' }
          : invite
      ));
    }
  };

  const sendAllInvites = async () => {
    setIsLoading(true);
    const pendingInvites = invites.filter(invite => invite.status === 'pending');
    
    for (const invite of pendingInvites) {
      await sendInvite(invite.email);
    }
    
    setIsLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="text-green-500" size={16} />;
      case 'error':
        return <X className="text-destructive" size={16} />;
      default:
        return <Send className="text-muted-foreground" size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Users className="text-primary" size={20} />
          <h3 className="text-xl font-semibold">Convide sua Equipe</h3>
        </div>
        <p className="text-muted-foreground">Adicione colaboradores ao seu workspace</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Adicionar Colaborador</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                id="email"
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addEmail()}
                placeholder="colaborador@empresa.com"
                className="pl-10"
              />
            </div>
            <Button 
              onClick={addEmail}
              disabled={!emailInput.trim() || !emailPattern.test(emailInput)}
              variant="outline"
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>

        {invites.length > 0 && (
          <div className="space-y-2">
            <Label>Convites ({invites.length})</Label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {invites.map((invite) => (
                <div 
                  key={invite.email}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    {getStatusIcon(invite.status)}
                    <span className="text-sm">{invite.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {invite.status === 'pending' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => sendInvite(invite.email)}
                      >
                        Enviar
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => removeEmail(invite.email)}
                    >
                      <X size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {invites.some(invite => invite.status === 'pending') && (
          <Button 
            onClick={sendAllInvites}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Enviando...' : 'Enviar Todos os Convites'}
          </Button>
        )}

        <div className="text-center text-sm text-muted-foreground">
          <p>Os colaboradores receberão um link mágico por email</p>
          <p>Você pode adicionar mais pessoas depois</p>
        </div>
      </div>
    </div>
  );
};
