import React, {
  useState, createContext,
} from 'react';

export enum ToastThemes {
  INFO = 'info',
  ERROR = 'error',
}

export type ToastThemeContextValue = {
  type: ToastThemes
  setTheme: (arg: ToastThemes) => void
};

export const ToastThemeContext = createContext<any>({
  type: ToastThemes.INFO,
  setTheme: () => { },
});

export const ToastThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<ToastThemeContextValue>({
    type: ToastThemes.INFO,
    setTheme: () => { },
  });

  return (
    <ToastThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ToastThemeContext.Provider>
  );
};
