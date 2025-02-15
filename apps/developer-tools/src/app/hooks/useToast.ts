import { useCallback } from "react";

import type { OptionsObject, SnackbarMessage, SnackbarKey } from "notistack";
import { useSnackbar } from "notistack";

export type OpenToastOptions = Omit<OptionsObject, "style">;
export type OpenToast = (message: SnackbarMessage, options?: OpenToastOptions) => SnackbarKey;

const useToast = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const openToast: OpenToast = useCallback(
    (message, options = {}) => {
      const { autoHideDuration = 1800, ...restOptions } = options;

      return enqueueSnackbar(message, {
        autoHideDuration,
        ...restOptions,
        style: {
          top: 75,
        },
      });
    },
    [enqueueSnackbar],
  );

  return {
    openToast,
    closeToast: closeSnackbar,
  };
};

export default useToast;
