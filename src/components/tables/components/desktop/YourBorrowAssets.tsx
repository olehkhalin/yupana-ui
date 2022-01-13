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
import { BorrowTableDropdown } from 'components/common/TableDropdown';
import { TokenName } from 'components/common/TokenName';
import { DropdownArrow } from 'components/common/DropdownArrow';

import s from './Tables.module.sass';

type YourBorrowAssetsProps = {
  data: any[]
  className?: string
};

export const YourBorrowAssets: React.FC<YourBorrowAssetsProps> = ({
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
        Header: 'Balance',
        id: 'balance',
        accessor: (
          { wallet, asset }: { wallet: number | BigNumber, asset: TokenMetadataInterface },
        ) => (asset && wallet ? getPrettyAmount({
          value: convertUnits(wallet ?? new BigNumber(0), asset.decimals),
          currency: getSliceTokenName(asset),
          dec: asset.decimals,
        }) : 0),
      },
      {
        Header: 'Borrow limit',
        id: 'borrowLimit',
        accessor: (
          { borrowLimit, asset }: { borrowLimit: number, asset: TokenMetadataInterface },
        ) => asset && getPrettyAmount({
          value: convertUnits(borrowLimit, asset.decimals),
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
      rowClassName={s.ownAssetsRow}
      className={className}
    />
  );
};
