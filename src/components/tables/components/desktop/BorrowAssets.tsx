import React, { useMemo } from 'react';
import { Row } from 'react-table';

import { getSliceTokenName } from 'utils/helpers/token';
import {
  getPrettyAmount,
  getPrettyPercent,
} from 'utils/helpers/amount';
import { Table } from 'components/ui/Table';
import { TokenName } from 'components/common/TokenName';
import { DropdownArrow } from 'components/common/DropdownArrow';
import { BorrowTableDropdown } from 'components/common/TableDropdown';

import s from './Tables.module.sass';

type BorrowAssetsProps = {
  data: any[]
  loading: boolean
  className?: string
};

export const BorrowAssets: React.FC<BorrowAssetsProps> = ({
  data,
  loading,
  className,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Asset',
        accessor: 'asset',
        Cell: ({ row }: { row: Row }) => (
          <TokenName
            theme="secondary"
            token={{ ...row.values.asset }}
            loading={loading}
            {...row.getToggleRowExpandedProps()}
          />
        ),
      },
      {
        Header: 'Borrow APY',
        id: 'borrowApy',
        accessor: ({ borrowApy }: any) => (
          loading ? borrowApy : getPrettyPercent(borrowApy)
        ),
      },
      {
        Header: 'Utilisation rate',
        id: 'utilisationRate',
        accessor: ({ utilisationRate }: any) => (
          loading ? utilisationRate : getPrettyPercent(utilisationRate)
        ),
      },
      {
        Header: 'Liquidity',
        id: 'liquidity',
        accessor: ({ liquidity, asset }: any) => (
          loading
            ? liquidity
            : `${getPrettyAmount({ value: liquidity, currency: getSliceTokenName(asset), dec: asset.decimals })}`
        ),
      },
      {
        Header: () => null,
        id: 'expander',
        Cell: ({ row }: { row: Row }) => (
          <DropdownArrow
            loading={loading}
            theme="secondary"
            active={row.isExpanded}
            className={s.icon}
            {...row.getToggleRowExpandedProps()}
          />
        ),
      },
    ],
    [loading],
  );

  const renderRowSubComponent = React.useCallback(
    ({
      // @ts-ignore
      row: {
        original: {
          yToken, asset, borrowed,
        },
      },
    }: Row) => (
      <BorrowTableDropdown
        theme="secondary"
        yToken={yToken}
        asset={asset}
        borrowed={borrowed}
      />
    ),
    [],
  );

  return (
    <Table
      theme="secondary"
      preloaderTheme="secondary"
      isMaxContentPreloader
      columns={columns}
      data={data}
      loading={loading}
      renderRowSubComponent={renderRowSubComponent}
      rowClassName={s.borrowRow}
      className={className}
    />
  );
};
