import { useCallback } from 'react';

import type { OpenToastOptions } from './useToast';
import useToast from './useToast';

type UseSuccessToastOptions = Pick<OpenToastOptions, 'autoHideDuration'>;

export const useSuccessToast = (
  { autoHideDuration }: UseSuccessToastOptions = { autoHideDuration: 5000 },
) => {
  const { openToast, closeToast } = useToast();
  const successToast = useCallback(
    (msg?: string) => {
      return openToast(msg ?? "success", { autoHideDuration, variant: "success" });
    },
    [autoHideDuration, openToast],
  );

  return {
    successToast,
    closeToast,
  };
};
