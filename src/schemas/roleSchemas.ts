import { z } from 'zod';
import { Permission } from '@/utils/permissions';
import { getRoleByCode } from '@/services/rolesService';

// Helper function for async validation
const isRoleCodeAvailable = async (code: string, excludeId?: string) => {
  try {
    const existingRole = await getRoleByCode(code);
    if (!existingRole) return true;
    return excludeId ? existingRole.id === excludeId : false;
  } catch {
    return true; // If error occurs, allow the code (will be caught by server validation)
  }
};

// Base role schema
export const createRoleSchema = z.object({
  code: z.string()
    .min(3, 'Código deve ter pelo menos 3 caracteres')
    .max(50, 'Código deve ter no máximo 50 caracteres')
    .regex(/^[a-z0-9_-]+$/, 'Apenas letras minúsculas, números, underscore e hífen')
    .transform(val => val.toLowerCase().trim()),
  
  description: z.string()
    .min(10, 'Descrição deve ter pelo menos 10 caracteres')
    .max(500, 'Descrição deve ter no máximo 500 caracteres')
    .transform(val => val.trim()),
  
  permissions: z.array(z.nativeEnum(Permission))
    .min(1, 'Pelo menos uma permissão deve ser selecionada')
    .max(100, 'Máximo de 100 permissões por perfil')
    .refine(permissions => {
      // Remove duplicates
      const unique = [...new Set(permissions)];
      return unique.length === permissions.length;
    }, 'Permissões duplicadas não são permitidas')
});

// Schema for updating roles (all fields optional)
export const updateRoleSchema = z.object({
  code: z.string()
    .min(3, 'Código deve ter pelo menos 3 caracteres')
    .max(50, 'Código deve ter no máximo 50 caracteres')
    .regex(/^[a-z0-9_-]+$/, 'Apenas letras minúsculas, números, underscore e hífen')
    .transform(val => val.toLowerCase().trim())
    .optional(),
  
  description: z.string()
    .min(10, 'Descrição deve ter pelo menos 10 caracteres')
    .max(500, 'Descrição deve ter no máximo 500 caracteres')
    .transform(val => val.trim())
    .optional(),
  
  permissions: z.array(z.nativeEnum(Permission))
    .min(1, 'Pelo menos uma permissão deve ser selecionada')
    .max(100, 'Máximo de 100 permissões por perfil')
    .refine(permissions => {
      if (!permissions) return true;
      const unique = [...new Set(permissions)];
      return unique.length === permissions.length;
    }, 'Permissões duplicadas não são permitidas')
    .optional()
}).refine(data => {
  // At least one field must be provided for update
  return data.code !== undefined || data.description !== undefined || data.permissions !== undefined;
}, 'Pelo menos um campo deve ser fornecido para atualização');

// Schema for bulk role assignment
export const bulkAssignSchema = z.object({
  userIds: z.array(z.string().uuid('ID de usuário inválido'))
    .min(1, 'Pelo menos um usuário deve ser selecionado')
    .max(50, 'Máximo de 50 usuários por atribuição em lote'),
  
  roleId: z.string().uuid('ID do perfil inválido')
});

// Schema for role assignment to single user
export const assignRoleSchema = z.object({
  userId: z.string().uuid('ID de usuário inválido'),
  roleId: z.string().uuid('ID do perfil inválido')
});

// Schema for search and filtering
export const roleFilterSchema = z.object({
  search: z.string().max(100, 'Termo de busca muito longo').optional(),
  permissions: z.array(z.nativeEnum(Permission)).optional(),
  sortBy: z.enum(['code', 'description', 'created_at', 'permissions_count']).default('code'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  page: z.number().int().min(1, 'Página deve ser maior que 0').default(1),
  limit: z.number().int().min(1, 'Limite deve ser maior que 0').max(100, 'Limite máximo de 100').default(20)
});

// Schema for audit log filters
export const auditFilterSchema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  userId: z.string().uuid().optional(),
  action: z.enum(['CREATE', 'UPDATE', 'DELETE', 'ASSIGN', 'UNASSIGN']).optional(),
  entityType: z.enum(['ROLE', 'PERMISSION', 'USER_ROLE']).optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20)
});

// Form-specific schemas with validation messages
export const roleFormSchema = createRoleSchema.extend({
  code: createRoleSchema.shape.code.refine(
    async (code) => {
      if (!code || code.length < 3) return true; // Let other validations handle this
      return await isRoleCodeAvailable(code);
    },
    'Este código já está em uso'
  )
});

export const roleEditFormSchema = updateRoleSchema.extend({
  id: z.string().uuid('ID inválido'),
  code: updateRoleSchema.shape.code?.refine(
    async (code, ctx) => {
      if (!code || code.length < 3) return true;
      const roleId = (ctx.path[0] as any)?.id; // Get role ID from form context
      return await isRoleCodeAvailable(code, roleId);
    },
    'Este código já está em uso'
  )
});

// Type exports for components
export type CreateRoleFormData = z.infer<typeof createRoleSchema>;
export type UpdateRoleFormData = z.infer<typeof updateRoleSchema>;
export type BulkAssignFormData = z.infer<typeof bulkAssignSchema>;
export type AssignRoleFormData = z.infer<typeof assignRoleSchema>;
export type RoleFilterFormData = z.infer<typeof roleFilterSchema>;
export type AuditFilterFormData = z.infer<typeof auditFilterSchema>;

// Validation helpers
export const validateRoleCode = (code: string): string[] => {
  const errors: string[] = [];
  
  if (!code || code.length < 3) {
    errors.push('Código deve ter pelo menos 3 caracteres');
  }
  
  if (code && code.length > 50) {
    errors.push('Código deve ter no máximo 50 caracteres');
  }
  
  if (code && !/^[a-z0-9_-]+$/.test(code)) {
    errors.push('Apenas letras minúsculas, números, underscore e hífen são permitidos');
  }
  
  return errors;
};

export const validatePermissions = (permissions: Permission[]): string[] => {
  const errors: string[] = [];
  
  if (!permissions || permissions.length === 0) {
    errors.push('Pelo menos uma permissão deve ser selecionada');
  }
  
  if (permissions && permissions.length > 100) {
    errors.push('Máximo de 100 permissões por perfil');
  }
  
  if (permissions) {
    const unique = [...new Set(permissions)];
    if (unique.length !== permissions.length) {
      errors.push('Permissões duplicadas não são permitidas');
    }
  }
  
  return errors;
};