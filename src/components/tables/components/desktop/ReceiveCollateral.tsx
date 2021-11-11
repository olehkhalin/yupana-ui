import React, { useMemo } from 'react';

import { getSliceTokenName } from 'utils/getSliceTokenName';
import { getPrettyAmount } from 'utils/getPrettyAmount';
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
        Header: 'Receive asset',
        id: 'receiveAsset',
        accessor: (row: any) => (
          <TokenName
            token={{ ...row.receiveAsset }}
          />
        ),
      },
      {
        Header: 'Price of receive asset',
        id: 'priceOfReceiveAsset',
        accessor: ({ priceOfReceiveAsset }: any) => `${getPrettyAmount({ value: priceOfReceiveAsset, currency: '$' })}`,
      },
      {
        Header: 'Amount of supplied',
        id: 'amountOfSupplied',
        accessor: ({ amountOfSupplied, amountOfSuppliedUsd, receiveAsset }: any) => (
          <div>
            <div className={s.amount}>
              {getPrettyAmount({
                value: amountOfSupplied,
                currency: getSliceTokenName(receiveAsset),
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
        Header: 'MAX Bonus',
        id: 'maxBonus',
        accessor: ({ maxBonus, maxBonusUsd, receiveAsset }: any) => (
          <div>
            <div className={s.amount}>
              {getPrettyAmount({
                value: maxBonus,
                currency: getSliceTokenName(receiveAsset),
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
