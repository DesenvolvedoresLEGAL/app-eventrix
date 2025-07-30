
import { useMemo } from 'react';

interface ValidationRules {
  email?: boolean;
  required?: boolean;
  minLength?: number;
  password?: boolean;
  phone?: boolean;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const useFormValidation = () => {
  const validateField = useMemo(() => (value: string, rules: ValidationRules): ValidationResult => {
    const errors: string[] = [];

    if (rules.required && (!value || value.trim() === '')) {
      errors.push('Este campo é obrigatório');
    }

    if (rules.minLength && value.length < rules.minLength) {
      errors.push(`Mínimo de ${rules.minLength} caracteres`);
    }

    if (rules.email && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors.push('Email inválido');
      }
    }

    if (rules.password && value) {
      if (value.length < 8) {
        errors.push('Senha deve ter no mínimo 8 caracteres');
      }
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        errors.push('Senha deve conter ao menos: 1 maiúscula, 1 minúscula e 1 número');
      }
    }

    if (rules.phone && value) {
      const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
      if (!phoneRegex.test(value)) {
        errors.push('Formato: (11) 99999-9999');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }, []);

  const formatPhone = useMemo(() => (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return `(${numbers}`;
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  }, []);

  const generateSlug = useMemo(() => (name: string): string => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }, []);

  return {
    validateField,
    formatPhone,
    generateSlug
  };
};
