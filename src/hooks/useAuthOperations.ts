
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

  const register = async (userData: RegisterData) => {
    setLoading(true);
    
    try {
      const redirectUrl = `${window.location.origin}/dashboard`;
      
      console.log('Starting registration process for:', userData.email);
      
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
        console.error('Auth registration error:', authError);
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

      console.log('Auth user created successfully:', authData.user.id);

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

        const profile = await createProfile(profileData);
        console.log('Profile created successfully:', profile?.uuid);

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
        console.error('Profile creation failed, attempting rollback:', profileError);
        
        // Step 3: Rollback - Delete auth user if profile creation failed
        try {
          console.log('Attempting to delete auth user due to profile creation failure');
          const { error: deleteError } = await supabase.auth.admin.deleteUser(authData.user.id);
          
          if (deleteError) {
            console.error('Failed to rollback auth user:', deleteError);
            // Log critical error - manual cleanup might be needed
            console.error('CRITICAL: Auth user created but profile failed, and rollback failed', {
              authUserId: authData.user.id,
              email: userData.email,
              profileError: profileError.message,
              rollbackError: deleteError.message
            });
          } else {
            console.log('Auth user successfully rolled back');
          }
        } catch (rollbackError) {
          console.error('Rollback operation failed:', rollbackError);
        }
        
        await logAuthEvent('register_rollback_failed');
        throw profileError;
      }

    } catch (error: any) {
      console.error('Registration process failed:', error);
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
      // Force logout even if there's an error
      navigate('/login');
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
