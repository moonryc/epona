import { useAllToasts } from './useAllToasts';
import { useMutation } from '@tanstack/react-query';

export const useToastMutation = () => {
  const { successToast, errorToast } = useAllToasts();

  return useMutation({
    onSuccess: () => successToast,
    onError: () => errorToast,
  });
};
