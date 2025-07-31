import React from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

/**
 * Componente reutilizável para campos de formulário com label
 */
export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const InputField: React.FC<InputFieldProps> = ({ label, error, className, id, ...props }) => (
  <div className="space-y-1">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <Input id={id} className={cn(className, error && 'border-destructive')} {...props} />
    {error && <p className="text-xs text-destructive mt-1">{error}</p>}
  </div>
)

export default InputField
