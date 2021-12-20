import React, {
  useState, createContext, Dispatch,
} from 'react';

export type ThemeContextValue = {
  type: string
  setTheme: Dispatch<any>
};

export const ThemeContext = createContext<any>({
  type: '',
  setTheme: () => { },
});

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<ThemeContextValue>({
    type: '',
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
