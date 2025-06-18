
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login, resetPassword, loading: authContextLoading, user } = useAuth();
  const navigate = useNavigate();

  // CORREÇÃO: Redirecionamento reforçado quando usuário está autenticado
  useEffect(() => {
    console.log('🔍 Login useEffect - User state:', user?.email || 'none', 'Loading:', authContextLoading);
    
    if (user && !authContextLoading) {
      console.log('✅ User authenticated and not loading, redirecting to dashboard');
      navigate('/dashboard', { replace: true });
    }
  }, [user, authContextLoading, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      console.warn('⚠️ Login form submitted with empty fields');
      return;
    }
    
    console.log('🔄 Login form submitted for:', email);
    setIsLoggingIn(true);
    
    try {
      console.log('🚀 Calling login function...');
      await login(email, password);
      console.log('✅ Login function completed');
      
      // Redirecionamento será feito pelo useEffect quando user mudar
    } catch (error) {
      console.error('❌ Login error in component:', error);
      // Toast já é mostrado no useAuthOperations
    } finally {
      console.log('🧹 Cleaning local login loading state');
      setIsLoggingIn(false);
    }
  };

  const handleForgotPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      alert('Por favor, digite seu email primeiro');
      return;
    }
    
    console.log('🔄 Password reset requested for:', email);
    setIsResettingPassword(true);
    
    try {
      await resetPassword(email);
      console.log('✅ Password reset completed successfully');
    } catch (error) {
      console.error('❌ Password reset error in component:', error);
    } finally {
      console.log('🧹 Cleaning password reset state');
      setIsResettingPassword(false);
    }
  };

  // CORREÇÃO: Loading combinado apenas para UI, não para lógica de redirecionamento
  const isPageLoading = authContextLoading || isLoggingIn;
  
  // Debug adicional do estado de loading
  useEffect(() => {
    console.log('🔍 Login loading states - AuthContext:', authContextLoading, 'Local:', isLoggingIn, 'Combined:', isPageLoading);
  }, [authContextLoading, isLoggingIn, isPageLoading]);
  
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
      
      {/* Right side - Login form */}
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
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="tech-input w-full"
                  placeholder="seu@email.com"
                  required
                  disabled={isPageLoading}
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-semibold">Senha</label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={isResettingPassword || !email.trim() || isPageLoading}
                    className="text-sm text-primary hover:text-primary/80 font-medium transition-colors disabled:opacity-50"
                  >
                    {isResettingPassword ? 'Enviando...' : 'Esqueceu?'}
                  </button>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="tech-input w-full"
                  placeholder="********"
                  required
                  disabled={isPageLoading}
                />
              </div>
              
              <button
                type="submit"
                disabled={isPageLoading || !email.trim() || !password.trim()}
                className="tech-button w-full py-3 font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoggingIn ? 'Entrando...' : (
                  <>
                    Entrar
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Ainda não tem uma conta? <a href="/register" className="text-primary hover:text-primary/80 font-medium transition-colors">Criar conta</a>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Quer conhecer nossos planos? <a href="/plans" className="text-primary hover:text-primary/80 font-medium transition-colors">Ver planos</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
