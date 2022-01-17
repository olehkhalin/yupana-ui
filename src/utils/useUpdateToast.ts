import { useCallback, useContext, useRef } from 'react';
import { UpdateOptions, toast } from 'react-toastify';

import { ToastThemeContext } from 'providers/ToastThemeProvider';

export default function useUpdateToast() {
  const toastIdRef = useRef<string | number>();
  const { setTheme } = useContext(ToastThemeContext);

  return useCallback(({
    type,
    render,
  }: UpdateOptions) => {
    setTheme(type);
    const creationFn = type && type !== 'default' ? toast[type] : toast;
    if (toastIdRef.current && toast.isActive(toastIdRef.current)) {
      toast(render);
    } else {
      toastIdRef.current = creationFn(render);
    }
  }, [setTheme]);
}
