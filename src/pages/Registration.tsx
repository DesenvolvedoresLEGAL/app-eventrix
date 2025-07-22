
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import FacePass from '@/components/ai-tools/FacePass';
import { QrCode, ChevronRight } from 'lucide-react';

const Registration = () => {
  return (
    <DashboardLayout title="Credenciamento">
      <div className="space-y-6">
        <div>
          <h2>Credenciamento</h2>
          <p className="text-muted-foreground">Gerencie o credenciamento de visitantes</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Total Registrado</p>
            <h3 className="text-2xl font-bold mt-1">3,245</h3>
            <p className="text-xs text-green-500 mt-2">+125 hoje</p>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Check-ins</p>
            <h3 className="text-2xl font-bold mt-1">1,892</h3>
            <p className="text-xs text-green-500 mt-2">58% dos registrados</p>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Tempo Médio</p>
            <h3 className="text-2xl font-bold mt-1">8.6s</h3>
            <p className="text-xs text-green-500 mt-2">2.3s mais rápido que ontem</p>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Validação Facial</p>
            <h3 className="text-2xl font-bold mt-1">96%</h3>
            <p className="text-xs text-green-500 mt-2">Taxa de sucesso</p>
          </div>
        </div>
        
        {/* Credentialing Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* FacePass */}
          <div className="bg-card border rounded-lg overflow-hidden">
            <div className="p-4 border-b bg-primary/5">
              <h3 className="font-semibold flex items-center gap-2">
                <div className="bg-primary/10 p-1 rounded">
                  <div className="text-sm font-bold text-primary">F</div>
                </div>
                FacePass™ - Tecnologia de Reconhecimento Facial
              </h3>
              <p className="text-sm mt-1">
                Reconhecimento facial de alta precisão para check-in automático e seguro.
              </p>
            </div>
            
            <div className="p-4">
              <FacePass />
            </div>
          </div>
          
          {/* QR Code */}
          <div className="bg-card border rounded-lg overflow-hidden">
            <div className="p-4 border-b bg-secondary/5">
              <h3 className="font-semibold flex items-center gap-2">
                <div className="bg-secondary/10 p-1 rounded">
                  <div className="text-sm font-bold text-secondary">QR</div>
                </div>
                Gestão de QR Code
              </h3>
              <p className="text-sm mt-1">
                Criação e gerenciamento de QR codes para check-in rápido e fácil.
              </p>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 hover:bg-muted/30 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div className="bg-secondary/10 p-2 rounded">
                      <QrCode size={24} className="text-secondary" />
                    </div>
                    <ChevronRight size={20} className="text-muted-foreground" />
                  </div>
                  <h4 className="font-medium mt-3">Gerar QR Codes</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Crie QR codes individuais ou em lote para seus participantes.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4 hover:bg-muted/30 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div className="bg-secondary/10 p-2 rounded">
                      <QrCode size={24} className="text-secondary" />
                    </div>
                    <ChevronRight size={20} className="text-muted-foreground" />
                  </div>
                  <h4 className="font-medium mt-3">Scanner</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Escaneie QR codes para validar entradas no evento.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4 hover:bg-muted/30 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div className="bg-secondary/10 p-2 rounded">
                      <QrCode size={24} className="text-secondary" />
                    </div>
                    <ChevronRight size={20} className="text-muted-foreground" />
                  </div>
                  <h4 className="font-medium mt-3">Estatísticas</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Analise dados de check-in e fluxo de participantes.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4 hover:bg-muted/30 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div className="bg-secondary/10 p-2 rounded">
                      <QrCode size={24} className="text-secondary" />
                    </div>
                    <ChevronRight size={20} className="text-muted-foreground" />
                  </div>
                  <h4 className="font-medium mt-3">Configurações</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Personalize as opções de QR code e check-in.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Registration;
