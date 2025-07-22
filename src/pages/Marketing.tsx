
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import LegalGPT from '@/components/ai-tools/LegalGPT';
import { Mail, ExternalLink, Globe, Send, ChevronRight } from 'lucide-react';

const Marketing = () => {
  return (
    <DashboardLayout title="Marketing e Comunicação">
      <div className="space-y-6">
        <div>
          <h2>Marketing e Comunicação</h2>
          <p className="text-muted-foreground">Gerencie suas comunicações e ferramentas de marketing</p>
        </div>
        
        {/* Marketing Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border rounded-lg p-4 hover:bg-muted/20 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-primary/10 p-2 rounded">
                <Globe size={20} className="text-primary" />
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </div>
            <h3 className="font-medium">Landing Pages</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Crie e gerencie landing pages para seu evento
            </p>
            <div className="mt-3 text-xs font-medium text-primary">
              5 páginas ativas
            </div>
          </div>
          
          <div className="bg-card border rounded-lg p-4 hover:bg-muted/20 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-secondary/10 p-2 rounded">
                <Mail size={20} className="text-secondary" />
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </div>
            <h3 className="font-medium">Email Marketing</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Envie campanhas de email para seus participantes
            </p>
            <div className="mt-3 text-xs font-medium text-secondary">
              2 campanhas enviadas hoje
            </div>
          </div>
          
          <div className="bg-card border rounded-lg p-4 hover:bg-muted/20 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-tertiary/10 p-2 rounded">
                <Send size={20} className="text-tertiary" />
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </div>
            <h3 className="font-medium">Notificações Push</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Envie alertas e notificações para o aplicativo do evento
            </p>
            <div className="mt-3 text-xs font-medium text-tertiary">
              254 dispositivos ativos
            </div>
          </div>
        </div>
        
        {/* AI Content Generation */}
        <div className="bg-card border rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-semibold flex items-center gap-2">
              <div className="bg-primary/10 p-1 rounded">
                <div className="text-sm font-bold text-primary">AI</div>
              </div>
              LegalGPT™ - Gerador de Conteúdo
            </h3>
            <p className="text-sm mt-1">
              Use inteligência artificial para gerar textos para email marketing, landing pages e comunicações.
            </p>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b">
            <button className="px-4 py-2 text-sm font-medium border-b-2 border-primary text-primary">
              Geração de Texto
            </button>
            <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              Templates
            </button>
            <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              Histórico
            </button>
          </div>
          
          <div className="p-4">
            <LegalGPT />
          </div>
        </div>
        
        {/* Latest Analytics */}
        <div className="bg-card border rounded-lg p-5">
          <h3 className="font-semibold mb-4">Análises de Marketing</h3>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4">
              <div>
                <h4 className="font-medium">Landing Page - Tech Summit 2024</h4>
                <p className="text-sm text-muted-foreground">techsummit2024.evento.com</p>
              </div>
              <div className="mt-2 sm:mt-0 flex items-center gap-2">
                <div className="text-sm">
                  <span className="font-semibold">5,234</span>
                  <span className="text-muted-foreground ml-1">visitas</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-green-500">12.4%</span>
                  <span className="text-muted-foreground ml-1">conversão</span>
                </div>
                <button className="p-1.5 rounded-md hover:bg-muted">
                  <ExternalLink size={16} className="text-muted-foreground" />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4">
              <div>
                <h4 className="font-medium">Email - "Últimos dias para inscrição"</h4>
                <p className="text-sm text-muted-foreground">Enviado há 2 dias</p>
              </div>
              <div className="mt-2 sm:mt-0 flex items-center gap-2">
                <div className="text-sm">
                  <span className="font-semibold">12,450</span>
                  <span className="text-muted-foreground ml-1">envios</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-green-500">24.8%</span>
                  <span className="text-muted-foreground ml-1">abertura</span>
                </div>
                <button className="p-1.5 rounded-md hover:bg-muted">
                  <ExternalLink size={16} className="text-muted-foreground" />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="font-medium">Notificação - "Palestra em 30 minutos"</h4>
                <p className="text-sm text-muted-foreground">Enviado hoje às 14:30</p>
              </div>
              <div className="mt-2 sm:mt-0 flex items-center gap-2">
                <div className="text-sm">
                  <span className="font-semibold">854</span>
                  <span className="text-muted-foreground ml-1">envios</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-green-500">78.2%</span>
                  <span className="text-muted-foreground ml-1">visualização</span>
                </div>
                <button className="p-1.5 rounded-md hover:bg-muted">
                  <ExternalLink size={16} className="text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Marketing;
