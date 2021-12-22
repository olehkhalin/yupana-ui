import React, { useMemo } from 'react';
import { Row } from 'react-table';
import BigNumber from 'bignumber.js';

import { TokenMetadataInterface } from 'types/token';
import { getSliceTokenName } from 'utils/helpers/token';
import {
  convertUnits,
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
  className?: string
};

export const BorrowAssets: React.FC<BorrowAssetsProps> = ({
  data,
  className,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Asset',
        accessor: 'asset',
        Cell: ({ row }: { row: Row }) => (
          <TokenName
            token={{ ...row.values.asset }}
            {...row.getToggleRowExpandedProps()}
          />
        ),
      },
      {
        Header: 'Borrow APY',
        id: 'borrowApy',
        accessor: ({ borrowApy }: { borrowApy: number }) => (
          getPrettyPercent(borrowApy)
        ),
      },
      {
        Header: 'Utilisation rate',
        id: 'utilisationRate',
        accessor: ({ utilisationRate }: { utilisationRate: number }) => (
          getPrettyPercent(utilisationRate)
        ),
      },
      {
        Header: 'Liquidity',
        id: 'liquidity',
        accessor: (
          { liquidity, asset }: { liquidity: number | BigNumber, asset: TokenMetadataInterface },
        ) => getPrettyAmount({
          value: convertUnits(liquidity, asset.decimals),
          currency: getSliceTokenName(asset),
          dec: asset.decimals,
        }),
      },
      {
        Header: () => null,
        id: 'expander',
        Cell: ({ row }: { row: Row }) => (
          <DropdownArrow
            theme="secondary"
            active={row.isExpanded}
            className={s.icon}
            {...row.getToggleRowExpandedProps()}
          />
        ),
      },
    ],
    [],
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
      columns={columns}
      data={data}
      renderRowSubComponent={renderRowSubComponent}
      rowClassName={s.borrowRow}
      className={className}
    />
  );
};
