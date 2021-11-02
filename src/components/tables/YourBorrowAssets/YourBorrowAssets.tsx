import React, { useMemo } from 'react';
import { Row } from 'react-table';

import { Table } from 'components/ui/Table';
import { Button } from 'components/ui/Button';
import { TableDropdown } from 'components/common/TableDropdown';
import { ReactComponent as DropdownArrow } from 'svg/DropdownArrow.svg';

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
        accessor: 'asset',
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
          <Button
            theme="clear"
            className={s.icon}
            {...row.getToggleRowExpandedProps()}
          >
            <DropdownArrow />
          </Button>
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
      className={className}
    />
  );
};
