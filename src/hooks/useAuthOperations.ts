
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useProfile } from '@/hooks/useProfile';
import { RegisterData } from '@/types/auth';
import { CreateProfileData } from '@/types/profile';
import { useTenant } from '@/hooks/useTenant';
import { logAuthEvent } from '@/utils/authUtils';

/**
 * Coleção de operações de autenticação utilizadas em toda a aplicação.
 */
export const useAuthOperations = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createProfile } = useProfile();
  const { createTenant, assignUserToTenant } = useTenant();

  /**
   * Autentica o usuário com e-mail e senha.
   * Redireciona para o dashboard em caso de sucesso.
   */
  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });

      if (error) {
        await logAuthEvent('login_failed');
        
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Email ou senha incorretos');
        } else if (error.message.includes('Email not confirmed')) {
          throw new Error('Por favor, confirme seu email antes de fazer login');
        } else if (error.message.includes('Too many requests')) {
          throw new Error('Muitas tentativas de login. Tente novamente mais tarde');
        } else {
          throw new Error('Erro no login. Tente novamente');
        }
      }

      if (data.user) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo de volta ao Eventrix™",
        });
        
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast({
        title: "Erro no login",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Registra um novo usuário e cria o perfil correspondente.
   */
  const register = async (userData: RegisterData) => {
    setLoading(true);
    
    try {
      const redirectUrl = `${window.location.origin}/dashboard`;
      
      if (import.meta.env.DEV) {
        console.log('🚀 Starting registration process for:', userData.email);
      }
      
      // Etapa 1: criar o usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email.trim().toLowerCase(),
        password: userData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            name: `${userData.firstName} ${userData.lastName}`,
            orgName: userData.orgName,
            phone: userData.phone
          }
        }
      });

      if (authError) {
        console.error('❌ Auth registration error:', authError);
        await logAuthEvent('register_failed');
        
        if (authError.message.includes('already registered')) {
          throw new Error('Este email já está cadastrado');
        } else if (authError.message.includes('Password should be')) {
          throw new Error('A senha deve ter pelo menos 6 caracteres');
        } else {
          throw new Error('Erro no cadastro. Tente novamente');
        }
      }

      if (!authData.user) {
        throw new Error('Falha ao criar usuário no sistema de autenticação');
      }

      if (import.meta.env.DEV) {
        console.log('✅ Auth user created successfully:', authData.user.id);
      }

      // Etapa 2: criar o perfil em public.profiles
      try {
        const profileData: CreateProfileData = {
          auth_user_id: authData.user.id,
          first_name: userData.firstName,
          last_name: userData.lastName,
          email: userData.email.trim().toLowerCase(),
          phone: userData.phone || null
        };

        if (import.meta.env.DEV) {
          console.log('📝 Creating profile with data:', profileData);
        }
        const profile = await createProfile(profileData);

        if (profile) {
          if (import.meta.env.DEV) {
            console.log('✅ Profile created successfully:', profile.uuid);
          }

          // criar tenant padr\u00e3o
          const tenant = await createTenant({
            name: userData.orgName,
            document_id: userData.documentId || null,
            contact_email: userData.contactEmail.trim().toLowerCase(),
            contact_phone: userData.contactPhone || null,
            plan_id: userData.planId.trim()
          });

          if (tenant) {
            await assignUserToTenant(authData.user.id, tenant.id, true);
          }
        } else {
          console.warn('⚠️ Profile creation returned null but no error was thrown');
        }

        // Registrar o sucesso do cadastro
        await logAuthEvent('register', authData.user.id);
        
        toast({
          title: "Conta criada com sucesso!",
          description: "Verifique seu email para confirmar a conta",
        });
        
        // Caso a confirmação de email esteja desativada, redirecione imediatamente
        if (authData.session) {
          navigate('/dashboard');
        }

      } catch (profileError: any) {
        console.error('❌ Registro de perfil/tenant falhou:', profileError);

        console.error('🚨 MANUAL CLEANUP NEEDED:', {
          authUserId: authData.user.id,
          email: userData.email,
          error: profileError.message,
          timestamp: new Date().toISOString()
        });

        await logAuthEvent('register_profile_failed');

        throw new Error(`Erro ao finalizar cadastro: ${profileError.message}`);
      }

    } catch (error: any) {
      console.error('❌ Registration process failed:', error);
      toast({
        title: "Erro no cadastro",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      // Sempre redefina o estado de carregamento
      setLoading(false);
    }
  };

  /**
   * Envia um e-mail para redefinir a senha.
   */
  const resetPassword = async (email: string) => {
    try {
      const redirectUrl = `${window.location.origin}/login`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim().toLowerCase(),
        { redirectTo: redirectUrl }
      );

      if (error) {
        await logAuthEvent('password_reset_failed');
        throw new Error('Erro ao enviar email de recuperação');
      }

      await logAuthEvent('password_reset_requested');
      
      toast({
        title: "Email de recuperação enviado",
        description: "Verifique sua caixa de entrada",
      });
    } catch (error: any) {
      toast({
        title: "Erro na recuperação de senha",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  /**
   * Atualiza a senha do usuário atual.
   */
  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password
      });

      if (error) {
        await logAuthEvent('password_change_failed');
        throw new Error('Erro ao alterar senha');
      }

      await logAuthEvent('password_changed');
      
      toast({
        title: "Senha alterada com sucesso",
        description: "Sua senha foi atualizada",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao alterar senha",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  /**
   * Encerra a sessão e redireciona para a tela de login.
   */
  const logout = async () => {
    try {
      await logAuthEvent('logout');
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error);
      }
      
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso",
      });
      
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Força o logout mesmo que ocorra um erro
      navigate('/login');
    }
  };

  return {
    login,
    register,
    resetPassword,
    updatePassword,
    logout,
    loading,
  };
};
