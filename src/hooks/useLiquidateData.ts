import constate from "constate";
import { useCallback, useState } from "react";

type LiquidateDataType = {
  brrowedAssetYToken?: number;
  collateralAssetYToken?: number;
};

export const [LiquidateDataProvider, useLiquidateData] = constate(() => {
  const [liquidateDataState, setLiquidateDataState] =
    useState<LiquidateDataType | null>(null);

  const setBorrowedAssetYToken = useCallback((yToken: number) => {
    setLiquidateDataState((prevState) => ({
      ...prevState,
      brrowedAssetYToken: yToken,
    }));
  }, []);

  const setCollateralAssetYToken = useCallback((yToken: number) => {
    setLiquidateDataState((prevState) => ({
      ...prevState,
      collateralAssetYToken: yToken,
    }));
  }, []);

  return {
    liquidateData: liquidateDataState,
    setBorrowedAssetYToken,
    setCollateralAssetYToken,
  };
});
