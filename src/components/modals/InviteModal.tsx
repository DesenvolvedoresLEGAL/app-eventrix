import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const InviteModal: React.FC = () => {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Convidar Usuário</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p className="text-muted-foreground">Funcionalidade de convite será implementada em breve.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;