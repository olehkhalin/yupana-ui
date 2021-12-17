import { useState } from 'react';
import { TypeOptions } from 'react-toastify';

type ThemesType = TypeOptions | null | undefined;

export const useToastThemes = () => {
  const [theme, setTheme] = useState<ThemesType>('info');

  const handleSetTheme = (themeProps: ThemesType) => {
    setTheme(themeProps);
  };

  return {
    theme,
    handleSetTheme,
  };
};
