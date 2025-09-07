import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Zap, 
  ArrowRight, 
  Star, 
  Users, 
  BarChart3, 
  Shield,
  Clock,
  Globe,
  CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const Landing: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: "Gestão Completa",
      description: "Gerencie participantes, palestrantes e equipe em um só lugar"
    },
    {
      icon: BarChart3,
      title: "Analytics Avançado", 
      description: "Insights em tempo real para otimizar seus eventos"
    },
    {
      icon: Shield,
      title: "Segurança Total",
      description: "Dados protegidos com criptografia de nível empresarial"
    },
    {
      icon: Clock,
      title: "Setup Rápido",
      description: "Configure seu evento em menos de 5 minutos"
    },
    {
      icon: Globe,
      title: "Alcance Global",
      description: "Eventos presenciais, virtuais ou híbridos"
    },
    {
      icon: Zap,
      title: "IA Integrada",
      description: "Automação inteligente para tarefas rotineiras"
    }
  ]

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Event Manager",
      company: "TechCorp",
      content: "Transformou completamente nossa forma de organizar eventos. Economia de 70% no tempo de setup!",
      rating: 5
    },
    {
      name: "João Santos",
      role: "CEO",
      company: "StartupXYZ", 
      content: "Interface intuitiva e recursos poderosos. Nossos eventos nunca foram tão profissionais.",
      rating: 5
    },
    {
      name: "Ana Costa",
      role: "Marketing Director",
      company: "EventPro",
      content: "O analytics do Eventrix nos deu insights valiosos sobre nosso público. Recomendo!",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Zap className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold">EVENTRIX</h1>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link to="/login">
              <Button variant="ghost">Fazer Login</Button>
            </Link>
            <Link to="/onboarding">
              <Button>Começar Grátis</Button>
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Eventos que encantam
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A plataforma completa para criar, gerenciar e analisar eventos memoráveis. 
            Tecnologia de ponta com a simplicidade que você precisa.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/onboarding">
              <Button size="lg" className="px-8 h-12 text-base">
                Começar Gratuitamente
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 h-12 text-base">
              Ver Demonstração
            </Button>
          </div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-3 gap-8 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Eventos criados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">1M+</div>
              <div className="text-sm text-muted-foreground">Participantes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-4">Tudo que você precisa</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ferramentas profissionais para cada etapa do seu evento
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-card p-6 rounded-xl border hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-4">O que nossos clientes dizem</h3>
            <p className="text-muted-foreground text-lg">
              Histórias reais de sucesso
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-card p-6 rounded-xl border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex mb-4">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-4">Pronto para começar?</h3>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Crie sua conta em menos de 2 minutos e transforme a forma como você organiza eventos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/onboarding">
                <Button size="lg" className="px-8 h-12 text-base">
                  Começar Gratuitamente
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Setup gratuito
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Sem cartão de crédito
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Suporte 24/7
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Zap className="w-6 h-6 text-primary" />
              <span className="font-bold">EVENTRIX</span>
              <span className="text-sm text-muted-foreground">Powered by LEGAL AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Eventrix™. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing