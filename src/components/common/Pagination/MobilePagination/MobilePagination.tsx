import React, { useState, useEffect } from 'react';
import cx from 'classnames';

import { Button } from 'components/ui/Button';
import { Input } from 'components/ui/Input';
import { PaginationInterface } from 'components/common/Pagination';
import { ReactComponent as Arrow } from 'svg/Arrow.svg';

import s from '../Pagination.module.sass';

export const MobilePagination: React.FC<PaginationInterface> = ({
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
  // pages
  const lastPage = pageCount;
  const currentPage = pageIndex + 1;

  // input states
  const [inputValue, setInputValue] = useState<string>(currentPage.toString());
  const [inputWidthSize, setInputWidthSize] = useState<number>(30);
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [inputError, setInputError] = useState<boolean>(false);

  // go to current page function
  const handleGoToPage = (item: number) => {
    if (setOffset) {
      gotoPage(item - 1);
    }
  };

  // submit data
  const onSubmit = () => {
    if (inputError) {
      setInputValue('1');
      handleGoToPage(1);
      setInputError(false);
    }
    setInputFocus(false);

    // only numbers
    const regex = /^\d+$/;
    if (regex.test(inputValue) && inputValue.trim() !== '' && +inputValue >= 1) {
      handleGoToPage(+inputValue);
    } else {
      handleGoToPage(1);
      setInputValue('1');
    }
  };

  // submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  // handle onChange event
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length <= lastPage.toString().length) {
      setInputValue(value);
      if (+value > lastPage || value.trim() === '') {
        setInputError(true);
      } else {
        setInputError(false);
      }
    }
  };

  // input value depends on currentPage
  useEffect(() => {
    setInputValue(currentPage.toString());
  }, [currentPage]);

  // calculate input width
  useEffect(() => {
    setInputWidthSize(20 + (10 * inputValue.length));
  }, [inputValue]);

  // handle lost focus of input
  const handleBlur = () => {
    onSubmit();
  };

  const compoundInputClassNames = cx(
    s.input,
    { [s.focus]: inputFocus },
    { [s.error]: inputError },
  );

  return (
    <div className={cx(s.root, className)}>
      <Button
        sizeT="small"
        theme="clear"
        onClick={previousPage}
        className={cx(s.arrowButton, { [s.active]: !canPreviousPage })}
        disabled={!canPreviousPage}
      >
        <Arrow className={s.arrow} />
      </Button>

      <div className={s.pages}>
        <form onSubmit={handleSubmit}>
          <Input
            type="number"
            value={inputValue}
            onChange={handleChange}
            max={lastPage}
            min={1}
            className={compoundInputClassNames}
            onFocus={() => setInputFocus(true)}
            onBlur={handleBlur}
            style={{ width: inputWidthSize }}
          />
          <input type="submit" className={s.submit} />
        </form>

        <div className={s.separator}>
          of
        </div>

        {lastPage && (
        <Button
          sizeT="small"
          theme="clear"
          onClick={() => handleGoToPage(lastPage)}
          className={s.numbering}
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
        <Arrow className={s.arrow} />
      </Button>
    </div>
  );
};
