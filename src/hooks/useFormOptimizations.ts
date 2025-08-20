import { useCallback, useRef, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface UseFormOptimizationsProps<T> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => Promise<void>;
  debounceMs?: number;
}

interface UseFormOptimizationsReturn<T> {
  handleSubmit: (data: T) => Promise<void>;
  isSubmitting: boolean;
  canSubmit: boolean;
  shouldPreventReset: boolean;
}

export function useFormOptimizations<T>({
  form,
  onSubmit,
  debounceMs = 300
}: UseFormOptimizationsProps<T>): UseFormOptimizationsReturn<T> {
  const submissionInProgress = useRef(false);
  const lastSubmissionTime = useRef(0);
  const abortController = useRef<AbortController | null>(null);

  const handleSubmit = useCallback(async (data: T) => {
    const now = Date.now();
    
    // Prevent rapid successive submissions (debouncing)
    if (now - lastSubmissionTime.current < debounceMs) {
      return;
    }

    // Cancel any pending request
    if (abortController.current) {
      abortController.current.abort();
    }

    // Create new abort controller
    abortController.current = new AbortController();
    
    if (submissionInProgress.current) {
      return;
    }

    submissionInProgress.current = true;
    lastSubmissionTime.current = now;

    try {
      await onSubmit(data);
    } finally {
      submissionInProgress.current = false;
      abortController.current = null;
    }
  }, [onSubmit, debounceMs]);

  const isSubmitting = submissionInProgress.current;
  
  const canSubmit = useMemo(() => {
    return !isSubmitting && form.formState.isValid;
  }, [isSubmitting, form.formState.isValid]);

  const shouldPreventReset = useMemo(() => {
    return form.formState.isDirty && !isSubmitting;
  }, [form.formState.isDirty, isSubmitting]);

  return {
    handleSubmit,
    isSubmitting,
    canSubmit,
    shouldPreventReset
  };
}