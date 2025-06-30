
import { MessageCircle, Users, Shield, Building, Sparkles, Zap } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: { annual: number; monthly: number };
  popular: boolean;
  features: {
    events: string;
    visitors: string;
    exhibitors: string;
    admins: string;
    support: string;
  };
  highlights: string[];
}

interface PlanRecord {
  uuid: string;
  name: string;
  price: number | null;
  price_per_month: number | null;
  type: 'anual' | 'mensal';
  is_custom: boolean;
  features: any;
}

const PLAN_DETAILS: Record<string, { description: string; popular: boolean }> = {
  Start: { description: 'Para organizadores iniciantes', popular: false },
  Scale: { description: 'Para empresas em crescimento', popular: true },
  Boom: { description: 'Para grandes eventos', popular: false },
  Enterprise: { description: 'Solução personalizada', popular: false }
};

const transformPlans = (records: PlanRecord[]): Plan[] => {
  const grouped: Record<string, { anual?: PlanRecord; mensal?: PlanRecord }> = {};
  records.forEach(r => {
    if (!grouped[r.name]) grouped[r.name] = {};
    grouped[r.name][r.type] = r;
  });

  return Object.entries(grouped).map(([name, types]) => {
    const annual = types.anual;
    const monthly = types.mensal;
    const base = annual || monthly!;
    const f = (monthly?.features || annual?.features || {}) as any;

    const features = {
      events: f.events_max === null || f.events_max === undefined ? 'Ilimitado' : `até ${f.events_max}`,
      visitors: f.visitors_max === null || f.visitors_max === undefined ? 'Ilimitado' : `até ${Number(f.visitors_max).toLocaleString('pt-BR')}`,
      exhibitors: f.exhibitors_max === null || f.exhibitors_max === undefined ? 'Ilimitado' : f.exhibitors_max === 'custom' ? 'Custom' : `até ${f.exhibitors_max}`,
      admins: f.admins_max === null || f.admins_max === undefined ? 'Ilimitado' : `${f.admins_max}`,
      support: f.support || ''
    };

    const highlights: string[] = f.features || [];

    const detail = PLAN_DETAILS[name] || { description: '', popular: false };

    return {
      id: base.uuid,
      name,
      description: detail.description,
      popular: detail.popular,
      price: {
        annual: annual?.price || 0,
        monthly: monthly?.price || 0
      },
      features,
      highlights
    } as Plan;
  });
};

export const usePlans = () => {
  return useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      const { data, error } = await supabase.from('plans').select('*');
      if (error) throw new Error(error.message);
      return transformPlans(data as PlanRecord[]);
    }
  });
};

export const addOnModules = [
  {
    name: 'LegalGPT™',
    description: 'Chat Expositor, Geração de conteúdo, FAQ automatizado',
    icon: MessageCircle,
    price: 'Sob consulta'
  },
  {
    name: 'LinkAI™',
    description: 'Matchmaking, networking inteligente, agendamento automático',
    icon: Users,
    price: 'Sob consulta'
  },
  {
    name: 'FacePass™',
    description: 'Credenciamento facial, QR e check-in',
    icon: Shield,
    price: 'Sob consulta'
  },
  {
    name: 'Digital Twin 3D & Heatmap',
    description: 'Simulação layout e fluxo',
    icon: Building,
    price: 'Sob consulta'
  },
  {
    name: 'Smart Contracts / Blockchain',
    description: 'Para contratos de locação e patrocínio',
    icon: Sparkles,
    price: 'Sob consulta'
  },
  {
    name: 'APIs e integrações avançadas',
    description: 'CRM, ERP, WhatsApp, Zapier etc.',
    icon: Zap,
    price: 'Sob consulta'
  }
];

// Nova estrutura para comparação detalhada
export const comparisonFeatures = [
  {
    category: 'Gestão de Eventos',
    features: [
      {
        name: 'Número de eventos',
        start: 'até 5',
        scale: '5 a 10',
        boom: '10 a 15',
        enterprise: 'Ilimitado'
      },
      {
        name: 'Visitantes por evento',
        start: 'até 5.000',
        scale: '5.001 a 25.000',
        boom: '25.001 a 50.000',
        enterprise: 'Ilimitado'
      },
      {
        name: 'Expositores',
        start: 'até 200',
        scale: 'até 500',
        boom: 'até 2.000',
        enterprise: 'Custom'
      }
    ]
  },
  {
    category: 'Administração',
    features: [
      {
        name: 'Usuários admin',
        start: '1',
        scale: 'até 3',
        boom: 'até 10',
        enterprise: 'Ilimitado'
      },
      {
        name: 'Dashboard completo',
        start: true,
        scale: true,
        boom: true,
        enterprise: true
      },
      {
        name: 'Relatórios avançados',
        start: false,
        scale: true,
        boom: true,
        enterprise: true
      }
    ]
  },
  {
    category: 'Tecnologia e IA',
    features: [
      {
        name: 'Check-in básico',
        start: true,
        scale: true,
        boom: true,
        enterprise: true
      },
      {
        name: 'Analytics avançados',
        start: false,
        scale: true,
        boom: true,
        enterprise: true
      },
      {
        name: 'IA avançada',
        start: false,
        scale: false,
        boom: true,
        enterprise: true
      },
      {
        name: 'White label',
        start: false,
        scale: false,
        boom: 'Básico',
        enterprise: 'Completo'
      }
    ]
  },
  {
    category: 'Suporte e Integrações',
    features: [
      {
        name: 'Suporte',
        start: 'E-mail básico',
        scale: 'E-mail + chat prioritário',
        boom: '24/7 com SLA',
        enterprise: 'Dedicado + SLA VIP'
      },
      {
        name: 'APIs completas',
        start: false,
        scale: false,
        boom: true,
        enterprise: true
      },
      {
        name: 'Integrações básicas',
        start: false,
        scale: true,
        boom: true,
        enterprise: true
      }
    ]
  }
];
