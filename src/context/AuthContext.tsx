
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { useProfile } from '@/hooks/useProfile';
import { Profile, CreateProfileData } from '@/types/profile';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profile?: Profile;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyName?: string;
  position?: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createProfile, getProfileByAuthId } = useProfile();

  // Get user's IP address for audit logging
  const getUserIP = async (): Promise<string> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return 'unknown';
    }
  };

  // Get device info for audit logging
  const getDeviceInfo = (): string => {
    return navigator.userAgent || 'unknown';
  };

  // Log authentication events
  const logAuthEvent = async (action: string, userId?: string) => {
    try {
      const ip = await getUserIP();
      const device = getDeviceInfo();
      
      console.log('Auth event:', {
        user_id: userId || session?.user?.id,
        action: action,
        ip: ip,
        device: device,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to log auth event:', error);
    }
  };

  // Create user profile from database profile data
  const createUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      console.log('Creating user profile for:', supabaseUser.email);
      
      // Try to get profile from database first
      const profile = await getProfileByAuthId(supabaseUser.id);
      
      if (profile) {
        console.log('Profile found in database:', profile);
        const userProfile: User = {
          id: supabaseUser.id,
          name: `${profile.first_name} ${profile.last_name}`.trim(),
          email: profile.email,
          role: 'user',
          profile: profile
        };
        setUser(userProfile);
      } else {
        console.log('No profile found, using fallback data');
        // Fallback to metadata if no profile in database
        const userProfile: User = {
          id: supabaseUser.id,
          name: supabaseUser.user_metadata?.name || 
                `${supabaseUser.user_metadata?.firstName || ''} ${supabaseUser.user_metadata?.lastName || ''}`.trim() ||
                supabaseUser.email?.split('@')[0] || 'User',
          email: supabaseUser.email || '',
          role: 'user'
        };
        setUser(userProfile);
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
      // Fallback user data
      setUser({
        id: supabaseUser.id,
        name: supabaseUser.email?.split('@')[0] || 'User',
        email: supabaseUser.email || '',
        role: 'user'
      });
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        
        if (session?.user) {
          await createUserProfile(session.user);
          
          // Log successful auth events
          if (event === 'SIGNED_IN') {
            await logAuthEvent('login', session.user.id);
          } else if (event === 'TOKEN_REFRESHED') {
            console.log('Token refreshed for user:', session.user.email);
          }
        } else {
          setUser(null);
          if (event === 'SIGNED_OUT') {
            await logAuthEvent('logout');
          }
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setSession(session);
        createUserProfile(session.user);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

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
      
      setUser(null);
      setSession(null);
      
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso",
      });
      
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Force logout even if there's an error
      setUser(null);
      setSession(null);
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout, 
      register, 
      resetPassword, 
      updatePassword 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
