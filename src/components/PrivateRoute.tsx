
import React from 'react'
import RoleBasedRoute from './RoleBasedRoute'

interface PrivateRouteProps {
  children: JSX.Element
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // TODO(auth-guard): In future, swap to RouteGuard handling public/private + permissions
  return (
    <RoleBasedRoute>
      {children}
    </RoleBasedRoute>
  )
}

export default PrivateRoute
