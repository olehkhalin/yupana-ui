import constate from 'constate';
import { useState, useCallback } from 'react';

export const [
  UserBorrowedYTokensProvider,
  useUserBorrowedYTokens,
] = constate(() => {
  const [yTokensState, setYTokensState] = useState<number[]>([]);

  const setUserBorrowedYTokens = useCallback((array: number[]) => {
    setYTokensState(array);
  }, []);

  return {
    userBorrowedYTokens: yTokensState,
    setUserBorrowedYTokens,
  };
});
