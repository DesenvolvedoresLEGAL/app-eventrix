
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = () => {
      const storedUser = localStorage.getItem('hubx_user');
      
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);
  
  const login = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call for authentication
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // For demo, we'll accept any email/password
        const user = {
          id: '1',
          name: 'Admin',
          email: email,
          role: 'admin',
        };
        
        setUser(user);
        localStorage.setItem('hubx_user', JSON.stringify(user));
        setLoading(false);
        resolve();
      }, 1500);
    });
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('hubx_user');
    navigate('/login');
  };
  
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
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
