import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowRight, Zap, Eye, EyeOff, AlertCircle, Mail } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '@/hooks/use-toast'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [isSigningIn, setIsSigningIn] = useState(false)
  
  const navigate = useNavigate()
  const { signIn, error, clearError } = useAuth()
  const { toast } = useToast()

  // Limpar erros quando o usuário digita
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 5000)
      return () => clearTimeout(timer)
    }
  }, [error, clearError])

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!email) {
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
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const errors = validateForm()
    setValidationErrors(errors)

    if (Object.keys(errors).length > 0) {
      toast({
        title: "Formulário inválido",
        description: "Por favor, corrija os erros antes de continuar",
        variant: "destructive"
      })
      return
    }

    try {
      setIsSigningIn(true)
      clearError()
      
      await signIn(email, password)
      
      toast({
        title: "Login realizado com sucesso!",
        description: "Redirecionando para o dashboard...",
        variant: "default"
      })

      // Redirecionar para dashboard após 3 segundos
      setTimeout(() => {
        navigate('/dashboard')
      }, 3000)

    } catch (err) {
      toast({
        title: "Erro ao fazer login",
        description: "Não foi possível realizar o login. Verifique suas credenciais e tente novamente.",
        variant: "destructive"
      })
    } finally {
      setIsSigningIn(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row tech-grid">
      {/* Left side - Brand */}
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
        
        <div className="hidden md:block text-sm text-white/70 relative z-10">
          &copy; {new Date().getFullYear()} Eventrix™. Todos os direitos reservados.
        </div>
      </div>
      
      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="tech-card p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">
                Acesse sua <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">conta</span>
              </h2>
              <p className="text-muted-foreground">Entre com seu email e senha</p>
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
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`tech-input w-full ${
                      validationErrors.email ? 'border-destructive focus:ring-destructive/20' : ''
                    }`}
                    placeholder="seuemail@exemplo.com"
                    disabled={isSigningIn}
                    autoComplete="email"
                    required
                  />
                  <Mail size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
                {validationErrors.email && (
                  <p className="text-sm text-destructive mt-1">{validationErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold mb-2">Senha</label>
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
                    disabled={isSigningIn}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    disabled={isSigningIn}
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
                disabled={isSigningIn}
                className="tech-button w-full py-3 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {isSigningIn ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Entrando...
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
                Esqueceu sua senha? <Link to="/reset-password" className="text-primary hover:text-primary/80 font-medium transition-colors">Redefinir senha</Link>
              </p>
              <p className="text-sm text-muted-foreground">
                Não tem uma conta? <Link to="/register" className="text-primary hover:text-primary/80 font-medium transition-colors">Criar conta</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
