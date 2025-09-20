
import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, Zap, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '@/context/FixedAuthContext'
import { useToast } from '@/hooks/use-toast'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
  
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { updatePassword, session, loading } = useAuth()
  const { toast } = useToast()

  // Validação de senha em tempo real
  const validateForm = useCallback(() => {
    const errors: Record<string, string> = {}

    if (!password) {
      errors.password = 'Nova senha é obrigatória'
    } else if (password.length < 8) {
      errors.password = 'Senha deve ter pelo menos 8 caracteres'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      errors.password = 'Senha deve conter pelo menos 1 maiúscula, 1 minúscula e 1 número'
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Confirmação de senha é obrigatória'
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'As senhas não coincidem'
    }

    return errors
  }, [password, confirmPassword])

  // Memoizar validação
  const formErrors = useMemo(() => validateForm(), [validateForm])
  const isFormValid = useMemo(() => Object.keys(formErrors).length === 0, [formErrors])

  // Verificar se há sessão válida ou parâmetros de reset
  const hasValidSession = useMemo(() => {
    return session || searchParams.get('access_token') || searchParams.get('refresh_token')
  }, [session, searchParams])

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
      setIsUpdatingPassword(true)
      await updatePassword(password)
      
      toast({
        title: "Senha atualizada com sucesso!",
        description: "Sua senha foi redefinida. Redirecionando para o login...",
        variant: "default"
      })

      // Redirecionar para login após sucesso
      setTimeout(() => {
        navigate('/login')
      }, 2000)

    } catch (err) {
      const errorMessage = (err as Error).message
      toast({
        title: "Erro ao atualizar senha",
        description: errorMessage || "Não foi possível atualizar sua senha. Tente novamente.",
        variant: "destructive"
      })
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleRequestNewReset = () => {
    navigate('/login')
  }

  // Se não há sessão válida ou parâmetros de reset, mostrar erro
  if (!loading && !hasValidSession) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row tech-grid">
        <div className="legal-gradient-bg w-full md:w-1/2 text-white p-8 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 tech-float"></div>
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <h1 className="text-4xl font-black">EVENTRIX™</h1>
            </div>
            <div className="flex items-center justify-center gap-1 mb-4">
              <Zap size={12} className="text-secondary" />
              <span className="text-sm font-semibold text-white/90">Powered by LEGAL AI</span>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-background">
          <div className="w-full max-w-md">
            <div className="tech-card p-8">
              <div className="text-center mb-8">
                <AlertCircle size={48} className="text-destructive mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Link Inválido ou Expirado</h2>
                <p className="text-muted-foreground mb-6">
                  O link de redefinição de senha é inválido ou expirou. Solicite um novo link para continuar.
                </p>
                <button
                  onClick={handleRequestNewReset}
                  className="tech-button py-3 font-semibold flex items-center justify-center gap-2"
                >
                  Solicitar Novo Link
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
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
          <p className="text-white/80 text-lg">Redefinindo sua senha com segurança</p>
        </div>
        
        <div className="hidden md:block relative z-10">
          <h2 className="text-2xl font-bold mb-6">Segurança em primeiro lugar</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="tech-badge bg-white/20 border-white/30 text-white">
                <CheckCircle size={12} />
              </div>
              <p className="text-white/90">Senha criptografada com padrões avançados</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="tech-badge bg-white/20 border-white/30 text-white">
                <CheckCircle size={12} />
              </div>
              <p className="text-white/90">Validação em tempo real</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="tech-badge bg-white/20 border-white/30 text-white">
                <CheckCircle size={12} />
              </div>
              <p className="text-white/90">Acesso seguro à sua conta</p>
            </div>
          </div>
        </div>
        
        <div className="hidden md:block text-sm text-white/70 relative z-10">
          &copy; {new Date().getFullYear()} Eventrix™. Todos os direitos reservados.
        </div>
      </div>
      
      {/* Right side - Reset form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="tech-card p-8 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">
                Nova <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Senha</span>
              </h2>
              <p className="text-muted-foreground">Defina uma nova senha segura para sua conta</p>
              <div className="tech-badge tech-glow mt-4">
                <Zap size={10} />
                <span>LEGAL Tech</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-semibold mb-2">Nova Senha</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`tech-input w-full pr-12 ${
                      validationErrors.password ? 'border-destructive focus:ring-destructive/20' : ''
                    }`}
                    placeholder="Mínimo 8 caracteres"
                    disabled={isUpdatingPassword}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    disabled={isUpdatingPassword}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="text-sm text-destructive mt-1">{validationErrors.password}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Deve conter pelo menos 8 caracteres, 1 maiúscula, 1 minúscula e 1 número
                </p>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2">Confirmar Nova Senha</label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`tech-input w-full pr-12 ${
                      validationErrors.confirmPassword ? 'border-destructive focus:ring-destructive/20' : ''
                    }`}
                    placeholder="Repita a nova senha"
                    disabled={isUpdatingPassword}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    disabled={isUpdatingPassword}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {validationErrors.confirmPassword && (
                  <p className="text-sm text-destructive mt-1">{validationErrors.confirmPassword}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isUpdatingPassword || !isFormValid}
                className="tech-button w-full py-3 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {isUpdatingPassword ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Atualizando...
                  </>
                ) : (
                  <>
                    Redefinir Senha
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Lembrou da senha? <a href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">Fazer login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
