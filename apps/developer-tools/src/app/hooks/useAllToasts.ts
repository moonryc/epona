import { useErrorToast } from './useErrorToast';
import { useSuccessToast } from './useSucessToast';
import useToast from './useToast';

export const useAllToasts = () => {
  const { errorToast } = useErrorToast();
  const { successToast } = useSuccessToast();
  const toast = useToast()

  return {errorToast, successToast, dummyToast: ()=>toast.openToast("DUMMY TOAST", {variant:"info"})} as const
}
