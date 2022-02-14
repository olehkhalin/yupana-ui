import React, { FC } from "react";
import { useParams } from "react-router-dom";

import { useWiderThanMphone } from "utils/helpers";
import { useLiquidateDetails } from "hooks/useLiquidateDetails";
import { RepayBorrow } from "components/tables/desktop";

import s from "./LiquidationSteps.module.sass";

export const LiquidationStepFirst: FC = () => {
  // @ts-ignore
  const { borrowerAddress }: { borrowerAddress: string } = useParams();
  const isWiderThanMphone = useWiderThanMphone();

  const { data, loading } = useLiquidateDetails(borrowerAddress);

  return (
    <section className={s.section}>
      <h2 className={s.title}>
        {isWiderThanMphone ? (
          "Step 1 — Repay Borrow"
        ) : (
          <>
            Step 1<span className={s.subtitle}>Repay Borrow</span>
          </>
        )}
      </h2>
      <div className={s.description}>
        Choose in which asset you will repay the debt. Keep in mind that the
        amount of debt in different assets may be different, so the amount of
        collateral you receive also be different.
      </div>
      <RepayBorrow
        data={data ? data.borrowedAssets : [0, 1]}
        loading={loading}
      />
    </section>
  );
};
