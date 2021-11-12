import React, { useMemo } from 'react';

import { getSliceTokenName } from 'utils/getSliceTokenName';
import { getPrettyAmount } from 'utils/getPrettyAmount';
import { Radio } from 'components/ui/Radio';
import { Table } from 'components/ui/Table';
import { TokenName } from 'components/common/TokenName';

import s from './Tables.module.sass';

type ReceiveCollateralProps = {
  data: any[]
  className?: string
};

export const ReceiveCollateral: React.FC<ReceiveCollateralProps> = ({
  data,
  className,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: () => (
          <span className={s.blue}>
            Receive asset
          </span>
        ),
        id: 'asset',
        accessor: (row: any) => (
          <>
            <Radio
              className={s.radio}
            />
            <TokenName
              token={{ ...row.asset }}
            />
          </>
        ),
      },
      {
        Header: () => (
          <span className={s.blue}>
            Price of receive asset
          </span>
        ),
        id: 'priceOfReceiveAsset',
        accessor: ({ priceOfReceiveAsset }: any) => `${getPrettyAmount({ value: priceOfReceiveAsset, currency: '$' })}`,
      },
      {
        Header: () => (
          <span className={s.blue}>
            Amount of supplied
          </span>
        ),
        id: 'amountOfSupplied',
        accessor: ({ amountOfSupplied, amountOfSuppliedUsd, asset }: any) => (
          <div>
            <div className={s.amount}>
              {getPrettyAmount({
                value: amountOfSupplied,
                currency: getSliceTokenName(asset),
              })}
            </div>
            <div className={s.amountUsd}>
              {getPrettyAmount({
                value: amountOfSuppliedUsd,
                currency: '$',
              })}
            </div>
          </div>
        ),
      },
      {
        Header: () => (
          <span className={s.blue}>
            MAX Bonus
          </span>
        ),
        id: 'maxBonus',
        accessor: ({ maxBonus, maxBonusUsd, asset }: any) => (
          <div>
            <div className={s.amount}>
              {getPrettyAmount({
                value: maxBonus,
                currency: getSliceTokenName(asset),
              })}
            </div>
            <div className={s.amountUsd}>
              {getPrettyAmount({
                value: maxBonusUsd,
                currency: '$',
              })}
            </div>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <Table
      theme="quinary"
      columns={columns}
      data={data}
      rowClassName={s.repayRow}
      theadClassName={s.repayThead}
      className={className}
    />
  );
};
