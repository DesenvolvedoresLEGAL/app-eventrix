import React, { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Zap,
  Shield,
  Clock,
  Globe,
  Building2,
  Users,
  BarChart3,
  Palette,
  Bell,
  Settings,
  HelpCircle,
  Menu,
  Search
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/context/FixedAuthContext'
import { useToast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'
import { useFormOptimizations } from '@/hooks/useFormOptimizations'

// Schema de validação otimizado
const signupSchema = z.object({
  firstName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  lastName: z.string().min(2, 'Sobrenome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string()
    .min(8, 'Mínimo 8 caracteres')
    .regex(/(?=.*[a-z])/, 'Deve conter letra minúscula')
    .regex(/(?=.*[A-Z])/, 'Deve conter letra maiúscula')
    .regex(/(?=.*\d)/, 'Deve conter número'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
})

type SignupFormData = z.infer<typeof signupSchema>

// Componente de Progress Step Indicator
const StepIndicator = React.memo(({ currentStep, totalSteps }: { currentStep: number, totalSteps: number }) => (
  <div className="flex items-center justify-center space-x-2 mb-8">
    {Array.from({ length: totalSteps }, (_, i) => (
      <motion.div
        key={i}
        className={`h-2 rounded-full transition-all duration-500 ${
          i <= currentStep ? 'bg-primary' : 'bg-muted'
        }`}
        initial={{ width: 8 }}
        animate={{ width: i === currentStep ? 32 : 8 }}
      />
    ))}
  </div>
))

// Componente de Social Login
const SocialLogin = React.memo(() => (
  <div className="space-y-3">
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-muted" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">ou continue com</span>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-3">
      <Button variant="outline" className="w-full hover:bg-accent transition-all duration-300">
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Google
      </Button>
      
      <Button variant="outline" className="w-full hover:bg-accent transition-all duration-300">
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
          <path fill="currentColor" d="M23.5 12.3c0-1.2-.1-2.4-.3-3.6H12v6.8h6.5c-.3 1.6-1.2 3-2.5 3.9v3.1h4c2.4-2.2 3.8-5.5 3.8-9.2z"/>
          <path fill="currentColor" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-4-3.1c-1.1.7-2.5 1.2-3.9 1.2-3 0-5.5-2-6.4-4.7H1.5v3.2C3.6 21.9 7.5 24 12 24z"/>
        </svg>
        Microsoft
      </Button>
    </div>
  </div>
))

// Checklist gamificado
const OnboardingChecklist = React.memo(({ onComplete }: { onComplete: () => void }) => {
  const [completedItems, setCompletedItems] = useState<Set<number>>(new Set())
  
  const checklistItems = useMemo(() => [
    { id: 1, title: "Complete seu perfil", description: "Adicione foto e informações", icon: User },
    { id: 2, title: "Configure notificações", description: "Escolha como quer ser notificado", icon: Bell },
    { id: 3, title: "Explore o dashboard", description: "Veja métricas e insights", icon: BarChart3 },
    { id: 4, title: "Personalize interface", description: "Ajuste cores e layout", icon: Palette }
  ], [])

  const handleItemClick = useCallback((itemId: number) => {
    setCompletedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      
      if (newSet.size === checklistItems.length) {
        setTimeout(onComplete, 1000)
      }
      
      return newSet
    })
  }, [checklistItems.length, onComplete])

  const progress = (completedItems.size / checklistItems.length) * 100

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Primeiros passos</h3>
          <span className="text-sm text-muted-foreground">{completedItems.size}/{checklistItems.length}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <motion.div 
            className="bg-primary h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {checklistItems.map((item) => {
          const isCompleted = completedItems.has(item.id)
          const IconComponent = item.icon
          
          return (
            <motion.div
              key={item.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                isCompleted 
                  ? 'bg-primary/5 border-primary' 
                  : 'bg-background border-muted hover:border-border'
              }`}
              onClick={() => handleItemClick(item.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full transition-colors ${
                  isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  {isCompleted ? <CheckCircle className="w-4 h-4" /> : <IconComponent className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${isCompleted ? 'text-primary' : ''}`}>
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
})

// Tour guiado com tooltips
const GuidedTour = React.memo(({ onComplete }: { onComplete: () => void }) => {
  const [currentTourStep, setCurrentTourStep] = useState(0)
  
  const tourSteps = useMemo(() => [
    { element: 'sidebar', title: 'Menu Principal', description: 'Acesse todas as funcionalidades aqui' },
    { element: 'dashboard', title: 'Dashboard', description: 'Visualize métricas e KPIs importantes' },
    { element: 'search', title: 'Busca Rápida', description: 'Encontre qualquer informação rapidamente' },
    { element: 'profile', title: 'Seu Perfil', description: 'Gerencie conta e configurações' }
  ], [])

  const nextTourStep = useCallback(() => {
    if (currentTourStep < tourSteps.length - 1) {
      setCurrentTourStep(prev => prev + 1)
    } else {
      onComplete()
    }
  }, [currentTourStep, tourSteps.length, onComplete])

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <motion.div 
        className="bg-background rounded-lg p-6 m-4 max-w-md w-full shadow-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Tour da Plataforma</h3>
            <span className="text-sm text-muted-foreground">
              {currentTourStep + 1}/{tourSteps.length}
            </span>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">{tourSteps[currentTourStep].title}</h4>
            <p className="text-muted-foreground">{tourSteps[currentTourStep].description}</p>
          </div>
          
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={onComplete}
            >
              Pular Tour
            </Button>
            <Button onClick={nextTourStep}>
              {currentTourStep === tourSteps.length - 1 ? 'Finalizar' : 'Próximo'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
})

const ModernOnboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [showTour, setShowTour] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { signUp } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange'
  })

  const onSubmit = useCallback(async (data: SignupFormData) => {
    setIsLoading(true)
    try {
      await signUp({
        email: data.email,
        password: data.password,
        fullName: `${data.firstName} ${data.lastName}`,
        firstName: data.firstName,
        lastName: data.lastName
      })
      
      toast({
        title: "Conta criada com sucesso!",
        description: "Bem-vindo à nossa plataforma",
      })
      
      setCurrentStep(1) // Ir para boas-vindas
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao criar conta",
        description: error.message || "Tente novamente",
      })
    } finally {
      setIsLoading(false)
    }
  }, [signUp, toast])

  const { handleSubmit, canSubmit } = useFormOptimizations({
    form,
    onSubmit
  })

  const nextStep = useCallback(() => {
    setCurrentStep(prev => prev + 1)
  }, [])

  const renderStep = useCallback(() => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center space-y-2">
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Sparkles className="w-8 h-8 text-primary" />
              </motion.div>
              <h1 className="text-3xl font-bold">Crie sua conta</h1>
              <p className="text-muted-foreground">
                Junte-se a milhares de usuários que já transformaram seus eventos
              </p>
            </div>

            <SocialLogin />

            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Nome"
                      {...form.register('firstName')}
                      className="h-12 pl-10"
                    />
                  </div>
                  {form.formState.errors.firstName && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    placeholder="Sobrenome"
                    {...form.register('lastName')}
                    className="h-12"
                  />
                  {form.formState.errors.lastName && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email profissional"
                    {...form.register('email')}
                    className="h-12 pl-10"
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha segura"
                  {...form.register('password')}
                  className="h-12 pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                {form.formState.errors.password && (
                  <p className="text-sm text-destructive mt-1">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Confirme sua senha"
                  {...form.register('confirmPassword')}
                  className="h-12"
                />
                {form.formState.errors.confirmPassword && (
                  <p className="text-sm text-destructive mt-1">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-medium"
                disabled={!canSubmit || isLoading}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                  </motion.div>
                ) : (
                  <>
                    Criar conta gratuita
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Já tem uma conta?{' '}
              <button 
                onClick={() => navigate('/login')}
                className="text-primary hover:underline font-medium"
              >
                Fazer login
              </button>
            </p>
          </motion.div>
        )

      case 1:
        return (
          <motion.div
            className="space-y-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center"
            >
              <CheckCircle className="w-12 h-12 text-green-600" />
            </motion.div>
            
            <div>
              <h2 className="text-3xl font-bold mb-2">Bem-vindo à bordo! 🎉</h2>
              <p className="text-muted-foreground text-lg">
                Sua conta foi criada com sucesso. Vamos configurar tudo para você.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { icon: Shield, title: "Seguro", desc: "Dados protegidos" },
                { icon: Clock, title: "Rápido", desc: "Setup em 2 min" },
                { icon: Globe, title: "Global", desc: "Usado mundialmente" }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className="p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <feature.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            <Button onClick={nextStep} size="lg" className="px-8">
              Começar configuração
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Complete sua configuração</h2>
              <p className="text-muted-foreground">
                Complete estas tarefas para aproveitar ao máximo a plataforma
              </p>
            </div>

            <OnboardingChecklist onComplete={nextStep} />
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            className="space-y-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-12 h-12 text-primary" />
            </motion.div>
            
            <div>
              <h2 className="text-3xl font-bold mb-2">Tudo pronto! ✨</h2>
              <p className="text-muted-foreground text-lg">
                Perfeito! Agora você está pronto para criar eventos incríveis.
              </p>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={() => setShowTour(true)} 
                size="lg" 
                className="w-full"
              >
                Fazer tour da plataforma
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => navigate('/dashboard')}
                className="w-full"
              >
                Ir direto para dashboard
              </Button>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }, [currentStep, showPassword, form, handleSubmit, canSubmit, isLoading, nextStep, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header com logo */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold">EVENTRIX</h1>
          </div>
          <p className="text-sm text-muted-foreground">Powered by LEGAL AI</p>
        </motion.div>

        {/* Progress indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={4} />

        {/* Conteúdo principal */}
        <motion.div 
          className="bg-card rounded-2xl shadow-xl p-8 border"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.p 
          className="text-center text-xs text-muted-foreground mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          © 2025 Eventrix™. Todos os direitos reservados.
        </motion.p>
      </div>

      {/* Tour guiado modal */}
      {showTour && (
        <GuidedTour onComplete={() => {
          setShowTour(false)
          navigate('/dashboard')
        }} />
      )}

      {/* Demonstração da interface para o tour */}
      {showTour && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {/* Elementos simulados para o tour */}
          <div id="sidebar" className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-40 bg-background/80 rounded-lg shadow-lg flex flex-col items-center justify-center space-y-4">
            <Menu className="w-6 h-6 text-primary" />
            <Building2 className="w-5 h-5 text-muted-foreground" />
            <Users className="w-5 h-5 text-muted-foreground" />
            <BarChart3 className="w-5 h-5 text-muted-foreground" />
            <Settings className="w-5 h-5 text-muted-foreground" />
          </div>
          
          <div id="dashboard" className="absolute top-20 left-20 right-20 h-32 bg-background/80 rounded-lg shadow-lg p-4">
            <div className="grid grid-cols-4 gap-4 h-full">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="bg-muted/50 rounded p-2 flex flex-col justify-between">
                  <div className="h-2 bg-primary/20 rounded mb-2" />
                  <div className="h-4 bg-muted rounded" />
                </div>
              ))}
            </div>
          </div>
          
          <div id="search" className="absolute top-4 right-20 w-64 h-10 bg-background/80 rounded-lg shadow-lg flex items-center px-3">
            <Search className="w-4 h-4 text-muted-foreground mr-2" />
            <div className="h-2 bg-muted rounded flex-1" />
          </div>
          
          <div id="profile" className="absolute top-4 right-4 w-10 h-10 bg-primary/80 rounded-full shadow-lg flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      )}
    </div>
  )
}

export default ModernOnboarding