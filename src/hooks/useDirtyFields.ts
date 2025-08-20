import { useMemo, useCallback } from 'react';
import { UseFormReturn, FieldValues, Path } from 'react-hook-form';

interface UseDirtyFieldsProps<T extends FieldValues> {
  form: UseFormReturn<T>;
}

interface UseDirtyFieldsReturn<T extends FieldValues> {
  dirtyFields: Partial<Record<Path<T>, boolean>>;
  isDirty: boolean;
  dirtyFieldsCount: number;
  hasDirtyFields: boolean;
  resetDirtyFields: () => void;
}

export function useDirtyFields<T extends FieldValues>({
  form
}: UseDirtyFieldsProps<T>): UseDirtyFieldsReturn<T> {
  const dirtyFields = useMemo(() => {
    return form.formState.dirtyFields as Partial<Record<Path<T>, boolean>>;
  }, [form.formState.dirtyFields]);

  const isDirty = useMemo(() => {
    return form.formState.isDirty;
  }, [form.formState.isDirty]);

  const dirtyFieldsCount = useMemo(() => {
    return Object.keys(dirtyFields).length;
  }, [dirtyFields]);

  const hasDirtyFields = useMemo(() => {
    return dirtyFieldsCount > 0;
  }, [dirtyFieldsCount]);

  const resetDirtyFields = useCallback(() => {
    // Não reseta os valores, apenas limpa o estado dirty
    // Preserva os valores atuais do formulário
    const currentValues = form.getValues();
    form.reset(currentValues, {
      keepValues: true,
      keepDirty: false,
      keepDirtyValues: false
    });
  }, [form]);

  return {
    dirtyFields,
    isDirty,
    dirtyFieldsCount,
    hasDirtyFields,
    resetDirtyFields
  };
}