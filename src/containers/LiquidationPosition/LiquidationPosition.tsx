import React from 'react';

import { useWiderThanMphone } from 'utils/getMediaQuery';
import { getPrettyAmount } from 'utils/getPrettyAmount';
import { Input } from 'components/ui/Input';
import { Button } from 'components/ui/Button';
import { Heading } from 'components/common/Heading';
import { RepayBorrow } from 'components/tables/containers/RepayBorrow';
import { ReceiveCollateral } from 'components/tables/containers/ReceiveCollateral';
import { REPAY_BORROW_DATA } from 'components/temp-data/tables/repay-borrow';
import { RECEIVE_COLLATERAL_DATA } from 'components/temp-data/tables/receive-collateral';

import s from './LiquidationPosition.module.sass';

export const LiquidationPosition: React.FC = () => {
  const isWiderThanMphone = useWiderThanMphone();

  const ASSET_FROM_STEP_1 = 'XTZ';
  const ASSET_FROM_STEP_2 = 'SMAK';

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
        <RepayBorrow data={REPAY_BORROW_DATA} />
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
        <ReceiveCollateral data={RECEIVE_COLLATERAL_DATA} />
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
        <div className={s.description}>
          Now you can liquidate the debtor.
          Be aware that the amount to be liquidated cannot exceed the MAX Liquidate of the debt.
        </div>
        <Heading
          title={
            isWiderThanMphone
              ? `Amount to close in ${ASSET_FROM_STEP_1}:`
              : 'Amount to close:'
          }
          className={s.heading}
        />
        <div className={s.liquidateWrapper}>
          <div className={s.inputWrapper}>
            <Input
              inputClassName={s.input}
            />
            <Button
              className={s.button}
            >
              Liquidate
            </Button>
          </div>

          <div className={s.recieveInfo}>
            <div className={s.recieveColumn}>
              <div className={s.recieveTitle}>
                You will receive:
              </div>

              <div className={s.recieveValue}>
                {getPrettyAmount({ value: 802.12, currency: ASSET_FROM_STEP_2 })}
                {' '}
                {`(${getPrettyAmount({ value: 2141.70, currency: '$' })})`}
              </div>
            </div>

            <div className={s.recieveColumn}>
              <div className={s.recieveTitle}>
                Health factor of borrower after liquidation:
              </div>

              <div className={s.recieveValue}>
                {getPrettyAmount({ value: 0.86 })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
