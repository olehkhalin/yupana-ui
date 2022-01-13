import React from 'react';
import cx from 'classnames';

import { Button } from 'components/ui/Button';

import s from './TableDropdown.module.sass';

export type TableDropdownProps = {
  theme?: keyof typeof themeClasses
  className?: string
};

type EventType = React.MouseEvent<HTMLButtonElement>;

type TableDropdownInnerProps = {
  yToken: number
  balanceLabel: string
  balanceAmount: string
  firstButtonLabel: string
  secondButtonLabel: string
  handleFirstButtonClick: () => void
  handleSecondButtonClick: () => void
} & TableDropdownProps;

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const TableDropdown: React.FC<TableDropdownInnerProps> = ({
  yToken,
  theme = 'primary',
  balanceLabel,
  balanceAmount,
  firstButtonLabel,
  secondButtonLabel,
  handleFirstButtonClick,
  handleSecondButtonClick,
  className,
}) => {
  const handleClick = (event: EventType, callback: () => void) => {
    event.stopPropagation();
    callback();
  };

  const isSecondaryTheme = theme === 'secondary';
  return (
    <div className={cx(s.root, themeClasses[theme], className)}>
      <div className={s.content}>
        <div className={s.title}>
          {`${balanceLabel}:`}
          <div className={s.amount}>
            {balanceAmount}
          </div>
        </div>
        <Button
          theme="clear"
          href={`/markets/${yToken}`}
          className={s.details}
        >
          Markets details...
        </Button>
      </div>

      <div className={s.buttons}>
        <Button
          sizeT="small"
          actionT={isSecondaryTheme ? 'borrow' : 'supply'}
          onClick={(e: EventType) => handleClick(e, handleFirstButtonClick)}
          className={s.button}
        >
          {firstButtonLabel}
        </Button>
        <Button
          sizeT="small"
          actionT={isSecondaryTheme ? 'borrow' : 'supply'}
          onClick={(e: EventType) => handleClick(e, handleSecondButtonClick)}
          className={s.button}
        >
          {secondButtonLabel}
        </Button>
      </div>
    </div>
  );
};
