import React, { useMemo } from 'react';
import cx from 'classnames';

import { getPreparedTokenObject } from 'utils/getPreparedTokenObject';
import { useWiderThanMdesktop } from 'utils/getMediaQuery';
import { getPreparedPercentValue } from 'utils/getPreparedPercentValue';
import { Section } from 'components/common/Section';
import { SupplyAssets } from 'components/tables/containers/SupplyAssets';
import { BorrowAssets } from 'components/tables/containers/BorrowAssets';

import { Token, useHomeQueryQuery } from '../../graphql';

import s from './Assets.module.sass';

type AssetsProps = {
  isActiveSupply: boolean
  className?: string
};

export const Assets: React.FC<AssetsProps> = ({
  isActiveSupply = true,
  className,
}) => {
  const isWiderThanMdesktop = useWiderThanMdesktop();

  const { data, error } = useHomeQueryQuery();

  if (error) {
    console.log('error', error);
  }

  const preparedData = useMemo(() => (data ? data.token.map((el) => {
    const asset = getPreparedTokenObject(el as Token);

    const supplyApy = getPreparedPercentValue(el as Token, 'supply_apy');
    const collateralFactor = +el.asset.collateralFactor * 100;
    const borrowApy = getPreparedPercentValue(el as Token, 'borrow_apy');
    const utilisationRate = getPreparedPercentValue(el as Token, 'utilization_rate');
    const liquidity = +el.asset.totalLiquid;
    const wallet = 0; // TODO: Change to get from contract

    return {
      asset,
      supplyApy,
      collateralFactor,
      borrowApy,
      utilisationRate,
      liquidity,
      wallet,
    };
  }) : []), [data]);

  return (
    <div className={cx(s.root, className)}>
      <Section
        title="Supply assets"
        link={{
          label: 'docks: suppling assets',
          link: '/',
        }}
        className={cx(s.col, { [s.show]: isActiveSupply && !isWiderThanMdesktop })}
      >
        <SupplyAssets
          data={preparedData}
          className={s.table}
        />
      </Section>

      <Section
        title="Borrow assets"
        link={{
          label: 'docs: borrowing assets',
          link: '/',
        }}
        theme="secondary"
        className={cx(s.col, { [s.show]: !isActiveSupply && !isWiderThanMdesktop })}
      >
        <BorrowAssets
          data={preparedData}
          className={s.table}
        />
      </Section>
    </div>
  );
};
