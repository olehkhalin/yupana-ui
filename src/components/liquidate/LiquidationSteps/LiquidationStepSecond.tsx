import React, { FC } from "react";
import { useParams } from "react-router-dom";

import { useWiderThanMphone } from "utils/helpers";
import { useLiquidateDetails } from "hooks/useLiquidateDetails";
import { ReceiveCollateral } from "components/tables/containers";

import s from "./LiquidationSteps.module.sass";

export const LiquidationStepSecond: FC = () => {
  // @ts-ignore
  const { borrowerAddress }: { borrowerAddress: string } = useParams();
  const isWiderThanMphone = useWiderThanMphone();

  const { data, loading, error } = useLiquidateDetails(borrowerAddress);

  return (
    <section className={s.section}>
      <h2 className={s.title}>
        {isWiderThanMphone ? (
          "Step 2 — Receive Collateral"
        ) : (
          <>
            Step 2<span className={s.subtitle}>Receive Collateral</span>
          </>
        )}
      </h2>
      <div className={s.description}>
        Choose which collateral asset you will receive after liquidation.
        Remember that the percentage of the liquidation bonus depends on your
        choice, and also the amount of the chosen collateral asset must cover
        the debt and the bonus.
      </div>
      <ReceiveCollateral
        data={data ? data.collateralAssets : undefined}
        loading={error ? true : loading}
      />
    </section>
  );
};
