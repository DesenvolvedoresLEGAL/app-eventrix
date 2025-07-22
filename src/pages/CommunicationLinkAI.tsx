
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import LinkAI from '@/components/ai-tools/LinkAI';

const CommunicationLinkAI = () => {
  return (
    <DashboardLayout title="LinkAI">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">LinkAI™</h2>
          <p className="text-muted-foreground">
            Ferramenta de IA para networking inteligente e conexões entre participantes
          </p>
        </div>
        
        <LinkAI />
      </div>
    </DashboardLayout>
  );
};

export default CommunicationLinkAI;
