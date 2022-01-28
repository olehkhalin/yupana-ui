import { useState, useCallback } from "react";
import { UpdateOptions, toast } from "react-toastify";
import constate from "constate";

export enum ToastThemes {
  INFO = "info",
  ERROR = "error",
}

export const [ToastProvider, useUpdateToast] = constate(() => {
  const [theme, setTheme] = useState<ToastThemes>(ToastThemes.INFO);

  const updateToast = useCallback(({ type, render }: UpdateOptions) => {
    setTheme(type as ToastThemes);
    toast(render);
  }, []);

  return {
    toastTheme: theme,
    updateToast,
  };
});
