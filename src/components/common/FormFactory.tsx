
import React, { memo, ReactNode } from 'react';
import { useForm, FieldValues, UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'select' | 'checkbox' | 'checkboxGroup';
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  gridColumn?: 'span-1' | 'span-2' | 'span-full';
  validation?: object;
}

export interface CheckboxSection {
  title: string;
  options: string[];
  name: string;
}

export interface FormFactoryProps<T extends FieldValues> {
  fields: FormField[];
  checkboxSections?: CheckboxSection[];
  onSubmit: (data: T) => void;
  onCancel: () => void;
  submitText?: string;
  cancelText?: string;
  defaultValues?: Partial<T>;
  className?: string;
}

/**
 * Factory genérico para criação de formulários com react-hook-form
 */
function FormFactory<T extends FieldValues>({
  fields,
  checkboxSections = [],
  onSubmit,
  onCancel,
  submitText = "Salvar",
  cancelText = "Cancelar",
  defaultValues,
  className = ""
}: FormFactoryProps<T>) {
  const form = useForm<T>({
    defaultValues
  });

  const { register, handleSubmit, setValue, watch, formState: { errors } } = form;

  const renderField = (field: FormField) => {
    const colSpan = field.gridColumn === 'span-2' ? 'md:col-span-2' : 
                   field.gridColumn === 'span-full' ? 'col-span-full' : '';
    
    return (
      <div key={field.name} className={`space-y-2 ${colSpan}`}>
        <Label htmlFor={field.name}>
          {field.label} {field.required && '*'}
        </Label>
        
        {field.type === 'select' ? (
          <Select onValueChange={(value) => setValue(field.name as any, value)}>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : field.type === 'checkbox' ? (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.name}
              {...register(field.name as any)}
            />
            <Label htmlFor={field.name} className="text-sm">
              {field.label}
            </Label>
          </div>
        ) : (
          <Input
            id={field.name}
            type={field.type}
            {...register(field.name as any, {
              required: field.required ? `${field.label} é obrigatório` : false,
              ...field.validation
            })}
            placeholder={field.placeholder}
          />
        )}
        
        {errors[field.name] && (
          <p className="text-sm text-red-600">
            {errors[field.name]?.message as string}
          </p>
        )}
      </div>
    );
  };

  const renderCheckboxSection = (section: CheckboxSection) => (
    <Card key={section.name}>
      <CardHeader>
        <CardTitle className="text-lg">{section.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {section.options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={option}
                onCheckedChange={(checked) => {
                  const currentValues = watch(section.name as any) || [];
                  if (checked) {
                    setValue(section.name as any, [...currentValues, option]);
                  } else {
                    setValue(section.name as any, currentValues.filter((v: string) => v !== option));
                  }
                }}
              />
              <Label htmlFor={option} className="text-sm">{option}</Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(renderField)}
      </div>

      {checkboxSections.map(renderCheckboxSection)}

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button type="submit">
          {submitText}
        </Button>
      </div>
    </form>
  );
}

export default memo(FormFactory) as typeof FormFactory;
