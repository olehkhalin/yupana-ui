import React, { useEffect } from 'react';
import {
  useTable,
  useExpanded,
} from 'react-table';
import animateScrollTo from 'animated-scroll-to';
import cx from 'classnames';

import { TokenMetadataInterface } from 'types/token';
import { getTokenSlug } from 'utils/getTokenSlug';
import { Preloader, PreloaderThemes } from 'components/ui/Preloader';
import { Pagination } from 'components/common/Pagination';

import s from './Table.module.sass';

type TableProps = {
  columns: any
  data: any[]
  loading?: boolean
  renderRowSubComponent?: any
  theme?: keyof typeof themeClasses
  preloaderTheme?: PreloaderThemes
  selectedItem?: TokenMetadataInterface
  setSelectedItem?: (arg: TokenMetadataInterface) => void
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
  loading,
  renderRowSubComponent,
  theme = 'primary',
  preloaderTheme = 'primary',
  selectedItem,
  setSelectedItem,
  isScrollToTop = false,
  // pagination
  pageSize,
  pageCount = 100,
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
  const preparePageCount = Math.ceil(pageCount / (pageSize || 10));
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
    pageOptions,
    nextPage,
    previousPage,
    gotoPage,
    state: { pageIndex },
  } = useTable(
    {
      columns: userColumns,
      data,
      initialState: {
        pageIndex: 5,
        pageSize: pageSize || 10,
      },
      pageCount: preparePageCount,
      disableSortRemove: true,
      autoResetPage: false,
      manualPagination: true,
    },
    useExpanded,
  );

  const handleSelectItem = (asset: TokenMetadataInterface) => {
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
  const isShowPagination = Math.ceil(pageCount / (pageSize || 10)) > 1;

  useEffect(() => {
    if (setOffset) {
      const offset = pageIndex === 0 ? pageIndex : pageIndex * (pageSize || 10);
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
    { [s.loading]: loading },
    className,
  );

  return (
    <>
      <div className={cx(compoundClassNames)}>
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
              {loading && (
              <Preloader
                theme={preloaderTheme}
                className={s.preloader}
              />
              )}
              {rows.map((row) => {
                prepareRow(row);

                let isSelected: boolean = false;
                if (selectedItem && !loading) {
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
                        { [s.selected]: isSelected && !loading },
                        { [s.loading]: loading },
                        rowClassName,
                      )}
                    >
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()} key={cell.getCellProps().key} className={s.td}>
                          {cell.render('Cell')}
                        </td>
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
      {!loading && isShowPagination && pagination && (
        <Pagination
          pageIndex={pageIndex}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageCount={(pageOptions && pageOptions.length) ?? 13566}
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
