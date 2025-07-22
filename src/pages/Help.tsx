
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  HelpCircle, 
  MessageSquare, 
  Book, 
  Video, 
  Phone, 
  Mail, 
  Search, 
  ChevronRight, 
  Download,
  Zap,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqItems = [
    {
      question: "Como criar um novo evento?",
      answer: "Para criar um novo evento, acesse o menu 'Eventos' > 'Novo Evento' ou clique no botão '+' no dashboard. Siga o wizard de criação preenchendo as informações básicas, localização e configurações avançadas.",
      category: "Eventos"
    },
    {
      question: "Como funciona o reconhecimento facial (FacePass™)?",
      answer: "O FacePass™ utiliza IA para identificar participantes automaticamente. Configure nas configurações do evento e garanta que os participantes tenham dado consentimento para uso da tecnologia.",
      category: "IA"
    },
    {
      question: "Posso integrar com outros sistemas?",
      answer: "Sim! O EVENTRIX oferece APIs e integrações com diversos sistemas. Acesse 'Integrações' > 'Marketplace' para ver as opções disponíveis.",
      category: "Integrações"
    },
    {
      question: "Como exportar relatórios?",
      answer: "Vá para 'Analytics & Relatórios' > 'Relatórios', selecione o período desejado e clique em 'Exportar'. Você pode escolher entre PDF, Excel ou CSV.",
      category: "Relatórios"
    }
  ];

  const supportTickets = [
    {
      id: "SUPT-001",
      title: "Problema com upload de participantes",
      status: "Em andamento",
      priority: "Alta",
      date: "2024-01-15",
      response: "Nossa equipe está analisando o problema"
    },
    {
      id: "SUPT-002", 
      title: "Dúvida sobre configuração de QR codes",
      status: "Resolvido",
      priority: "Média",
      date: "2024-01-14",
      response: "Problema resolvido com sucesso"
    }
  ];

  return (
    <DashboardLayout title="Ajuda & Suporte">
      <div className="space-y-8 legal-tech-grid min-h-full">
        {/* Header with LEGAL branding */}
        <div className="legal-card p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 legal-gradient-bg opacity-10 rounded-full -mr-16 -mt-16 legal-animate-float"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-4xl font-black bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
                Ajuda & Suporte
              </h1>
              <div className="legal-powered-badge legal-animate-pulse">
                <Zap size={14} />
                <span>Powered by LEGAL AI</span>
              </div>
            </div>
            <p className="text-muted-foreground text-lg">
              Central de ajuda completa para o EVENTRIX. Encontre respostas, tutoriais e entre em contato conosco.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="legal-card p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Pesquise por dúvidas, tutoriais ou funcionalidades..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="legal-input pl-12 h-14 text-lg"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="legal-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="legal-gradient-bg w-12 h-12 rounded-xl flex items-center justify-center mb-4 legal-animate-float">
              <Book className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">Documentação</h3>
            <p className="text-muted-foreground text-sm">Guias completos e manuais</p>
          </div>

          <div className="legal-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="bg-gradient-to-r from-secondary to-primary w-12 h-12 rounded-xl flex items-center justify-center mb-4 legal-animate-float" style={{ animationDelay: '0.2s' }}>
              <Video className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">Vídeo Tutoriais</h3>
            <p className="text-muted-foreground text-sm">Aprenda com vídeos passo a passo</p>
          </div>

          <div className="legal-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="bg-gradient-to-r from-tertiary to-secondary w-12 h-12 rounded-xl flex items-center justify-center mb-4 legal-animate-float" style={{ animationDelay: '0.4s' }}>
              <MessageSquare className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">Chat ao Vivo</h3>
            <p className="text-muted-foreground text-sm">Suporte em tempo real</p>
          </div>

          <div className="legal-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="bg-gradient-to-r from-primary to-tertiary w-12 h-12 rounded-xl flex items-center justify-center mb-4 legal-animate-float" style={{ animationDelay: '0.6s' }}>
              <Phone className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">Suporte Telefônico</h3>
            <p className="text-muted-foreground text-sm">Fale conosco diretamente</p>
          </div>
        </div>

        {/* Tabs Content */}
        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 legal-card">
            <TabsTrigger value="faq" className="data-[state=active]:legal-gradient-bg data-[state=active]:text-white">FAQ</TabsTrigger>
            <TabsTrigger value="tickets" className="data-[state=active]:legal-gradient-bg data-[state=active]:text-white">Meus Tickets</TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:legal-gradient-bg data-[state=active]:text-white">Contato</TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:legal-gradient-bg data-[state=active]:text-white">Recursos</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-6">
            <div className="legal-card p-8">
              <h3 className="text-2xl font-bold text-tertiary mb-6">Perguntas Frequentes</h3>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-lg">{item.question}</h4>
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-6">
            <div className="legal-card p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-tertiary">Meus Tickets de Suporte</h3>
                <Button className="legal-gradient-button">
                  + Novo Ticket
                </Button>
              </div>
              <div className="space-y-4">
                {supportTickets.map((ticket) => (
                  <div key={ticket.id} className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{ticket.id}</span>
                        <h4 className="font-bold">{ticket.title}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        {ticket.status === 'Resolvido' ? (
                          <CheckCircle className="text-green-500" size={16} />
                        ) : ticket.status === 'Em andamento' ? (
                          <Clock className="text-yellow-500" size={16} />
                        ) : (
                          <AlertCircle className="text-red-500" size={16} />
                        )}
                        <Badge variant={ticket.status === 'Resolvido' ? 'default' : 'secondary'}>
                          {ticket.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-2">{ticket.response}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Criado em {ticket.date}</span>
                      <Badge variant="outline">Prioridade {ticket.priority}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="legal-card p-8">
                <h3 className="text-2xl font-bold text-tertiary mb-6">Entre em Contato</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Nome</label>
                    <Input className="legal-input" placeholder="Seu nome completo" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">E-mail</label>
                    <Input className="legal-input" type="email" placeholder="seu@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Assunto</label>
                    <Input className="legal-input" placeholder="Descreva brevemente o assunto" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Mensagem</label>
                    <Textarea className="legal-input min-h-32" placeholder="Descreva sua dúvida ou problema em detalhes..." />
                  </div>
                  <Button className="legal-gradient-button w-full py-4 text-lg">
                    Enviar Mensagem
                  </Button>
                </form>
              </div>

              <div className="legal-card p-8">
                <h3 className="text-2xl font-bold text-tertiary mb-6">Outras Formas de Contato</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="legal-gradient-bg w-12 h-12 rounded-xl flex items-center justify-center">
                      <Mail className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">E-mail</p>
                      <p className="text-muted-foreground">suporte@eventrix.legal</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-secondary to-primary w-12 h-12 rounded-xl flex items-center justify-center">
                      <Phone className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">Telefone</p>
                      <p className="text-muted-foreground">+55 11 4000-2000</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-tertiary to-secondary w-12 h-12 rounded-xl flex items-center justify-center">
                      <MessageSquare className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">Chat ao Vivo</p>
                      <p className="text-muted-foreground">Segunda a Sexta, 8h às 18h</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl">
                  <h4 className="font-bold mb-2">Horário de Atendimento</h4>
                  <p className="text-sm text-muted-foreground">
                    Segunda a Sexta: 8h às 18h<br />
                    Sábado: 9h às 13h<br />
                    Domingo: Fechado
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="legal-card p-8">
              <h3 className="text-2xl font-bold text-tertiary mb-6">Recursos e Downloads</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Manual do Usuário", desc: "Guia completo da plataforma", size: "2.5 MB", type: "PDF" },
                  { title: "API Documentation", desc: "Documentação técnica das APIs", size: "1.8 MB", type: "PDF" },
                  { title: "Templates de Eventos", desc: "Modelos prontos para eventos", size: "5.2 MB", type: "ZIP" },
                  { title: "Certificado SSL", desc: "Certificados de segurança", size: "0.2 MB", type: "CRT" }
                ].map((resource, index) => (
                  <div key={index} className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold">{resource.title}</h4>
                      <Badge>{resource.type}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{resource.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{resource.size}</span>
                      <Button variant="outline" size="sm">
                        <Download size={14} className="mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Help;
