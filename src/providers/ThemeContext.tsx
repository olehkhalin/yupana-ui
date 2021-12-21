import React, {
  useState, createContext,
} from 'react';

export enum ToastThemes {
  INFO = 'info',
  ERROR = 'error',
}

export type ThemeContextValue = {
  type: ToastThemes
  setTheme: (arg: ToastThemes) => void
};

export const ThemeContext = createContext<any>({
  type: ToastThemes.INFO,
  setTheme: () => { },
});

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<ThemeContextValue>({
    type: ToastThemes.INFO,
    setTheme: () => { },
  });

  return (
    <ThemeContext.Provider value={{
      theme, setTheme,
    }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
