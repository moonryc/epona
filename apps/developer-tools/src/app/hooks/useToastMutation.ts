import { useAllToasts } from './useAllToasts';
import { useMutation } from '@tanstack/react-query';
import type { DefaultError } from '@tanstack/query-core';
import type { UseMutationOptions } from '@tanstack/react-query/src/types';

type UseToastMutationProps<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
> ={
  options: UseMutationOptions<TData, TError, TVariables, TContext>
}

export const useToastMutation = ({options}:UseToastMutationProps) => {
  const { successToast, errorToast } = useAllToasts();

  return useMutation({
    onSuccess: () => successToast(),
    onError: () => errorToast(),
    ...options,
  });
};
