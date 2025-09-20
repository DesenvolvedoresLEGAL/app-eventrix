
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
  Package,
  ShoppingCart,
  Store,
  Gamepad2,
  Video,
  Trophy,
  BookOpen,
  GraduationCap,
  Languages,
  Ticket,
  Percent,
  ShoppingBag,
  Receipt,
  Users2,
  Network,
  Medal,
  Mic,
  Play,
  Monitor,
  MessageCircle,
  PenTool,
  FileCheck,
  Globe2,
  CreditCard,
  User,
  BadgeCheck,
  FileSearch,
  Handshake,
  PieChart,
  Smartphone,
  Wifi,
  Gift,
  Link,
  Calendar as CalendarIcon,
  Clock,
  UserX,
  Camera,
  KeyRound,
  Nfc,
  MessageCircleHeart,
  Phone
} from 'lucide-react';

export const dashboardItem = { 
  icon: <Home size={16} />, 
  label: 'Dashboard', 
  to: '/dashboard',
  subItems: [
    { icon: <Eye size={16} />, label: 'Visão geral do evento', to: '/dashboard/overview' },
    { icon: <BarChart3 size={16} />, label: 'KPIs em tempo real', to: '/dashboard/kpis' },
    { icon: <Zap size={16} />, label: 'Acesso rápido aos módulos', to: '/dashboard/quick-access' },
  ]
};

export const eventsItems = [
  { icon: <Calendar size={16} />, label: 'Lista de Eventos', to: '/events' },
  { icon: <Plus size={16} />, label: 'Novo Evento', to: '/events/new', highlighted: true, badge: 'Novo' },
];

