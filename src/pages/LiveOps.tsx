
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Activity, AlertCircle, CheckCircle, FileText, Mail, MapPin } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LiveOps = () => {
  // Sample data for chart
  const visitorData = [
    { time: '08:00', count: 45 },
    { time: '09:00', count: 120 },
    { time: '10:00', count: 240 },
    { time: '11:00', count: 380 },
    { time: '12:00', count: 450 },
    { time: '13:00', count: 410 },
    { time: '14:00', count: 490 },
    { time: '15:00', count: 520 },
    { time: '16:00', count: 480 },
    { time: '17:00', count: 390 },
  ];
  
  // Sample incident data
  const incidents = [
    { 
      id: 1, 
      type: 'security', 
      location: 'Entrada Principal', 
      time: '14:22', 
      status: 'resolved',
      description: 'Visitante com credencial não autorizada tentou acessar área restrita.',
    },
    { 
      id: 2, 
      type: 'facility', 
      location: 'Pavilhão C', 
      time: '13:05', 
      status: 'active',
      description: 'Problema com ar condicionado reportado por diversos visitantes.',
    },
    { 
      id: 3, 
      type: 'medical', 
      location: 'Food Court', 
      time: '12:47', 
      status: 'active',
      description: 'Visitante precisando de assistência médica, possível desidratação.',
    },
  ];
  
  const getIncidentIcon = (type: string) => {
    switch(type) {
      case 'security':
        return <AlertCircle size={20} className="text-red-500" />;
      case 'facility':
        return <MapPin size={20} className="text-amber-500" />;
      case 'medical':
        return <Activity size={20} className="text-blue-500" />;
      default:
        return <AlertCircle size={20} className="text-muted-foreground" />;
    }
  };
  
  const getIncidentStatus = (status: string) => {
    switch(status) {
      case 'active':
        return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Ativo</span>;
      case 'resolved':
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Resolvido</span>;
      default:
        return null;
    }
  };
  
  return (
    <DashboardLayout title="Operação ao Vivo">
      <div className="space-y-6">
        <div>
          <h2>Operação ao Vivo</h2>
          <p className="text-muted-foreground">Monitoramento em tempo real do seu evento</p>
        </div>
        
        {/* Live Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Visitantes Atuais</p>
            <div className="flex items-end gap-2 mt-1">
              <h3 className="text-2xl font-bold">487</h3>
              <div className="text-xs text-green-500 mb-1">+24 na última hora</div>
            </div>
            <div className="w-full h-1 bg-muted overflow-hidden rounded mt-2">
              <div className="h-full bg-primary rounded" style={{ width: '48%' }}></div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">48% da capacidade</div>
          </div>
          
          <div className="bg-card border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Tempo Médio de Permanência</p>
            <div className="flex items-end gap-2 mt-1">
              <h3 className="text-2xl font-bold">3.2h</h3>
              <div className="text-xs text-green-500 mb-1">+0.4h vs. ontem</div>
            </div>
            <div className="w-full h-1 bg-muted overflow-hidden rounded mt-2">
              <div className="h-full bg-secondary rounded" style={{ width: '65%' }}></div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">65% do tempo esperado</div>
          </div>
          
          <div className="bg-card border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Incidentes Ativos</p>
            <div className="flex items-end gap-2 mt-1">
              <h3 className="text-2xl font-bold">2</h3>
              <div className="text-xs text-green-500 mb-1">-5 vs. ontem</div>
            </div>
            <div className="w-full h-1 bg-muted overflow-hidden rounded mt-2">
              <div className="h-full bg-red-500 rounded" style={{ width: '20%' }}></div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">Baixa criticidade</div>
          </div>
          
          <div className="bg-card border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Temperatura Média</p>
            <div className="flex items-end gap-2 mt-1">
              <h3 className="text-2xl font-bold">23°C</h3>
              <div className="text-xs text-green-500 mb-1">Ideal</div>
            </div>
            <div className="w-full h-1 bg-muted overflow-hidden rounded mt-2">
              <div className="h-full bg-green-500 rounded" style={{ width: '75%' }}></div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">Dentro do intervalo recomendado</div>
          </div>
        </div>
        
        {/* Heat Map */}
        <div className="bg-card border rounded-lg p-5">
          <h3 className="font-semibold mb-4">Fluxo de Visitantes em Tempo Real</h3>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={visitorData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false}
                  fontSize={12}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  fontSize={12}
                />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.2} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <span className="text-sm text-muted-foreground">Áreas com maior movimento:</span>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Pavilhão A (145)</span>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Food Court (98)</span>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Auditório Principal (87)</span>
          </div>
        </div>
        
        {/* Incidents and Communications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Incidents */}
          <div className="bg-card border rounded-lg p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Incidentes Reportados</h3>
              <button className="bg-primary text-primary-foreground text-sm px-3 py-1.5 rounded-md hover:bg-primary-dark transition-colors">
                + Novo Incidente
              </button>
            </div>
            
            <div className="space-y-3">
              {incidents.map((incident) => (
                <div key={incident.id} className="flex items-start gap-3 border-b last:border-0 pb-3">
                  <div className="mt-0.5">
                    {getIncidentIcon(incident.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <h4 className="font-medium">{incident.location}</h4>
                      <div className="flex items-center gap-2 mt-1 sm:mt-0">
                        <span className="text-xs text-muted-foreground">{incident.time}</span>
                        {getIncidentStatus(incident.status)}
                      </div>
                    </div>
                    <p className="text-sm mt-1">{incident.description}</p>
                    <div className="flex gap-2 mt-2">
                      <button className="text-xs px-2 py-1 bg-muted rounded hover:bg-muted-foreground/20 transition-colors">
                        Atribuir
                      </button>
                      <button className="text-xs px-2 py-1 bg-muted rounded hover:bg-muted-foreground/20 transition-colors">
                        Atualizar
                      </button>
                      <button className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200 transition-colors">
                        Resolver
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Communications */}
          <div className="bg-card border rounded-lg p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Comunicações Rápidas</h3>
              <button className="bg-secondary text-secondary-foreground text-sm px-3 py-1.5 rounded-md hover:bg-secondary/80 transition-colors">
                + Nova Mensagem
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-3 border rounded-md p-3">
                <div className="mt-0.5">
                  <CheckCircle size={20} className="text-green-500" />
                </div>
                <div>
                  <h4 className="font-medium">Todos os Staffs</h4>
                  <p className="text-sm">Enviar um alerta ou comunicado rápido para toda a equipe.</p>
                  <button className="text-sm text-primary mt-2">Enviar Mensagem</button>
                </div>
              </div>
              
              <div className="flex gap-3 border rounded-md p-3">
                <div className="mt-0.5">
                  <Mail size={20} className="text-secondary" />
                </div>
                <div>
                  <h4 className="font-medium">Visitantes no Local</h4>
                  <p className="text-sm">Enviar notificação push para todos os visitantes presentes.</p>
                  <button className="text-sm text-primary mt-2">Enviar Notificação</button>
                </div>
              </div>
              
              <div className="flex gap-3 border rounded-md p-3">
                <div className="mt-0.5">
                  <FileText size={20} className="text-tertiary" />
                </div>
                <div>
                  <h4 className="font-medium">Relatório de Ocorrências</h4>
                  <p className="text-sm">Gerar relatório de ocorrências das últimas 24 horas.</p>
                  <button className="text-sm text-primary mt-2">Gerar Relatório</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LiveOps;
