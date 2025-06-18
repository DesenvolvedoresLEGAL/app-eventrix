import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useProfile } from '@/hooks/useProfile';
import { RegisterData } from '@/types/auth';
import { CreateProfileData } from '@/types/profile';
import { logAuthEvent } from '@/utils/authUtils';

export const useAuthOperations = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createProfile } = useProfile();

  // CORREÇÃO FASE 5: Função de navegação centralizada
  const safeNavigate = (path: string, delay: number = 100) => {
    setTimeout(() => {
      console.log('🔄 Navigating to:', path);
      navigate(path, { replace: true });
    }, delay);
  };

  const login = async (email: string, password: string) => {
    console.log('🔄 Starting login process for:', email);
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });

      if (error) {
        console.error('❌ Login failed:', error.message);
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
        console.log('✅ Login successful for:', data.user.email);
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo de volta ao Eventrix™",
        });
        
        // CORREÇÃO FASE 5: Navegação centralizada após pequeno delay
        safeNavigate('/dashboard', 200);
      }
    } catch (error: any) {
      console.error('❌ Login error caught:', error.message);
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

  const register = async (userData: RegisterData) => {
    console.log('🔄 Starting registration process for:', userData.email);
    setLoading(true);
    
    try {
      const redirectUrl = `${window.location.origin}/dashboard`;
      
      console.log('🚀 Starting registration process for:', userData.email);
      
      // Step 1: Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email.trim().toLowerCase(),
        password: userData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            name: `${userData.firstName} ${userData.lastName}`,
            companyName: userData.companyName,
            position: userData.position,
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

      console.log('✅ Auth user created successfully:', authData.user.id);

      // Step 2: Create profile in public.profiles
      try {
        const profileData: CreateProfileData = {
          auth_user_id: authData.user.id,
          first_name: userData.firstName,
          last_name: userData.lastName,
          email: userData.email.trim().toLowerCase(),
          phone: userData.phone || null,
          position: userData.position || null
        };

        console.log('📝 Creating profile with data:', profileData);
        const profile = await createProfile(profileData);
        
        if (profile) {
          console.log('✅ Profile created successfully:', profile.uuid);
        } else {
          console.warn('⚠️ Profile creation returned null but no error was thrown');
        }

        // Log successful registration
        await logAuthEvent('register', authData.user.id);
        
        toast({
          title: "Conta criada com sucesso!",
          description: "Verifique seu email para confirmar a conta",
        });
        
        // If email confirmation is disabled, redirect immediately
        if (authData.session) {
          navigate('/dashboard');
        }

      } catch (profileError: any) {
        console.error('❌ Profile creation failed:', profileError);
        
        // Log the error for manual cleanup if needed
        console.error('🚨 MANUAL CLEANUP NEEDED:', {
          authUserId: authData.user.id,
          email: userData.email,
          profileError: profileError.message,
          timestamp: new Date().toISOString()
        });
        
        await logAuthEvent('register_profile_failed');
        
        // Don't attempt client-side rollback, just show the error
        throw new Error(`Erro ao criar perfil: ${profileError.message}`);
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
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    console.log('🔄 Starting password reset for:', email);
    setLoading(true);
    
    try {
      const redirectUrl = `${window.location.origin}/login`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim().toLowerCase(),
        { redirectTo: redirectUrl }
      );

      if (error) {
        console.error('❌ Password reset failed:', error.message);
        await logAuthEvent('password_reset_failed');
        throw new Error('Erro ao enviar email de recuperação');
      }

      console.log('✅ Password reset email sent successfully');
      await logAuthEvent('password_reset_requested');
      
      toast({
        title: "Email de recuperação enviado",
        description: "Verifique sua caixa de entrada",
      });
    } catch (error: any) {
      console.error('❌ Password reset error:', error.message);
      toast({
        title: "Erro na recuperação de senha",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (password: string) => {
    console.log('🔄 Starting password update');
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password
      });

      if (error) {
        console.error('❌ Password update failed:', error.message);
        await logAuthEvent('password_change_failed');
        throw new Error('Erro ao alterar senha');
      }

      console.log('✅ Password updated successfully');
      await logAuthEvent('password_changed');
      
      toast({
        title: "Senha alterada com sucesso",
        description: "Sua senha foi atualizada",
      });
    } catch (error: any) {
      console.error('❌ Password update error:', error.message);
      toast({
        title: "Erro ao alterar senha",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    console.log('🔄 Starting logout process');
    setLoading(true);
    
    try {
      await logAuthEvent('logout');
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('❌ Logout error:', error);
      } else {
        console.log('✅ Logout successful');
      }
      
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso",
      });
      
      // CORREÇÃO FASE 5: Navegação centralizada
      safeNavigate('/login');
    } catch (error) {
      console.error('❌ Logout failed:', error);
      // Force navegação mesmo com erro
      safeNavigate('/login');
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    register,
    resetPassword,
    updatePassword,
    logout,
    loading
  };
};
