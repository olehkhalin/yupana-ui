import { useCallback, useRef } from 'react';
import { UpdateOptions, toast } from 'react-toastify';

import { useToastTheme } from 'providers/ThemeContext';

export default function useUpdateToast() {
  const toastIdRef = useRef<string | number>();
  const { setTheme } = useToastTheme();
  return useCallback(({
    type,
    render,
    progress,
    autoClose = 5000,
    ...restOptions
  }: UpdateOptions) => {
    const creationFn = type && type !== 'default' ? toast[type] : toast;
    if (toastIdRef.current && toast.isActive(toastIdRef.current)) {
      setTheme(type);
      toast.update(toastIdRef.current, {
        render,
        type,
        progress,
        autoClose,
        ...restOptions,
      });
    } else {
      toastIdRef.current = creationFn(render);
    }
  }, [setTheme]);
}
