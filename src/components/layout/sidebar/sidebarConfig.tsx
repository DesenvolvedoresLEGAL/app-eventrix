
import React from 'react';
import { 
  BarChart3, 
  Calendar, 
  Users, 
  QrCode, 
  Mail, 
  Activity, 
  DollarSign, 
  Settings, 
  Home,
  Plus,
  UserPlus,
  UserCheck,
  Shield,
  MapPin,
  CheckSquare,
  Bell,
  MessageSquare,
  TrendingUp,
  Puzzle,
  Zap,
  HelpCircle,
  Eye,
  Scan,
  History,
  Megaphone,
  FileText,
  Globe,
  Bot,
  Star,
  Building,
  Briefcase,
  Presentation,
  Target,
  Package
} from 'lucide-react';

export interface NavigationItem {
  icon: React.ReactNode;
  label: string;
  to: string;
  badge?: string;
  highlighted?: boolean;
  requiredPermission?: string;
}

export interface NavigationGroup {
  id: string;
  icon: React.ReactNode;
  label: string;
  priority: 'high' | 'medium' | 'low';
  items: NavigationItem[];
  requiredPermission?: string;
}

export const dashboardItem: NavigationItem = { 
  icon: <Home size={16} />, 
  label: 'Painel do Organizador', 
  to: '/dashboard',
  requiredPermission: 'view_dashboard'
};

export const eventsItems: NavigationItem[] = [
  { 
    icon: <Calendar size={16} />, 
    label: 'Lista de Eventos', 
    to: '/events',
    requiredPermission: 'view_events'
  },
  { 
    icon: <Plus size={16} />, 
    label: 'Novo Evento', 
    to: '/events/new', 
    highlighted: true, 
    badge: 'Novo',
    requiredPermission: 'manage_events'
  },
];

