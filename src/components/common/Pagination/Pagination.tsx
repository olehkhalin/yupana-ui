import React from 'react';
import cx from 'classnames';

// import { useMphoneOrWider } from 'utils/getMediaQuery';
import { getUniqueKey } from 'utils/getUniqueKey';
import { Button } from 'components/ui/Button';
import { ReactComponent as PaginationArrow } from 'svg/PaginationArrow.svg';

import s from './Pagination.module.sass';
// import { MobilePagination } from './MobilePagination';

export interface PaginationInterface {
  canPreviousPage: boolean
  canNextPage: boolean
  pageIndex: number
  pageCount: number
  setOffset?: (arg: number) => void
  gotoPage: (arg: number) => void
  nextPage: () => void
  previousPage: () => void
  className?: string
}

export const Pagination: React.FC<PaginationInterface> = ({
  canPreviousPage,
  canNextPage,
  pageIndex,
  pageCount,
  setOffset,
  gotoPage,
  nextPage,
  previousPage,
  className,
}) => {
  // const isMphoneOrWider = useMphoneOrWider();

  // set first, last and current pages
  const firstPage = 1;
  const lastPage = pageCount;
  const currentPage = pageIndex + 1;

  // set initial state of separators
  let isSeparatorToStart = false;
  let isSeparatorToEnd = false;

  // set initial array of available pages
  const available: number[] = [];

  // if device size <=560px
  // if (!isMphoneOrWider) {
  //   return (
  //     <MobilePagination
  //       pageIndex={pageIndex}
  //       canPreviousPage={canPreviousPage}
  //       canNextPage={canNextPage}
  //       pageCount={pageCount}
  //       nextPage={nextPage}
  //       previousPage={previousPage}
  //       gotoPage={gotoPage}
  //       setOffset={setOffset}
  //     />
  //   );
  // }

  // if count of pages equal to 1
  if (pageCount === 1) {
    isSeparatorToStart = false;
    isSeparatorToEnd = false;
    // if count of pages equal to 2
  } else if (pageCount === 2) {
    isSeparatorToStart = false;
    isSeparatorToEnd = false;
    // if count of pages equal to 3
  } else if (pageCount === 3) {
    available.push(2);
    isSeparatorToStart = false;
    isSeparatorToEnd = false;
    // if count of pages less or equal to 4
  } else if (pageCount <= 4) {
    available.push(2, 3);
    isSeparatorToStart = false;
    isSeparatorToEnd = false;
    // if count of pages equal to 5 and current page equal to 3
  } else if (pageCount === 5 && currentPage === 3) {
    available.push(2, 3, 4);
    isSeparatorToStart = false;
    isSeparatorToEnd = false;
    // if count of pages more then 4
  } else if (pageCount > 4) {
    // if currentPage equal to 1
    if (currentPage === firstPage) {
      available.push(currentPage + 1, currentPage + 2);
      isSeparatorToStart = false;
      isSeparatorToEnd = true;
    }
    // if currentPage equal to 2
    if (currentPage === 2) {
      available.push(currentPage, currentPage + 1);
      isSeparatorToStart = false;
      isSeparatorToEnd = true;
    }
    // if currentPage equal to 3
    if (currentPage === 3) {
      available.push(currentPage - 1, currentPage, currentPage + 1);
      isSeparatorToStart = false;
      isSeparatorToEnd = true;
    }
    // if currentPage less or equal to 4 and less then 'lastPage - 2'
    if (currentPage >= 4 && currentPage < lastPage - 2) {
      available.push(currentPage - 1, currentPage, currentPage + 1);
      isSeparatorToStart = true;
      isSeparatorToEnd = true;
    }
    // if current page equal to last page
    if (currentPage === lastPage) {
      available.push(currentPage - 2, currentPage - 1);
      isSeparatorToStart = true;
      isSeparatorToEnd = false;
    }
    // if current page equal to 'lastPage - 1'
    if (currentPage === lastPage - 1) {
      available.push(currentPage - 1, currentPage);
      isSeparatorToStart = true;
      isSeparatorToEnd = false;
    }
    // if current page equal to 'lastPage - 2' and count of pages more then 5
    if (currentPage === lastPage - 2 && pageCount > 5) {
      available.push(currentPage - 1, currentPage, currentPage + 1);
      isSeparatorToStart = true;
      isSeparatorToEnd = false;
    }
  }

  // go to the page
  const handleGoToPage = (item: number) => {
    if (setOffset) {
      gotoPage(item - 1);
    }
  };

  return (
    <div className={cx(s.root, className)}>
      <Button
        sizeT="small"
        theme="clear"
        onClick={previousPage}
        className={cx(s.arrowButton, { [s.active]: !canPreviousPage })}
        disabled={!canPreviousPage}
      >
        <PaginationArrow className={s.arrow} />
      </Button>

      <div className={s.pages}>
        <Button
          sizeT="small"
          theme="clear"
          onClick={() => handleGoToPage(firstPage)}
          className={cx(s.numbering, { [s.active]: currentPage === firstPage })}
        >
          {firstPage}
        </Button>

        {isSeparatorToStart && available.length ? (
          <div className={s.separator}>...</div>
        ) : null}

        {available && available.length ? available.map((item: number) => (
          <Button
            key={getUniqueKey()}
            sizeT="small"
            theme="clear"
            onClick={() => handleGoToPage(item)}
            className={cx(s.numbering, { [s.active]: currentPage === item })}
          >
            {item}
          </Button>
        )) : null}

        {isSeparatorToEnd && available.length ? (
          <div className={s.separator}>...</div>
        ) : null}

        {lastPage > firstPage && (
          <Button
            sizeT="small"
            theme="clear"
            onClick={() => handleGoToPage(lastPage)}
            className={cx(s.numbering, { [s.active]: currentPage === lastPage })}
          >
            {lastPage}
          </Button>
        )}
      </div>

      <Button
        sizeT="small"
        theme="clear"
        onClick={nextPage}
        className={cx(s.arrowButton, { [s.active]: !canNextPage })}
        disabled={!canNextPage}
      >
        <PaginationArrow className={cx(s.arrow, s.rightSide)} />
      </Button>
    </div>
  );
};
