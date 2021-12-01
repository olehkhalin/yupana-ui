import React, { useMemo } from 'react';
import cx from 'classnames';
import BigNumber from 'bignumber.js';

import { getPreparedTokenObject } from 'utils/getPreparedTokenObject';
import { useWiderThanMdesktop } from 'utils/getMediaQuery';
import { getPreparedPercentValue } from 'utils/getPreparedPercentValue';
import {
  Asset,
  LendingAssetsQuery,
  useLendingAssetsQuery,
} from 'generated/graphql';
import { Section } from 'components/common/Section';
import { SupplyAssets } from 'components/tables/containers/SupplyAssets';
import { BorrowAssets } from 'components/tables/containers/BorrowAssets';

import s from './Assets.module.sass';

type AssetsWrapperProps = {
  isSupply?: boolean
  data?: LendingAssetsQuery
};

const AssetsWrapper: React.FC<AssetsWrapperProps> = ({
  isSupply = true,
  data,
}) => {
  const preparedData = useMemo(() => (data ? data.asset.map((el) => {
    const asset = getPreparedTokenObject(el as Asset);

    const supplyApy = getPreparedPercentValue(el as Asset, 'supply_apy');
    const collateralFactor = new BigNumber(el.collateralFactor).div(1e18).multipliedBy(1e2);
    const borrowApy = getPreparedPercentValue(el as Asset, 'borrow_apy');
    const utilisationRate = getPreparedPercentValue(el as Asset, 'utilization_rate');
    const liquidity = new BigNumber(el.totalLiquid).div(1e18);
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

  if (isSupply) {
    return (
      <SupplyAssets
        data={preparedData}
        className={s.table}
      />
    );
  }

  return (
    <BorrowAssets data={preparedData} className={s.table} />
  );
};

type AssetsProps = {
  isActiveSupply: boolean
  className?: string
};

export const Assets: React.FC<AssetsProps> = ({
  isActiveSupply = true,
  className,
}) => {
  const isWiderThanMdesktop = useWiderThanMdesktop();

  const { data, error } = useLendingAssetsQuery();

  if (error) {
    return <></>;
  }

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
        <AssetsWrapper data={data} />
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
        <AssetsWrapper data={data} isSupply={false} />
      </Section>
    </div>
  );
};
