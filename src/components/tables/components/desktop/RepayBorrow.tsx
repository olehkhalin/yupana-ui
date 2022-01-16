import React, { useMemo, useState } from 'react';
import { Row } from 'react-table';

import { TokenMetadataInterface } from 'types/token';
import { getTokenSlug, getSliceTokenName } from 'utils/helpers/token';
import { getPrettyAmount } from 'utils/helpers/amount';
import { Table } from 'components/ui/Table';
import { Radio } from 'components/ui/Radio';
import { TokenName } from 'components/common/TokenName';

import s from './Tables.module.sass';

type RepayBorrowProps = {
  data: any[]
  loading: boolean
  className?: string
};

export const RepayBorrow: React.FC<RepayBorrowProps> = ({
  data,
  loading,
  className,
}) => {
  const [selectedItem, setSelectedItem] = useState<TokenMetadataInterface | undefined>(undefined);

  const columns = useMemo(
    () => [
      {
        Header: 'Asset',
        accessor: 'asset',
        Cell: ({ row }: { row: Row }) => {
          const isRadioButtonActive = selectedItem && !loading
            ? getTokenSlug(row.values.asset) === getTokenSlug({
              address: selectedItem.address,
              id: selectedItem.id,
            })
            : false;
          return (
            <>
              <Radio
                active={isRadioButtonActive}
                theme="secondary"
                disabled={loading}
                className={s.radio}
              />
              <TokenName
                token={{ ...row.values.asset }}
                theme="secondary"
                loading={loading}
              />
            </>
          );
        },
      },
      {
        Header: () => (
          <span className={s.yellow}>
            Price of borrowed asset
          </span>
        ),
        id: 'priceOfBorrowedAsset',
        accessor: ({ priceOfBorrowedAsset }: { priceOfBorrowedAsset: number }) => (
          loading
            ? priceOfBorrowedAsset
            : `${priceOfBorrowedAsset.toFixed(2)}%`
        ),
      },
      {
        Header: () => (
          <span className={s.yellow}>
            Amount of debt
          </span>
        ),
        id: 'amountOfDebt',
        accessor: ({ amountOfDebt, amountOfDebtUsd, asset }: any) => (
          <div>
            <div className={s.amount}>
              {
                loading
                  ? amountOfDebt
                  : getPrettyAmount({
                    value: amountOfDebt,
                    currency: getSliceTokenName(asset),
                  })
              }
            </div>
            <div className={s.amountUsd}>
              {
                loading
                  ? amountOfDebtUsd
                  : getPrettyAmount({
                    value: amountOfDebtUsd,
                    currency: '$',
                  })
              }
            </div>
          </div>
        ),
      },
      {
        Header: () => (
          <span className={s.yellow}>
            MAX Liquidate
          </span>
        ),
        id: 'maxLiquidate',
        accessor: ({ maxLiquidate, maxLiquidateUsd, asset }: any) => (
          <div>
            <div className={s.amount}>
              {
                loading
                  ? maxLiquidate
                  : getPrettyAmount({
                    value: maxLiquidate,
                    currency: getSliceTokenName(asset),
                  })
              }
            </div>
            <div className={s.amountUsd}>
              {
                loading
                  ? maxLiquidateUsd
                  : getPrettyAmount({
                    value: maxLiquidateUsd,
                    currency: '$',
                  })
              }
            </div>
          </div>
        ),
      },
    ],
    [selectedItem, loading],
  );

  return (
    <Table
      theme="octonary"
      preloaderTheme="secondary"
      columns={columns}
      data={data}
      loading={loading}
      setSelectedItem={setSelectedItem}
      selectedItem={selectedItem}
      rowClassName={s.repayRow}
      theadClassName={s.repayThead}
      className={className}
    />
  );
};
