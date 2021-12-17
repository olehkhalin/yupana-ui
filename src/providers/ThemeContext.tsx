import React, { useState, useContext, createContext } from 'react';

// type ThemeContextValue = {
//   type: string
//   setTheme: () => any
// };

export const ThemeContext = createContext<any>({
  type: '',
  setTheme: () => {},
});

export const useToastTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<any>({
    type: '',
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
