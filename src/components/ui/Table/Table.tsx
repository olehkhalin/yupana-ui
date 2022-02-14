import React, { FC, Fragment, useEffect } from "react";
import { useTable, useExpanded, usePagination } from "react-table";
import cx from "classnames";

import { LIQUIDATION_POSITIONS_ITEMS_PER_PAGE } from "constants/defaults";
import { Preloader } from "components/ui/Preloader";

import { Pagination } from "./Pagination";
import s from "./Table.module.sass";

type TableProps = {
  columns: any;
  data: any[];
  loading?: boolean;
  emptyText?: string;
  theme?: keyof typeof themeClasses;
  tableClassName?: string;
  rowClassName?: string;
  theadClassName?: string;
  className?: string;
  // Expanded row
  renderRowSubComponent?: any;
  // Pagination
  isPaginated?: boolean;
  pageSize?: number;
  pageCount?: number;
  setOffset?: (arg: number) => void;
  // Row selection
  selectedItem?: number;
  setSelectedItem?: (arg: number) => void;
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
  // Expanded
  renderRowSubComponent,
  // Pagination
  isPaginated = false,
  pageSize,
  pageCount = 1,
  setOffset,
  // Row selection
  selectedItem,
  setSelectedItem,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    visibleColumns,
    // Pagination
    state: { pageIndex },
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    gotoPage,
  } = useTable(
    {
      columns,
      data,
      // Expanded
      autoResetExpanded: false,
      // Pagination
      initialState: {
        pageIndex: 0,
        pageSize: pageSize || LIQUIDATION_POSITIONS_ITEMS_PER_PAGE,
      },
      pageCount: Math.ceil(
        pageCount / (pageSize || LIQUIDATION_POSITIONS_ITEMS_PER_PAGE)
      ),
      manualPagination: true,
      autoResetPage: false,
    },
    useExpanded,
    usePagination
  );

  const preparePageCount = Math.ceil(
    pageCount / (pageSize || LIQUIDATION_POSITIONS_ITEMS_PER_PAGE)
  );

  const handleSelectItem = (asset: number) => {
    if (!!setSelectedItem) {
      setSelectedItem(asset);
    }
  };

  useEffect(() => {
    if (setOffset) {
      const offset =
        pageIndex === 0
          ? pageIndex
          : pageIndex * (pageSize || LIQUIDATION_POSITIONS_ITEMS_PER_PAGE);
      setOffset(offset);
    }
  }, [pageIndex, pageSize, setOffset]);

  const compoundClassNames = cx(s.root, themeClasses[theme], className);

  if ((!data || data.length === 0) && !loading && !emptyText) {
    return <></>;
  }

  return (
    <>
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

                  let isSelected = false;
                  if (selectedItem !== undefined && !loading) {
                    isSelected = selectedItem == row.values.yToken.yToken;
                  }

                  return (
                    <Fragment key={row.getRowProps().key}>
                      <tr
                        {...row.getRowProps()}
                        onClick={() =>
                          !!setSelectedItem &&
                          handleSelectItem(row.values.yToken.yToken)
                        }
                        className={cx(
                          s.tr,
                          s.trBody,
                          { [s.selected]: isSelected && !loading },
                          rowClassName
                        )}
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
      {!loading && preparePageCount > 1 && isPaginated && (
        <Pagination
          pageIndex={pageIndex}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageCount={preparePageCount}
          nextPage={nextPage}
          previousPage={previousPage}
          gotoPage={gotoPage}
          setOffset={setOffset}
          className={s.pagination}
        />
      )}
    </>
  );
};
