import React from 'react';
import {
  useTable,
  useExpanded,
} from 'react-table';
import cx from 'classnames';

import { TokenMetadataInterface } from 'types/token';
import { getTokenSlug } from 'utils/getTokenSlug';

import s from './Table.module.sass';

type TableProps = {
  columns: any
  data: any[]
  renderRowSubComponent?: any
  theme?: keyof typeof themeClasses
  selectedItem?: TokenMetadataInterface
  setSelectedItem?: (arg: TokenMetadataInterface) => void
  tableClassName?: string
  rowClassName?: string
  theadClassName?: string
  className?: string
};

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
  tertiary: s.tertiary,
  octonary: s.octonary,
  quinary: s.quinary,
};

export const Table: React.FC<TableProps> = ({
  columns: userColumns,
  data,
  renderRowSubComponent,
  theme = 'primary',
  selectedItem,
  setSelectedItem,
  tableClassName,
  rowClassName,
  theadClassName,
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

  const handleSelectItem = (asset: TokenMetadataInterface) => {
    if (setSelectedItem) {
      setSelectedItem(asset);
    }
  };

  const compoundClassNames = cx(
    s.root,
    themeClasses[theme],
    className,
  );

  return (
    <div className={compoundClassNames}>
      <table {...getTableProps()} className={cx(s.table, tableClassName)}>
        <thead className={cx(s.thead, theadClassName)}>
          {headerGroups.map((headerGroup) => (
            <tr
              key={headerGroup.getHeaderGroupProps().key}
              className={cx(s.tr, rowClassName)}
            >
              {headerGroup.headers.map((column) => (
                <th key={column.getHeaderProps().key} className={s.th}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className={s.tbody}>
          {!data.length ? (
            <tr className={cx(s.tr, s.noAssets, rowClassName)}>
              <td>
                {`You have no ${theme === 'primary' ? 'supplied' : 'borrowed'} assets`}
              </td>
            </tr>
          ) : rows.map((row) => {
            prepareRow(row);

            let isSelected: boolean = false;
            if (selectedItem) {
              isSelected = getTokenSlug(selectedItem) === getTokenSlug(row.values.asset);
            }
            return (
              <React.Fragment key={row.getRowProps().key}>
                <tr
                  {...row.getRowProps()}
                  onClick={() => handleSelectItem(row.values.asset)}
                  className={cx(
                    s.tr,
                    s.trBody,
                    { [s.selected]: isSelected },
                    rowClassName,
                  )}
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} key={cell.getCellProps().key} className={s.td}>{cell.render('Cell')}</td>
                  ))}
                </tr>
                {row.isExpanded ? (
                  <tr {...row.getRowProps()} key={`${row.getRowProps().key}-inner`} className={s.subTr}>
                    <td colSpan={visibleColumns.length} className={s.dropdownTd}>
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
