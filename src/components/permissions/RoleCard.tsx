import React, { useMemo } from 'react';
import { Settings, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatRole, formatPermission } from '@/utils/roleFormatter';
import { UserRole } from '@/context/AuthContext';

interface RoleCardProps {
  role: UserRole & { 
    permissions: string[];
    userCount?: number;
  };
  onEdit: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ role, onEdit }) => {
  // Garantir que permissions é sempre um array de strings
  const permissions = Array.isArray(role.permissions) 
    ? role.permissions as string[]
    : typeof role.permissions === 'string' 
      ? [role.permissions] 
      : [];

  const formattedRole = useMemo(() => 
    formatRole(role.code, role.description, permissions as any[]), 
    [role.code, role.description, permissions]
  );

  const formattedPermissions = useMemo(() => 
    permissions.slice(0, 5).map(permission => 
      formatPermission(permission as any)
    ),
    [permissions]
  );

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case 'basic': return 'secondary';
      case 'intermediate': return 'default';
      case 'advanced': return 'destructive';
      default: return 'outline';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'basic': return 'Básico';
      case 'intermediate': return 'Intermediário';
      case 'advanced': return 'Avançado';
      default: return 'Personalizado';
    }
  };

  return (
    <Card className="tech-card p-0 group hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3 flex-1">
            {/* Role Icon */}
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center tech-float">
              <formattedRole.icon className={`h-5 w-5 ${formattedRole.colorClass}`} />
            </div>

            {/* Role Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-foreground truncate">
                  {formattedRole.name}
                </h3>
                <Badge 
                  variant={getLevelBadgeVariant(formattedRole.level)}
                  className="text-xs"
                >
                  {getLevelLabel(formattedRole.level)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {formattedRole.description}
              </p>
            </div>
          </div>

          {/* Edit Button */}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onEdit}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-primary/10"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{role.userCount || 0} usuários</span>
          </div>
          <div className="text-muted-foreground">
            {permissions.length} permissões
          </div>
        </div>

        {/* Permissions Preview */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Principais permissões:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {formattedPermissions.map((permission, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className={`text-xs px-2 py-1 bg-accent/50 hover:bg-accent transition-colors ${permission.colorClass} flex items-center gap-1`}
              >
                <permission.icon className="h-3 w-3" />
                {permission.name}
              </Badge>
            ))}
            {permissions.length > 5 && (
              <Badge variant="outline" className="text-xs px-2 py-1 bg-muted">
                +{permissions.length - 5} mais
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleCard;