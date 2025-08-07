
import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, Zap, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '@/hooks/use-toast'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { updatePassword, error, clearError } = useAuth()
  const { toast } = useToast()

  // Verificar se é uma sessão válida de reset
  useEffect(() => {
    const accessToken = searchParams.get('access_token')
    const refreshToken = searchParams.get('refresh_token')
    
    if (!accessToken || !refreshToken) {
      toast({
        title: "Link inválido",
        description: "Este link de redefinição de senha é inválido ou expirou",
        variant: "destructive"
      })
      navigate('/login')
      return
    }
    
    // O Supabase automaticamente define a sessão com os tokens da URL
  }, [searchParams, navigate, toast])

  // Limpar erros quando o usuário digita
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 5000)
      return () => clearTimeout(timer)
    }
  }, [error, clearError])

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!password) {
      errors.password = 'Nova senha é obrigatória'
    } else if (password.length < 6) {
      errors.password = 'Senha deve ter pelo menos 6 caracteres'
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Confirmação de senha é obrigatória'
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Senhas não coincidem'
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
      setIsUpdatingPassword(true)
      clearError()
      
      await updatePassword(password)
      
      setIsSuccess(true)
      toast({
        title: "Senha atualizada com sucesso!",
        description: "Sua senha foi redefinida. Redirecionando para o login...",
        variant: "default"
      })

      // Redirecionar para login após 3 segundos
      setTimeout(() => {
        navigate('/login')
      }, 3000)

    } catch (err) {
      toast({
        title: "Erro ao atualizar senha",
        description: "Não foi possível atualizar sua senha. Tente novamente.",
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

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-md">
          <div className="tech-card p-8 text-center">
            <CheckCircle size={64} className="mx-auto mb-6 text-green-500" />
            <h2 className="text-2xl font-bold mb-4">Senha redefinida com sucesso!</h2>
            <p className="text-muted-foreground mb-6">
              Sua senha foi atualizada. Você será redirecionado para o login em alguns segundos.
            </p>
            <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
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
          <p className="text-white/80 text-lg">Redefinição segura de senha</p>
        </div>
        
        <div className="hidden md:block text-sm text-white/70 relative z-10">
          &copy; {new Date().getFullYear()} Eventrix™. Todos os direitos reservados.
        </div>
      </div>
      
      {/* Right side - Reset form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="tech-card p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">
                Redefinir <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">senha</span>
              </h2>
              <p className="text-muted-foreground">Digite sua nova senha</p>
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
                <label htmlFor="password" className="block text-sm font-semibold mb-2">Nova senha</label>
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
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2">Confirmar nova senha</label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`tech-input w-full pr-12 ${
                      validationErrors.confirmPassword ? 'border-destructive focus:ring-destructive/20' : ''
                    }`}
                    placeholder="********"
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
                disabled={isUpdatingPassword}
                className="tech-button w-full py-3 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {isUpdatingPassword ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Atualizando...
                  </>
                ) : (
                  <>
                    Atualizar senha
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Lembrou da sua senha? <a href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">Voltar ao login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
