
import { useMemo } from 'react';

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

export interface FormField {
  name: string;
  value: string;
  rules: ValidationRules;
}

export const useFormValidation = (fields: FormField[]) => {
  const errors = useMemo(() => {
    const fieldErrors: Record<string, string> = {};

    fields.forEach(({ name, value, rules }) => {
      if (rules.required && !value.trim()) {
        fieldErrors[name] = 'Este campo é obrigatório';
        return;
      }

      if (rules.minLength && value.length < rules.minLength) {
        fieldErrors[name] = `Mínimo ${rules.minLength} caracteres`;
        return;
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        fieldErrors[name] = `Máximo ${rules.maxLength} caracteres`;
        return;
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        fieldErrors[name] = 'Formato inválido';
        return;
      }

      if (rules.custom) {
        const customError = rules.custom(value);
        if (customError) {
          fieldErrors[name] = customError;
          return;
        }
      }
    });

    return fieldErrors;
  }, [fields]);

  const isValid = Object.keys(errors).length === 0;

  return { errors, isValid };
};

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const phonePattern = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})$/;

export const passwordValidation = (password: string): string | null => {
  if (password.length < 8) return 'Senha deve ter pelo menos 8 caracteres';
  if (!/[A-Z]/.test(password)) return 'Senha deve conter pelo menos uma letra maiúscula';
  if (!/[0-9]/.test(password)) return 'Senha deve conter pelo menos um número';
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Senha deve conter pelo menos um símbolo';
  return null;
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
};
