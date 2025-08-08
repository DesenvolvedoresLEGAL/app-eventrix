
import React from 'react'
import RoleBasedRoute from './RoleBasedRoute'

interface PrivateRouteProps {
  children: JSX.Element
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // PrivateRoute agora é apenas um wrapper do RoleBasedRoute sem restrições de role
  return (
    <RoleBasedRoute>
      {children}
    </RoleBasedRoute>
  )
}

export default PrivateRoute
