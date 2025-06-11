
import React from 'react';
import { AuthProvider } from '@/hooks/useAuth';

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export { useAuth } from '@/hooks/useAuth';