export const menuGroups: NavigationGroup[] = [
  {
    id: 'users',
    icon: <Users size={16} />,
    label: 'Usuários',
    priority: 'high' as const,
    requiredPermission: 'manage_users',
    items: [
      { 
        icon: <Building size={16} />, 
        label: 'Expositores', 
        to: '/exhibitors',
        requiredPermission: 'view_users'
      },
      { 
        icon: <Briefcase size={16} />, 
        label: 'Fornecedores', 
        to: '/suppliers',
        requiredPermission: 'view_users'
      },
      { 
        icon: <Shield size={16} />, 
        label: 'Permissões e Perfis', 
        to: '/permissions',
        requiredPermission: 'manage_permissions'
      },
      { 
        icon: <UserPlus size={16} />, 
        label: 'Staff', 
        to: '/staff',
        requiredPermission: 'view_users'
      },
      { 
        icon: <UserCheck size={16} />, 
        label: 'Visitantes', 
        to: '/visitors',
        requiredPermission: 'view_users'
      },
    ]
  },
  {
    id: 'agenda',
    icon: <Calendar size={16} />,
    label: 'Agenda',
    priority: 'high' as const,
    requiredPermission: 'manage_activities',
    items: [
      { 
        icon: <Activity size={16} />, 
        label: 'Atividades', 
        to: '/activities',
        requiredPermission: 'view_activities'
      },
      { 
        icon: <Presentation size={16} />, 
        label: 'Palestras', 
        to: '/lectures',
        requiredPermission: 'view_activities'
      },
      { 
        icon: <MapPin size={16} />, 
        label: 'Salas/Locais', 
        to: '/venues',
        requiredPermission: 'manage_venues'
      },
      { 
        icon: <Target size={16} />, 
        label: 'Trilhas', 
        to: '/tracks',
        requiredPermission: 'view_activities'
      },
    ]
  },
  {
    id: 'tasks',
    icon: <CheckSquare size={16} />,
    label: 'Tarefas',
    priority: 'medium' as const,
    requiredPermission: 'view_checklist',
    items: [
      { 
        icon: <CheckSquare size={16} />, 
        label: 'Checklist', 
        to: '/checklist',
        requiredPermission: 'view_checklist'
      },
      { 
        icon: <Users size={16} />, 
        label: 'Por Equipe', 
        to: '/team-tasks',
        requiredPermission: 'manage_tasks'
      },
      { 
        icon: <Package size={16} />, 
        label: 'Por Fornecedor', 
        to: '/supplier-tasks',
        requiredPermission: 'manage_tasks'
      },
    ]
  },
  {
    id: 'credentialing',
    icon: <QrCode size={16} />,
    label: 'Credenciamento Digital',
    priority: 'medium' as const,
    requiredPermission: 'manage_checkin',
    items: [
      { 
        icon: <Scan size={16} />, 
        label: 'Check-in/Check-out', 
        to: '/checkin',
        requiredPermission: 'manage_checkin'
      },
      { 
        icon: <QrCode size={16} />, 
        label: 'Geração QR Code/Badge', 
        to: '/registration',
        requiredPermission: 'manage_checkin'
      },
      { 
        icon: <History size={16} />, 
        label: 'Histórico de Acessos', 
        to: '/access-history',
        requiredPermission: 'view_access_history'
      },
    ]
  },
  {
    id: 'marketing',
    icon: <Megaphone size={16} />,
    label: 'Marketing',
    priority: 'medium' as const,
    requiredPermission: 'manage_content',
    items: [
      { 
        icon: <Megaphone size={16} />, 
        label: 'Ads', 
        to: '/marketing/ads',
        requiredPermission: 'manage_marketing'
      },
      { 
        icon: <FileText size={16} />, 
        label: 'Conteúdo', 
        to: '/marketing/content',
        requiredPermission: 'manage_content'
      },
      { 
        icon: <Mail size={16} />, 
        label: 'E-mails', 
        to: '/marketing/email',
        requiredPermission: 'manage_emails'
      },
      { 
        icon: <Globe size={16} />, 
        label: 'Pages', 
        to: '/marketing/pages',
        requiredPermission: 'manage_marketing_pages'
      },
    ]
  },
  {
    id: 'communication',
    icon: <MessageSquare size={16} />,
    label: 'Comunicação',
    priority: 'medium' as const,
    requiredPermission: 'manage_communication',
    items: [
      { 
        icon: <Bot size={16} />, 
        label: 'HumanGPT', 
        to: '/communication/humangpt',
        requiredPermission: 'manage_communication'
      },
      { 
        icon: <Bell size={16} />, 
        label: 'Notificações', 
        to: '/communication/notifications',
        requiredPermission: 'manage_communication'
      },
    ]
  },
  {
    id: 'analytics',
    icon: <BarChart3 size={16} />,
    label: 'Analytics & Relatórios',
    priority: 'medium' as const,
    requiredPermission: 'view_analytics',
    items: [
      { 
        icon: <BarChart3 size={16} />, 
        label: 'Dashboards', 
        to: '/analytics',
        requiredPermission: 'view_analytics'
      },
      { 
        icon: <TrendingUp size={16} />, 
        label: 'Inteligência de Negócios', 
        to: '/analytics/engagement',
        requiredPermission: 'view_analytics'
      },
      { 
        icon: <FileText size={16} />, 
        label: 'Relatórios', 
        to: '/reports',
        requiredPermission: 'view_reports'
      },
    ]
  },
  {
    id: 'integrations',
    icon: <Puzzle size={16} />,
    label: 'Integrações',
    priority: 'low' as const,
    requiredPermission: 'manage_integrations',
    items: [
      { 
        icon: <Globe size={16} />, 
        label: 'APIs', 
        to: '/api-management',
        requiredPermission: 'manage_apis'
      },
      { 
        icon: <Puzzle size={16} />, 
        label: 'Plugins', 
        to: '/integrations',
        requiredPermission: 'manage_integrations'
      },
    ]
  },
  {
    id: 'legal-ai',
    icon: <Zap size={16} />,
    label: 'LEGAL IA',
    priority: 'high' as const,
    requiredPermission: 'manage_ai_tools',
    items: [
      { 
        icon: <Bot size={16} />, 
        label: 'Integrações', 
        to: '/ai-validator',
        requiredPermission: 'manage_ai_tools'
      },
      { 
        icon: <Eye size={16} />, 
        label: 'Heatmap & Incident', 
        to: '/heatmap',
        requiredPermission: 'manage_ai_tools'
      },
      { 
        icon: <DollarSign size={16} />, 
        label: 'Pricing Dinâmico', 
        to: '/dynamic-pricing',
        requiredPermission: 'manage_dynamic_pricing'
      },
      { 
        icon: <Shield size={16} />, 
        label: 'Validador IA', 
        to: '/legal-ai',
        requiredPermission: 'manage_ai_tools'
      },
    ]
  },
  {
    id: 'settings',
    icon: <Settings size={16} />,
    label: 'Configurações',
    priority: 'low' as const,
    requiredPermission: 'manage_settings',
    items: [
      { 
        icon: <Building size={16} />, 
        label: 'Dados do Organizador', 
        to: '/settings/organizer',
        requiredPermission: 'manage_settings'
      },
      { 
        icon: <Star size={16} />, 
        label: 'Identidade Visual', 
        to: '/settings/branding',
        requiredPermission: 'manage_settings'
      },
      { 
        icon: <Shield size={16} />, 
        label: 'LGPD', 
        to: '/settings/privacy',
        requiredPermission: 'manage_settings'
      },
      { 
        icon: <Users size={16} />, 
        label: 'Permissões/Acesso', 
        to: '/settings/permissions',
        requiredPermission: 'manage_permissions'
      },
    ]
  },
  {
    id: 'support',
    icon: <HelpCircle size={16} />,
    label: 'Ajuda & Suporte',
    priority: 'low' as const,
    requiredPermission: 'view_tutorials',
    items: [
      { 
        icon: <MessageSquare size={16} />, 
        label: 'Chat do Suporte', 
        to: '/help/chat',
        requiredPermission: 'manage_support'
      },
      { 
        icon: <HelpCircle size={16} />, 
        label: 'FAQ', 
        to: '/help/faq',
        requiredPermission: 'manage_faq'
      },
      { 
        icon: <FileText size={16} />, 
        label: 'Tutorial', 
        to: '/help/tutorial',
        requiredPermission: 'view_tutorials'
      },
    ]
  }
];
