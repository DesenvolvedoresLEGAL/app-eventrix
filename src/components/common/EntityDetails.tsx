
import React, { memo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface FieldInfo {
  icon: ReactNode;
  label: string;
  value: string;
  subValue?: string;
}

export interface BadgeInfo {
  text: string;
  className: string;
}

export interface ActionButton {
  icon?: ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'outline' | 'destructive';
}

export interface EntityDetailsProps {
  title: string;
  subtitle?: string;
  badges: BadgeInfo[];
  headerAction?: {
    icon: ReactNode;
    label: string;
    onClick: () => void;
  };
  fields: FieldInfo[];
  actions: ActionButton[];
  additionalSections?: ReactNode;
  className?: string;
}

/**
 * Componente genérico para exibir detalhes de entidades
 */
const EntityDetails: React.FC<EntityDetailsProps> = memo(({
  title,
  subtitle,
  badges,
  headerAction,
  fields,
  actions,
  additionalSections,
  className = ""
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Informações principais */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{title}</CardTitle>
              {subtitle && <p className="text-gray-600">{subtitle}</p>}
              <div className="flex gap-2 mt-2">
                {badges.map((badge, index) => (
                  <Badge key={index} className={badge.className}>
                    {badge.text}
                  </Badge>
                ))}
              </div>
            </div>
            {headerAction && (
              <Button variant="outline" size="sm" onClick={headerAction.onClick}>
                {headerAction.icon}
                {headerAction.label}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field, index) => (
              <div key={index} className="flex items-center gap-3">
                {field.icon}
                <div>
                  <div className="font-medium">{field.label}</div>
                  <div className="text-gray-600">{field.value}</div>
                  {field.subValue && (
                    <div className="text-sm text-gray-500">{field.subValue}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Seções adicionais */}
      {additionalSections}

      {/* Ações */}
      <div className="flex gap-3 justify-end">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant || 'outline'}
            onClick={action.onClick}
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
});

EntityDetails.displayName = 'EntityDetails';

export default EntityDetails;
