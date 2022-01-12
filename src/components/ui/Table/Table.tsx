import React, { useEffect } from 'react';
import {
  useTable,
  useExpanded,
  usePagination,
} from 'react-table';
import animateScrollTo from 'animated-scroll-to';
import cx from 'classnames';

import { YToken } from 'types/liquidate';
import { TokenMetadataInterface } from 'types/token';
import { getTokenSlug } from 'utils/helpers/token';
import { Pagination } from 'components/common/Pagination';

import s from './Table.module.sass';

type TableProps = {
  columns: any
  data: any[]
  renderRowSubComponent?: any
  theme?: keyof typeof themeClasses
  selectedItem?: TokenMetadataInterface & YToken
  setSelectedItem?: (arg: TokenMetadataInterface & YToken) => void
  isScrollToTop?: boolean
  // pagination
  pageSize?: number
  pageCount?: number
  setOffset?: (arg: number) => void
  activeItem?: any
  // TODO: Delete later
  pagination?: boolean
  // *
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
  isScrollToTop = false,
  // pagination
  pageSize,
  pageCount = 1,
  setOffset,
  activeItem,
  pagination = false,
  // *
  tableClassName,
  rowClassName,
  theadClassName,
  className,
}) => {
  // TODO: change all data type & row types. REF: https://stackoverflow.com/questions/65182522/react-table-types-of-property-accessor-are-incompatible
  const preparePageCount = Math.ceil(pageCount / (pageSize || 2));

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    visibleColumns,
    // pagination
    rows,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    gotoPage,
    state: { pageIndex },
  } = useTable(
    {
      columns: userColumns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: pageSize || 2,
      },
      pageCount: preparePageCount,
      autoResetPage: false,
      manualPagination: true,
    },
    useExpanded,
    usePagination,
  );

  const handleSelectItem = (asset: TokenMetadataInterface & YToken) => {
    if (setSelectedItem) {
      setSelectedItem(asset);
    }
  };

  useEffect(() => {
    if (isScrollToTop) {
      animateScrollTo(window.pageYOffset - window.pageYOffset,
        { speed: 500, maxDuration: 1000, minDuration: 100 });
    }
  }, [isScrollToTop, pageIndex]);

  // Pagination
  const isShowPagination = Math.ceil(pageCount / (pageSize || 2)) > 1;

  useEffect(() => {
    if (setOffset) {
      const offset = pageIndex === 0 ? pageIndex : pageIndex * (pageSize || 2);
      setOffset(offset);
    }
  }, [pageIndex, pageSize, setOffset]);

  useEffect(() => {
    if (activeItem) {
      gotoPage(0);
    }
  }, [activeItem, gotoPage]);

  const compoundClassNames = cx(
    s.root,
    themeClasses[theme],
    className,
  );

  return (
    <>
      <div className={compoundClassNames}>
        <div className={s.wrapper}>
          <table
            {...getTableProps()}
            className={cx(
              s.table,
              { [s.isShowPagination]: isShowPagination && pagination },
              tableClassName,
            )}
          >
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
              {!(data && data.length) ? (
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
      </div>
      {isShowPagination && pagination && (
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
