
import React from 'react';
import LinkAI from '@/components/ai-tools/LinkAI';

const CommunicationLinkAI = () => {
  return (
    
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">LinkAI™</h2>
          <p className="text-muted-foreground">
            Ferramenta de IA para networking inteligente e conexões entre participantes
          </p>
        </div>
        
        <LinkAI />
      </div>
    
  );
};

export default CommunicationLinkAI;
