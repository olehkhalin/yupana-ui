import constate from 'constate';
import { useState } from 'react';

export const [
  YTokenProvider,
  useYToken,
] = constate(() => {
  const [yTokenValue, setYTokenValue] = useState<number | null>(null);

  return {
    yTokenValue,
    setYTokenValue,
  };
});
