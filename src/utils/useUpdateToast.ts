import { useCallback, useContext, useRef } from 'react';
import { UpdateOptions, toast } from 'react-toastify';

import { ThemeContext } from 'providers/ThemeContext';
// import { getUniqueKey } from './getUniqueKey';

export default function useUpdateToast() {
  const toastIdRef = useRef<string | number>();
  const { setTheme } = useContext(ThemeContext);

  return useCallback(({
    type,
    render,
  }: UpdateOptions) => {
    setTheme(type);
    const creationFn = type && type !== 'default' ? toast[type] : toast;
    if (toastIdRef.current && toast.isActive(toastIdRef.current)) {
      toast.info(render);
    } else {
      toastIdRef.current = creationFn(render);
    }
  }, [setTheme]);
}
