import constate from 'constate';
import { useState, useCallback } from 'react';
import BigNumber from 'bignumber.js';

export type UserGeneralInfoType = { maxCollateral: BigNumber, outstandingBorrow: BigNumber } | null;

export const [
  UserGeneralInfoProvider,
  useUserGeneralInfo,
] = constate(() => {
  const [infoState, setInfoState] = useState<UserGeneralInfoType>(null);

  const setUserGeneralInfo = useCallback((info: UserGeneralInfoType) => {
    setInfoState(info);
  }, []);

  return {
    userGeneralInfo: infoState,
    setUserGeneralInfo,
  };
});
