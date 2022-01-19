import { useState } from 'react';
import constate from 'constate';

export const [
  YTokenProvider,
  useYToken,
] = constate(() => {
  const [borrowYToken, setBorrowYToken] = useState<number | null>(null);
  const [collateralYToken, setCollateralYToken] = useState<number | null>(null);

  return {
    borrowYToken,
    setBorrowYToken,
    collateralYToken,
    setCollateralYToken,
  };
});
