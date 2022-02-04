import React, { FC, Fragment } from "react";
import { useTable, useExpanded } from "react-table";
import cx from "classnames";

import { Preloader } from "components/ui/Preloader";

import s from "./Table.module.sass";

type TableProps = {
  columns: any;
  data: any[];
  loading?: boolean;
  emptyText: string;
  theme?: keyof typeof themeClasses;
  tableClassName?: string;
  rowClassName?: string;
  theadClassName?: string;
  className?: string;
  // Expanded row
  renderRowSubComponent?: any;
};

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
  tertiary: s.tertiary,
  octonary: s.octonary,
  quinary: s.quinary,
};

export const Table: FC<TableProps> = ({
  columns,
  data,
  loading,
  emptyText,
  theme = "primary",
  tableClassName,
  rowClassName,
  theadClassName,
  className,
  renderRowSubComponent,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    visibleColumns,
  } = useTable(
    {
      columns,
      data: data,
      autoResetExpanded: false,
    },
    useExpanded
  );

  const compoundClassNames = cx(s.root, themeClasses[theme], className);

  return (
    <div className={cx(compoundClassNames)}>
      {loading && <Preloader theme={theme} className={s.preloader} />}
      <div className={s.wrapper}>
        <table {...getTableProps()} className={cx(s.table, tableClassName)}>
          <thead className={cx(s.thead, theadClassName)}>
            {headerGroups.map((headerGroup) => (
              <tr
                key={headerGroup.getHeaderGroupProps().key}
                className={cx(s.tr, rowClassName)}
              >
                {headerGroup.headers.map((column) => (
                  <th key={column.getHeaderProps().key} className={s.th}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className={s.tbody}>
            {(!data || data.length === 0) && !loading ? (
              <tr className={cx(s.tr, s.noAssets, rowClassName)}>
                <td>{emptyText}</td>
              </tr>
            ) : (
              rows.map((row) => {
                prepareRow(row);

                return (
                  <Fragment key={row.getRowProps().key}>
                    <tr
                      {...row.getRowProps()}
                      className={cx(s.tr, s.trBody, rowClassName)}
                    >
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          key={cell.getCellProps().key}
                          className={s.td}
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                    {row.isExpanded ? (
                      <tr
                        {...row.getRowProps()}
                        key={`${row.getRowProps().key}-inner`}
                        className={s.subTr}
                      >
                        <td
                          colSpan={visibleColumns.length}
                          className={s.dropdownTd}
                        >
                          {renderRowSubComponent({ row })}
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
