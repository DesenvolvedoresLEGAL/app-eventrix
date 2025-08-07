
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

interface PrivateRouteProps {
  children: JSX.Element
}

const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-foreground mb-2">Verificando autenticação...</h2>
      <p className="text-muted-foreground">Aguarde um momento</p>
    </div>
  </div>
)

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, session, loading, isAuthenticated } = useAuth()

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return <LoadingScreen />
  }

  // Verificar tanto user quanto session para garantir autenticação completa
  if (!isAuthenticated || !user || !session) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default PrivateRoute
