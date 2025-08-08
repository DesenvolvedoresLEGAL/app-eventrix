
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

export const dashboardItem = { 
  icon: <Home size={16} />, 
  label: 'Painel do Organizador', 
  to: '/dashboard' 
};

export const eventsItems = [
  { icon: <Calendar size={16} />, label: 'Lista de Eventos', to: '/events' },
  { icon: <Plus size={16} />, label: 'Novo Evento', to: '/events/new', highlighted: true, badge: 'Novo' },
];

export const menuGroups = [
  {
    id: 'users',
    icon: <Users size={16} />,
    label: 'Usuários',
    priority: 'high' as const,
    items: [
      { icon: <Building size={16} />, label: 'Expositores', to: '/exhibitors' },
      { icon: <Briefcase size={16} />, label: 'Fornecedores', to: '/suppliers' },
      { icon: <Shield size={16} />, label: 'Permissões e Perfis', to: '/permissions' },
      { icon: <UserPlus size={16} />, label: 'Staff', to: '/staff' },
      { icon: <UserCheck size={16} />, label: 'Visitantes', to: '/visitors' },
    ]
  },
  {
    id: 'agenda',
    icon: <Calendar size={16} />,
    label: 'Agenda',
    priority: 'high' as const,
    items: [
      { icon: <Activity size={16} />, label: 'Atividades', to: '/activities' },
      { icon: <Presentation size={16} />, label: 'Palestras', to: '/lectures' },
      { icon: <MapPin size={16} />, label: 'Salas/Locais', to: '/venues' },
      { icon: <Target size={16} />, label: 'Trilhas', to: '/tracks' },
    ]
  },
  {
    id: 'tasks',
    icon: <CheckSquare size={16} />,
    label: 'Tarefas',
    priority: 'medium' as const,
    items: [
      { icon: <CheckSquare size={16} />, label: 'Checklist', to: '/checklist' },
      { icon: <Users size={16} />, label: 'Por Equipe', to: '/team-tasks' },
      { icon: <Package size={16} />, label: 'Por Fornecedor', to: '/supplier-tasks' },
    ]
  },
  {
    id: 'credentialing',
    icon: <QrCode size={16} />,
    label: 'Credenciamento Digital',
    priority: 'medium' as const,
    items: [
      { icon: <Scan size={16} />, label: 'Check-in/Check-out', to: '/checkin' },
      { icon: <QrCode size={16} />, label: 'Geração QR Code/Badge', to: '/registration' },
      { icon: <History size={16} />, label: 'Histórico de Acessos', to: '/access-history' },
    ]
  },
  {
    id: 'marketing',
    icon: <Megaphone size={16} />,
    label: 'Marketing',
    priority: 'medium' as const,
    items: [
      { icon: <Megaphone size={16} />, label: 'Ads', to: '/marketing/ads' },
      { icon: <FileText size={16} />, label: 'Conteúdo', to: '/marketing/content' },
      { icon: <Mail size={16} />, label: 'E-mails', to: '/marketing/email' },
      { icon: <Globe size={16} />, label: 'Pages', to: '/marketing/pages' },
    ]
  },
  {
    id: 'communication',
    icon: <MessageSquare size={16} />,
    label: 'Comunicação',
    priority: 'medium' as const,
    items: [
      { icon: <Bot size={16} />, label: 'HumanGPT', to: '/communication/humangpt' },
      { icon: <Bell size={16} />, label: 'Notificações', to: '/communication/notifications' },
    ]
  },
  {
    id: 'analytics',
    icon: <BarChart3 size={16} />,
    label: 'Analytics & Relatórios',
    priority: 'medium' as const,
    items: [
      { icon: <BarChart3 size={16} />, label: 'Dashboards', to: '/analytics' },
      { icon: <TrendingUp size={16} />, label: 'Inteligência de Negócios', to: '/analytics/engagement' },
      { icon: <FileText size={16} />, label: 'Relatórios', to: '/reports' },
    ]
  },
  {
    id: 'integrations',
    icon: <Puzzle size={16} />,
    label: 'Integrações',
    priority: 'low' as const,
    items: [
      { icon: <Globe size={16} />, label: 'APIs', to: '/api-management' },
      { icon: <Puzzle size={16} />, label: 'Plugins', to: '/integrations' },
    ]
  },
  {
    id: 'legal-ai',
    icon: <Zap size={16} />,
    label: 'LEGAL IA',
    priority: 'high' as const,
    items: [
      { icon: <Bot size={16} />, label: 'Integrações', to: '/ai-validator' },
      { icon: <Eye size={16} />, label: 'Heatmap & Incident', to: '/heatmap' },
      { icon: <DollarSign size={16} />, label: 'Pricing Dinâmico', to: '/dynamic-pricing' },
      { icon: <Shield size={16} />, label: 'Validador IA', to: '/legal-ai' },
    ]
  },
  {
    id: 'settings',
    icon: <Settings size={16} />,
    label: 'Configurações',
    priority: 'low' as const,
    items: [
      { icon: <Building size={16} />, label: 'Dados do Organizador', to: '/settings/organizer' },
      { icon: <Star size={16} />, label: 'Identidade Visual', to: '/settings/branding' },
      { icon: <Shield size={16} />, label: 'LGPD', to: '/settings/privacy' },
      { icon: <Users size={16} />, label: 'Permissões/Acesso', to: '/settings/permissions' },
    ]
  },
  {
    id: 'support',
    icon: <HelpCircle size={16} />,
    label: 'Ajuda & Suporte',
    priority: 'low' as const,
    items: [
      { icon: <MessageSquare size={16} />, label: 'Chat do Suporte', to: '/help/chat' },
      { icon: <HelpCircle size={16} />, label: 'FAQ', to: '/help/faq' },
      { icon: <FileText size={16} />, label: 'Tutorial', to: '/help/tutorial' },
    ]
  }
];
