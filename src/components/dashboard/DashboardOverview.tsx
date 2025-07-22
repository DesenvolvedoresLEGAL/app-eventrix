
import React from 'react';
import KpiCard from '../ui-custom/KpiCard';
import ChartCard from '../ui-custom/ChartCard';
import { Calendar, DollarSign, Users, Star, Zap, TrendingUp, Activity } from 'lucide-react';

const DashboardOverview = () => {
  // Sample user data - in a real app, this would come from user context/auth
  const userName = "Admin LEGAL";

  // Sample data for charts
  const eventTrendData = [
    { name: 'Jan', value: 12 },
    { name: 'Fev', value: 19 },
    { name: 'Mar', value: 15 },
    { name: 'Abr', value: 25 },
    { name: 'Mai', value: 32 },
    { name: 'Jun', value: 28 },
    { name: 'Jul', value: 30 },
  ];

  const attendeeData = [
    { name: 'Seg', value: 420 },
    { name: 'Ter', value: 850 },
    { name: 'Qua', value: 1200 },
    { name: 'Qui', value: 980 },
    { name: 'Sex', value: 760 },
    { name: 'Sáb', value: 350 },
  ];

  return (
    <div className="space-y-8 tech-grid min-h-full p-6">
      {/* Welcome section with minimalist tech design */}
      <div className="tech-card p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/5 rounded-full -mr-12 -mt-12 tech-float"></div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between relative z-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Bem-vindo, <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{userName}</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-4">Gerencie seus eventos com tecnologia EVENTRIX</p>
            <div className="tech-badge tech-glow">
              <Zap size={12} />
              <span>Powered by LEGAL AI</span>
            </div>
          </div>
          <button className="tech-button px-6 py-3 mt-6 sm:mt-0 font-semibold">
            + Novo Evento
          </button>
        </div>
      </div>
      
      {/* KPI Cards with minimalist design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="tech-kpi-card">
          <KpiCard 
            title="Total de Eventos" 
            value="24" 
            icon={<Calendar />} 
            trend={{ value: 12, isPositive: true }}
          />
        </div>
        <div className="tech-kpi-card">
          <KpiCard 
            title="Receita Total" 
            value="R$ 842.500" 
            icon={<DollarSign />} 
            trend={{ value: 8.5, isPositive: true }}
          />
        </div>
        <div className="tech-kpi-card">
          <KpiCard 
            title="Expositores" 
            value="164" 
            icon={<Users />} 
            trend={{ value: 5.2, isPositive: true }}
          />
        </div>
        <div className="tech-kpi-card">
          <KpiCard 
            title="NPS Médio" 
            value="8.7" 
            icon={<Star />} 
            trend={{ value: 1.2, isPositive: true }}
          />
        </div>
      </div>
      
      {/* Charts with clean design */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="tech-card p-6">
          <ChartCard 
            title="Crescimento de Eventos" 
            subtitle="Últimos 7 meses" 
            type="line" 
            data={eventTrendData}
          />
        </div>
        <div className="tech-card p-6">
          <ChartCard 
            title="Visitantes por Dia" 
            subtitle="Evento atual" 
            type="bar" 
            data={attendeeData} 
          />
        </div>
      </div>
      
      {/* Minimalist bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Events */}
        <div className="tech-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Próximos Eventos</h3>
            <div className="tech-badge">
              <Zap size={10} />
              <span>AI</span>
            </div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center mr-3">
                    <Calendar size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Tech Summit {2023 + i}</p>
                    <p className="text-sm text-muted-foreground">10-12 de Outubro, {2023 + i}</p>
                  </div>
                </div>
                <div className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                  {i === 1 ? 'Em 3 semanas' : i === 2 ? 'Em 2 meses' : 'Em 6 meses'}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-primary hover:text-primary/80 font-medium text-sm transition-colors">
            Ver todos os eventos
          </button>
        </div>
        
        {/* Tech Insights */}
        <div className="tech-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Insights Inteligentes</h3>
            <div className="tech-badge">
              <TrendingUp size={10} />
              <span>IA</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start p-4 rounded-lg hover:bg-muted/50 transition-colors duration-200">
              <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center mr-3 mt-0.5">
                <Activity size={14} className="text-secondary" />
              </div>
              <div>
                <p className="font-medium text-sm mb-1">Padrão de Engajamento</p>
                <p className="text-xs text-muted-foreground">Palestras sobre IA geram 22% mais interesse nas quartas-feiras.</p>
              </div>
            </div>
            <div className="flex items-start p-4 rounded-lg hover:bg-muted/50 transition-colors duration-200">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mr-3 mt-0.5">
                <Users size={14} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm mb-1">Expansão Recomendada</p>
                <p className="text-xs text-muted-foreground">Aumentar 15% do espaço para expositores de blockchain.</p>
              </div>
            </div>
            <div className="flex items-start p-4 rounded-lg hover:bg-muted/50 transition-colors duration-200">
              <div className="w-8 h-8 rounded-lg bg-tertiary/20 flex items-center justify-center mr-3 mt-0.5">
                <TrendingUp size={14} className="text-tertiary" />
              </div>
              <div>
                <p className="font-medium text-sm mb-1">Previsão de Tráfego</p>
                <p className="text-xs text-muted-foreground">22% mais visitantes previstos na próxima edição.</p>
              </div>
            </div>
          </div>
          <button className="w-full mt-4 text-primary hover:text-primary/80 font-medium text-sm transition-colors">
            Ver todos os insights
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
