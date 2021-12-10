import React, { useMemo } from 'react';
import { Row } from 'react-table';

import { getSliceTokenName } from 'utils/getSliceTokenName';
import { getPrettyAmount } from 'utils/getPrettyAmount';
import { getPrettyPercent } from 'utils/getPrettyPercent';
import { Table } from 'components/ui/Table';
import { TableDropdown } from 'components/common/TableDropdown';
import { TokenName } from 'components/common/TokenName';
import { DropdownArrow } from 'components/common/DropdownArrow';
import { AssetsType } from 'containers/Assets';

import s from './Tables.module.sass';

type BorrowAssetsProps = {
  data: AssetsType[]
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
        accessor: ({ borrowApy }: AssetsType) => (
          loading ? borrowApy : getPrettyPercent(borrowApy)
        ),
      },
      {
        Header: 'Utilisation rate',
        id: 'utilisationRate',
        accessor: ({ utilisationRate }: AssetsType) => (
          loading ? utilisationRate : getPrettyPercent(utilisationRate)
        ),
      },
      {
        Header: 'Liquidity',
        id: 'liquidity',
        accessor: ({ liquidity, asset }: AssetsType) => (
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

  // Create a function that will render our row sub components
  const renderRowSubComponent = React.useCallback(
    () => (
      <TableDropdown theme="secondary" />
    ),
    [],
  );

  return (
    <Table
      theme="secondary"
      columns={columns}
      data={data}
      loading={loading}
      renderRowSubComponent={renderRowSubComponent}
      rowClassName={s.borrowRow}
      className={className}
    />
  );
};
