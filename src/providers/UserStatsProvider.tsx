import { useState, useCallback } from 'react';
import BigNumber from 'bignumber.js';
import constate from 'constate';

export type UserStatsProviderProps = {
  maxCollateral: number
  outstandingBorrow: number
};

type BorrowedAsset = {
  yToken: number
  borrowed: BigNumber
};

export const [
  UserStatsProvider,
  useUserStats,
] = constate(() => {
  const [userStatsState, setUserStatsState] = useState<UserStatsProviderProps>({
    maxCollateral: 0,
    outstandingBorrow: 0,
  });
  const [userBorrowedAssets, setUserBorrowedAssets] = useState<BorrowedAsset[]>([]);

  const setUserStats = useCallback((props: UserStatsProviderProps) => {
    setUserStatsState(props);
  }, []);

  const findBorrowedToken = (yToken: number): BorrowedAsset | undefined => (
    userBorrowedAssets
      ? userBorrowedAssets
        .find((asset) => asset.yToken === yToken)
      : undefined
  );

  return {
    userStats: userStatsState,
    userBorrowedAssets,
    setUserStats,
    setUserBorrowedAssets,
    findBorrowedToken,
  };
});
