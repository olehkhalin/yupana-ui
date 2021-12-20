import { useCallback, useContext, useRef } from 'react';
import { UpdateOptions, toast } from 'react-toastify';

import { ThemeContext } from 'providers/ThemeContext';

export default function useUpdateToast() {
  const toastIdRef = useRef<string | number>();
  const { setTheme } = useContext(ThemeContext);

  return useCallback(({
    type,
    render,
    progress,
    autoClose = 5000,
    ...restOptions
  }: UpdateOptions) => {
    setTheme(type);
    const creationFn = type && type !== 'default' ? toast[type] : toast;
    if (toastIdRef.current && toast.isActive(toastIdRef.current)) {
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
