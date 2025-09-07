import React, { useState, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Zap, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { useSmartNavigation } from '@/hooks/useSmartNavigation'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [isResettingPassword, setIsResettingPassword] = useState(false)
  
  const _navigate = useNavigate()
  const { signIn, resetPassword, loading, error, clearError, isAuthenticated } = useAuth()
  const { toast } = useToast()
  const { firstAccessibleRoute, redirectToFirstAccessible, isLoading: isLoadingNavigation, hasNoAccess } = useSmartNavigation()

  // Validação em tempo real
  const validateForm = useCallback(() => {
    const errors: Record<string, string> = {}

    if (!email.trim()) {
      errors.email = 'Email é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Email inválido'
    }

    if (!password) {
      errors.password = 'Senha é obrigatória'
    } else if (password.length < 6) {
      errors.password = 'Senha deve ter pelo menos 6 caracteres'
    }

    return errors
  }, [email, password])

  // Memoizar validação
  const formErrors = useMemo(() => validateForm(), [validateForm])
  const isFormValid = useMemo(() => Object.keys(formErrors).length === 0, [formErrors])

  // Redirecionar usuários autenticados para sua primeira rota acessível
  React.useEffect(() => {
    if (isAuthenticated && !isLoadingNavigation) {
      if (hasNoAccess) {
        _navigate('/unauthorized', { replace: true })
      } else {
        redirectToFirstAccessible()
      }
    }
  }, [isAuthenticated, isLoadingNavigation, hasNoAccess, redirectToFirstAccessible, _navigate])

  // Limpar erros quando o usuário digita
  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 5000)
      return () => clearTimeout(timer)
    }
  }, [error, clearError])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar formulário antes do submit
    const errors = validateForm()
    setValidationErrors(errors)

    if (!isFormValid) {
      toast({
        title: "Formulário inválido",
        description: "Por favor, corrija os erros antes de continuar",
        variant: "destructive"
      })
      return
    }

    try {
      clearError()
      await signIn(email.trim(), password)
      
      const destinationText = firstAccessibleRoute 
        ? `Redirecionando para ${firstAccessibleRoute.displayName}...`
        : "Redirecionando..."
      
      toast({
        title: "Login realizado com sucesso!",
        description: destinationText,
        variant: "default"
      })
      
      // Navegação será tratada pelo useEffect
    } catch (err) {
      // Erro já tratado no AuthContext
      console.error('Login error:', err)
    }
  }

  const handleForgotPassword = async (e: React.MouseEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      toast({
        title: "Email necessário",
        description: "Por favor, digite seu email antes de solicitar a redefinição de senha",
        variant: "destructive"
      })
      return
    }

    const emailErrors = validateForm()
    if (emailErrors.email) {
      toast({
        title: "Email inválido",
        description: emailErrors.email,
        variant: "destructive"
      })
      return
    }

    try {
      setIsResettingPassword(true)
      await resetPassword(email.trim())
      
      toast({
        title: "Email enviado!",
        description: "Verifique sua caixa de entrada para redefinir sua senha",
        variant: "default"
      })
    } catch (err) {
      toast({
        title: "Erro ao enviar email",
        description: "Não foi possível enviar o email de redefinição. Tente novamente.",
        variant: "destructive"
      })
    } finally {
      setIsResettingPassword(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row tech-grid">
      {/* Left side - Brand com identidade LEGAL */}
      <div className="legal-gradient-bg w-full md:w-1/2 text-white p-8 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 tech-float"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-4xl font-black">EVENTRIX™</h1>
          </div>
          <div className="flex items-center gap-1 mb-4">
            <Zap size={12} className="text-secondary" />
            <span className="text-sm font-semibold text-white/90">Powered by LEGAL AI</span>
          </div>
          <p className="text-white/80 text-lg">Plataforma completa para gestão de eventos</p>
        </div>
        
        <div className="hidden md:block relative z-10">
          <h2 className="text-2xl font-bold mb-6">Tudo em uma só plataforma</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="tech-badge bg-white/20 border-white/30 text-white">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
              </div>
              <p className="text-white/90">Gerencie todo o ciclo de vida dos seus eventos</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="tech-badge bg-white/20 border-white/30 text-white">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
              </div>
              <p className="text-white/90">Ferramentas avançadas de IA integradas</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="tech-badge bg-white/20 border-white/30 text-white">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
              </div>
              <p className="text-white/90">Dados e insights em tempo real</p>
            </div>
          </div>
        </div>
        
        <div className="hidden md:block text-sm text-white/70 relative z-10">
          &copy; {new Date().getFullYear()} Eventrix™. Todos os direitos reservados.
        </div>
      </div>
      
      {/* Right side - Login form com tech design aprimorado */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="tech-card p-8 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">
                Bem-vindo de <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">volta</span>
              </h2>
              <p className="text-muted-foreground">Entre na sua conta para acessar a plataforma</p>
              <div className="tech-badge tech-glow mt-4">
                <Zap size={10} />
                <span>LEGAL Tech</span>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3">
                <AlertCircle size={16} className="text-destructive mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-destructive font-medium">
                    {error.message}
                  </p>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`tech-input w-full ${
                    validationErrors.email ? 'border-destructive focus:ring-destructive/20' : ''
                  }`}
                  placeholder="seu@email.com"
                  disabled={loading}
                  autoComplete="email"
                  required
                />
                {validationErrors.email && (
                  <p className="text-sm text-destructive mt-1">{validationErrors.email}</p>
                )}
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-semibold">Senha</label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={isResettingPassword}
                    className="text-sm text-primary hover:text-primary/80 font-medium transition-colors disabled:opacity-50"
                  >
                    {isResettingPassword ? 'Enviando...' : 'Esqueceu?'}
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`tech-input w-full pr-12 ${
                      validationErrors.password ? 'border-destructive focus:ring-destructive/20' : ''
                    }`}
                    placeholder="********"
                    disabled={loading}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="text-sm text-destructive mt-1">{validationErrors.password}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={loading || !isFormValid}
                className="tech-button w-full py-3 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {loading || (isAuthenticated && isLoadingNavigation) ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {isAuthenticated && isLoadingNavigation 
                      ? `Redirecionando${firstAccessibleRoute ? ` para ${firstAccessibleRoute.displayName}` : ''}...`
                      : 'Entrando...'
                    }
                  </>
                ) : (
                  <>
                    Entrar
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Ainda não tem uma conta? <a href="/onboarding" className="text-primary hover:text-primary/80 font-medium transition-colors">Criar conta</a>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Quer conhecer nossos planos? <a href="/plans" className="text-primary hover:text-primary/80 font-medium transition-colors">Ver planos</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
