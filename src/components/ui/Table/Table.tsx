import React from 'react';
import {
  useTable,
  useExpanded,
} from 'react-table';
import cx from 'classnames';

import { getUniqueKey } from 'utils/getUniqueKey';

import s from './Table.module.sass';

type TableProps = {
  columns: any
  data: any[]
  renderRowSubComponent?: any
  theme?: keyof typeof themeClasses
  type?: keyof typeof typeClasses
  className?: string
};

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

const typeClasses = {
  default: s.default,
  markets: s.markets,
};

export const Table: React.FC<TableProps> = ({
  columns: userColumns,
  data,
  renderRowSubComponent,
  theme = 'primary',
  type = 'default',
  className,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
  } = useTable(
    {
      columns: userColumns,
      data,
    },
    useExpanded,
  );

  const compoundClassNames = cx(
    s.root,
    themeClasses[theme],
    typeClasses[type],
    className,
  );

  return (
    <div className={compoundClassNames}>
      <table {...getTableProps()} className={s.table}>
        <thead className={s.thead}>
          {headerGroups.map((headerGroup) => (
            <tr key={getUniqueKey()} className={s.trTitle}>
              {headerGroup.headers.map((column) => (
                <th key={getUniqueKey()} className={s.th}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className={s.tbody}>
          {!data.length ? (
            <tr className={s.noAssets}>
              <td>
                {`You have no ${theme === 'primary' ? 'supplied' : 'borrowed'} assets`}
              </td>
            </tr>
          ) : rows.map((row) => {
            prepareRow(row);
            return (
              <React.Fragment key={getUniqueKey()}>
                <tr {...row.getRowProps()} className={s.trBody}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} key={getUniqueKey()} className={s.td}>{cell.render('Cell')}</td>
                  ))}
                </tr>
                {row.isExpanded ? (
                  <tr {...row.getRowProps()} className={s.subTr}>
                    <td colSpan={visibleColumns.length}>
                      {renderRowSubComponent({ row })}
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
