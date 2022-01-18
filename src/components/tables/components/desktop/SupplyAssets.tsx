import React, { useMemo } from 'react';
import { Row } from 'react-table';
import cx from 'classnames';

import { STANDARD_PRECISION } from 'constants/default';
import { getSliceTokenName } from 'utils/helpers/token';
import {
  convertUnits,
  getPrettyAmount,
  getPrettyPercent,
} from 'utils/helpers/amount';
import { Table } from 'components/ui/Table';
import { SupplyTableDropdown } from 'components/common/TableDropdown';
import { TokenName } from 'components/common/TokenName';
import { DropdownArrow } from 'components/common/DropdownArrow';

import s from './Tables.module.sass';

type SupplyAssetsProps = {
  data: any[]
  loading: boolean
  className?: string
};

export const SupplyAssets: React.FC<SupplyAssetsProps> = ({
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
            theme="primary"
            loading={loading}
            token={{ ...row.values.asset }}
            {...row.getToggleRowExpandedProps()}
          />
        ),
      },
      {
        Header: 'Supply APY',
        id: 'supplyApy',
        accessor: ({ supplyApy }: any) => (
          loading ? supplyApy : getPrettyPercent(supplyApy)
        ),
      },
      {
        Header: 'Collateral Factor',
        id: 'collateralFactor',
        accessor: ({ collateralFactor }: any) => (
          loading ? collateralFactor : getPrettyPercent(
            convertUnits(
              collateralFactor,
              STANDARD_PRECISION,
            ).multipliedBy(1e2),
          )
        ),
      },
      {
        Header: 'Wallet',
        id: 'wallet',
        accessor: ({ wallet, asset }: any) => (
          loading
            ? wallet
            : getPrettyAmount({
              value: convertUnits(wallet, asset.decimals),
              currency: getSliceTokenName(asset),
              dec: asset.decimals,
            })
        ),
      },
      {
        Header: () => null,
        id: 'expander',
        Cell: ({ row }: { row: Row }) => (
          <DropdownArrow
            loading={loading}
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
          yToken, asset, supplied, wallet, collateralFactor,
        },
      },
    }: Row) => (
      <SupplyTableDropdown
        yToken={yToken}
        asset={asset}
        supplied={supplied}
        wallet={wallet}
        collateralFactor={collateralFactor}
      />
    ),
    [],
  );

  return (
    <Table
      columns={columns}
      data={data}
      isMaxContentPreloader
      loading={loading}
      renderRowSubComponent={renderRowSubComponent}
      rowClassName={s.supplyRow}
      className={cx(s.root, className)}
    />
  );
};
