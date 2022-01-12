import React from 'react';

import { LiquidateStep } from 'containers/Liquidate';
import { BorrowAsset, SupplyAsset } from 'types/liquidate';
import { useWiderThanMphone } from 'utils/helpers';
import { RepayBorrow } from 'components/tables/containers/RepayBorrow';
import { ReceiveCollateral } from 'components/tables/containers/ReceiveCollateral';

import s from './LiquidationSteps.module.sass';
import { LiquidationForm } from './LiquidationForm';

type LiquidationStepsProps = {
  data: {
    borrowedAssets: BorrowAsset[]
    collateralAssets: SupplyAsset[]
    liquidate: LiquidateStep | null
  }
};

export const LiquidationSteps: React.FC<LiquidationStepsProps> = ({
  data: {
    borrowedAssets,
    collateralAssets,
    liquidate,
  },
}) => {
  const isWiderThanMphone = useWiderThanMphone();

  return (
    <>
      <section className={s.section}>
        <h2 className={s.title}>
          {isWiderThanMphone
            ? 'Step 1 — Repay Borrow'
            : (
              <>
                Step 1
                <span className={s.subtitle}>
                  Repay Borrow
                </span>
              </>
            )}
        </h2>
        <div className={s.description}>
          Choose in which asset you will repay the debt.
          Keep in mind that the amount of debt in different assets may be different,
          so the amount of collateral you receive also be different.
        </div>
        <RepayBorrow data={borrowedAssets} />
      </section>

      <section className={s.section}>
        <h2 className={s.title}>
          {isWiderThanMphone
            ? 'Step 2 — Receive Collateral'
            : (
              <>
                Step 2
                <span className={s.subtitle}>
                  Receive Collateral
                </span>
              </>
            )}
        </h2>
        <div className={s.description}>
          Choose which collateral asset you will receive after liquidation.
          Remember that the percentage of the liquidation bonus depends on your choice,
          and also the amount of the chosen collateral asset must cover the debt and the bonus.
        </div>
        <ReceiveCollateral data={collateralAssets} />
      </section>
      <section className={s.section}>
        <h2 className={s.title}>
          {isWiderThanMphone
            ? 'Step 3 — Liquidate debt address'
            : (
              <>
                Step 3
                <span className={s.subtitle}>
                  Liquidate debt address
                </span>
              </>
            )}
        </h2>
        <LiquidationForm data={liquidate} />
      </section>
    </>
  );
};
