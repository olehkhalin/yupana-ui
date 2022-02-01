import React from "react";
import { useTable } from "react-table";
import cx from "classnames";

import { Preloader } from "components/ui/Preloader";

import s from "./Table.module.sass";

type TableProps = {
  columns: any;
  data?: any[];
  loading?: boolean;
  emptyText: string;
  theme?: keyof typeof themeClasses;
  tableClassName?: string;
  rowClassName?: string;
  theadClassName?: string;
  className?: string;
};

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
  tertiary: s.tertiary,
  octonary: s.octonary,
  quinary: s.quinary,
};

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  loading,
  emptyText,
  theme = "primary",
  tableClassName,
  rowClassName,
  theadClassName,
  className,
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable({
      columns,
      data: data ?? [0, 1, 2],
    });

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
                  <tr
                    {...row.getRowProps()}
                    key={row.getRowProps().key}
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
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
