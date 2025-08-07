
// Authentication feature barrel file
// Exportações da feature de autenticação

// Pages
export { default as LoginPage } from './pages/LoginPage'
export { default as RegisterPage } from './pages/RegisterPage'
export { default as ResetPasswordPage } from './pages/ResetPasswordPage'

// Components
export { default as PrivateRoute } from './components/PrivateRoute'

// Context & Hooks
export { AuthProvider, useAuth } from './context/AuthContext'
export type { Tenant } from './context/AuthContext'

// Services
export * from './services/authService'
export type { SignUpData } from './services/authService'
