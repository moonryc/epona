import { useCallback } from 'react';

import type { SnackbarMessage } from 'notistack';

import type { OpenToastOptions } from './useToast';
import useToast from './useToast';

type UseErrorToastOptions = Pick<OpenToastOptions, 'autoHideDuration'>;

export const useErrorToast = ({ autoHideDuration }: UseErrorToastOptions = { autoHideDuration: 5000 }) => {
  const { openToast, closeToast } = useToast();
  const errorToast = useCallback(
    (msg?: SnackbarMessage) => {
      return openToast(msg ?? "An error has occurred.", {
        variant: "error",
        autoHideDuration,
        preventDuplicate: true,
        key: "general_error",
      });
    },
    [autoHideDuration, openToast],
  );

  return {
    errorToast,
    closeToast,
  };
};