export const menuGroups = [
  // Eventos (manter atual)
  {
    id: 'events',
    icon: <Calendar size={16} />,
    label: 'Eventos',
    priority: 'high' as const,
    items: [
      { icon: <Calendar size={16} />, label: 'Lista de Eventos', to: '/events' },
      { icon: <Plus size={16} />, label: 'Novo Evento', to: '/events/new', highlighted: true, badge: 'Novo' },
    ]
  },
  // Bilheteria (NOVO módulo)
  {
    id: 'bilheteria',
    icon: <Ticket size={16} />,
    label: 'Bilheteria',
    priority: 'high' as const,
    items: [
      { icon: <Ticket size={16} />, label: 'Tipos de ingressos', to: '/bilheteria/tipos' },
      { icon: <Percent size={16} />, label: 'Cupons e descontos', to: '/bilheteria/cupons' },
      { icon: <ShoppingBag size={16} />, label: 'Retargeting carrinho abandonado', to: '/bilheteria/retargeting' },
      { icon: <Receipt size={16} />, label: 'Relatórios de receita', to: '/bilheteria/relatorios' },
    ]
  },
  // CAEX (expandir atual)
  {
    id: 'caex',
    icon: <Store size={16} />,
    label: 'CAEX',
    priority: 'high' as const,
    items: [
      { icon: <FileText size={16} />, label: 'Manual do Expositor', to: '/caex/manual' },
      { icon: <Bot size={16} />, label: 'Validador IA de Stand', to: '/caex/validador' },
      { icon: <FileCheck size={16} />, label: 'Contratos', to: '/caex/contratos' },
      { icon: <Monitor size={16} />, label: 'Estandes virtuais', to: '/caex/estandes-virtuais' },
      { icon: <ShoppingCart size={16} />, label: 'Marketplace 365', to: '/caex/marketplace' },
      { icon: <PieChart size={16} />, label: 'ROI dashboards', to: '/caex/roi' },
      { icon: <Gift size={16} />, label: 'Patrocínios A-la-carte', to: '/caex/patrocinios' },
      { icon: <Building size={16} />, label: 'Expositores', to: '/exhibitors' },
      { icon: <Briefcase size={16} />, label: 'Fornecedores', to: '/suppliers' },
    ]
  },
  // Usuários (reorganizar atual)
  {
    id: 'users',
    icon: <Users size={16} />,
    label: 'Usuários',
    priority: 'high' as const,
    items: [
      { icon: <Briefcase size={16} />, label: 'Fornecedores', to: '/suppliers' },
      { icon: <Shield size={16} />, label: 'Permissões e Perfis', to: '/permissions' },
      { icon: <UserPlus size={16} />, label: 'Staff', to: '/staff' },
      { icon: <UserCheck size={16} />, label: 'Visitantes', to: '/visitors' },
    ]
  },
  // Agenda (manter atual)
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
  // LinkAI (NOVO módulo)
  {
    id: 'linkai',
    icon: <Link size={16} />,
    label: 'LinkAI',
    priority: 'high' as const,
    items: [
      { icon: <Network size={16} />, label: 'Matchmaking inteligente', to: '/linkai/matchmaking' },
      { icon: <Users2 size={16} />, label: 'Sugestões de conexões', to: '/linkai/sugestoes' },
      { icon: <CalendarIcon size={16} />, label: 'Agenda de reuniões 1-a-1', to: '/linkai/reunioes' },
    ]
  },
  // Credenciamento & Acesso (expandir atual)
  {
    id: 'credentialing',
    icon: <QrCode size={16} />,
    label: 'Credenciamento & Acesso',
    priority: 'medium' as const,
    items: [
      { icon: <Camera size={16} />, label: 'MagicPass (reconhecimento facial)', to: '/credenciamento/magicpass' },
      { icon: <KeyRound size={16} />, label: 'MagicGates (portais entrada/saída)', to: '/credenciamento/magicgates' },
      { icon: <Nfc size={16} />, label: 'Smart Badge NFC', to: '/credenciamento/smart-badge' },
      { icon: <Scan size={16} />, label: 'Check-in/Check-out', to: '/checkin' },
      { icon: <QrCode size={16} />, label: 'Geração QR Code/Badge', to: '/registration' },
      { icon: <History size={16} />, label: 'Histórico de Acessos', to: '/access-history' },
    ]
  },
  // Gamificação (NOVO módulo)
  {
    id: 'gamificacao',
    icon: <Gamepad2 size={16} />,
    label: 'Gamificação',
    priority: 'medium' as const,
    items: [
      { icon: <Trophy size={16} />, label: 'Leaderboards', to: '/gamificacao/leaderboards' },
      { icon: <BadgeCheck size={16} />, label: 'Sistema de badges', to: '/gamificacao/badges' },
      { icon: <Gift size={16} />, label: 'Recompensas', to: '/gamificacao/recompensas' },
    ]
  },
  // Experiência Híbrida (NOVO módulo)
  {
    id: 'experiencia-hibrida',
    icon: <Video size={16} />,
    label: 'Experiência Híbrida',
    priority: 'medium' as const,
    items: [
      { icon: <Video size={16} />, label: 'Streaming integrado', to: '/hibrida/streaming' },
      { icon: <MessageCircle size={16} />, label: 'Enquetes e Q&A ao vivo', to: '/hibrida/enquetes' },
      { icon: <Play size={16} />, label: 'Gravações on-demand', to: '/hibrida/gravacoes' },
      { icon: <Wifi size={16} />, label: 'Integração MagicPass/MagicGates', to: '/hibrida/integracao' },
    ]
  },
  // Marketing (manter atual)
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
  // Comunicação (expandir atual)
  {
    id: 'communication',
    icon: <MessageSquare size={16} />,
    label: 'Comunicação',
    priority: 'medium' as const,
    items: [
      { icon: <Bot size={16} />, label: 'HumanGPT', to: '/communication/humangpt' },
      { icon: <Bell size={16} />, label: 'Notificações', to: '/communication/notifications' },
      { icon: <Link size={16} />, label: 'LinkAI (integração)', to: '/communication/linkai' },
    ]
  },
  // LEGAL AI (manter com nome alterado)
  {
    id: 'legal-ai',
    icon: <Zap size={16} />,
    label: 'LEGAL AI',
    priority: 'high' as const,
    items: [
      { icon: <Bot size={16} />, label: 'Integrações', to: '/ai-validator' },
      { icon: <Eye size={16} />, label: 'Heatmap & Incident', to: '/heatmap' },
      { icon: <DollarSign size={16} />, label: 'Pricing Dinâmico', to: '/dynamic-pricing' },
      { icon: <Shield size={16} />, label: 'Validador IA', to: '/legal-ai' },
    ]
  },
  // Analytics & Relatórios (manter atual)
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
  // LEGAL Club (NOVO - pós-evento)
  {
    id: 'legal-club',
    icon: <MessageCircleHeart size={16} />,
    label: 'LEGAL Club',
    priority: 'medium' as const,
    items: [
      { icon: <MessageCircle size={16} />, label: 'Hub de discussões', to: '/legal-club/discussoes' },
      { icon: <FileText size={16} />, label: 'Conteúdo editorial', to: '/legal-club/conteudo' },
      { icon: <Video size={16} />, label: 'Webinars', to: '/legal-club/webinars' },
      { icon: <BarChart3 size={16} />, label: 'Métricas engajamento', to: '/legal-club/metricas' },
    ]
  },
  // Acadêmico (NOVO módulo)
  {
    id: 'academico',
    icon: <GraduationCap size={16} />,
    label: 'Acadêmico',
    priority: 'medium' as const,
    items: [
      { icon: <PenTool size={16} />, label: 'Submissão de artigos', to: '/academico/submissao' },
      { icon: <FileSearch size={16} />, label: 'Revisão por pares', to: '/academico/revisao' },
      { icon: <BookOpen size={16} />, label: 'Gestão publicações', to: '/academico/publicacoes' },
      { icon: <BarChart3 size={16} />, label: 'Métricas acadêmicas', to: '/academico/metricas' },
    ]
  },
  // Internacionalização (NOVO módulo)
  {
    id: 'internacionalizacao',
    icon: <Languages size={16} />,
    label: 'Internacionalização',
    priority: 'medium' as const,
    items: [
      { icon: <Languages size={16} />, label: 'Suporte multilíngue', to: '/internacional/multilingue' },
      { icon: <CreditCard size={16} />, label: 'Múltiplas moedas', to: '/internacional/moedas' },
      { icon: <Globe2 size={16} />, label: 'Templates locais', to: '/internacional/templates' },
    ]
  },
  // Integrações (manter atual)
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
  // Configurações (manter atual)
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
  // Ajuda & Suporte (manter atual)
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
