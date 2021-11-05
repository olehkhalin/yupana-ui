import React, { useMemo } from 'react';
import { Row } from 'react-table';

import { Table } from 'components/ui/Table';
import { TableDropdown } from 'components/common/TableDropdown';
import { TokenName } from 'components/common/TokenName';
import { DropdownArrow } from 'components/common/DropdownArrow';

import s from './YourBorrowAssets.module.sass';

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
        id: 'asset',
        accessor: (row: any) => (
          <TokenName
            token={{ ...row.asset }}
          />
        ),
      },
      {
        Header: 'Borrow APY',
        accessor: 'borrowApy',
      },
      {
        Header: 'Balace',
        accessor: 'balance',
      },
      {
        Header: 'Borrow limit',
        accessor: 'borrowLimit',
      },
      {
        Header: () => null,
        id: 'expander',
        Cell: ({ row }: { row: Row }) => (
          <DropdownArrow
            theme="borrow"
            active={row.isExpanded}
            className={s.icon}
            {...row.getToggleRowExpandedProps()}
          />
        ),
      },
    ],
    [],
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
      renderRowSubComponent={renderRowSubComponent}
      rowClassName={s.row}
      className={className}
    />
  );
};
