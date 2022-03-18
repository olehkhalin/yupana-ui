import { useCallback, useState } from "react";
import constate from "constate";

export const [RedirectProvider, useRedirect] = constate(() => {
  const [redirect, setRedirect] = useState(true);

  const updateRedirect = useCallback((param: boolean) => {
    setRedirect(param);
  }, []);

  return {
    redirect,
    updateRedirect,
  };
});
