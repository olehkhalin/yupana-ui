import React from 'react';
import cx from 'classnames';

import { Button } from 'components/ui/Button';

import s from './TableDropdown.module.sass';

type TableDropdownProps = {
  theme?: keyof typeof themeClasses
  className?: string
};

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const TableDropdown: React.FC<TableDropdownProps> = ({
  theme = 'primary',
  className,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  const isSecondaryTheme = theme === 'secondary';
  return (
    <div className={cx(s.root, themeClasses[theme], className)}>
      <div className={s.content}>
        <div className={s.title}>
          {`${isSecondaryTheme ? 'Borrow' : 'Supply'} balance:`}
          <div className={s.amount}>
            0.00 XTZ
          </div>
        </div>
        <Button
          theme="clear"
          href="/"
          className={s.details}
        >
          Markets details...
        </Button>
      </div>

      <div className={s.buttons}>
        <Button
          sizeT="small"
          actionT={isSecondaryTheme ? 'borrow' : 'supply'}
          onClick={handleClick}
          className={s.button}
        >
          {isSecondaryTheme ? 'Borrow' : 'Supply'}
        </Button>
        <Button
          sizeT="small"
          actionT={isSecondaryTheme ? 'borrow' : 'supply'}
          onClick={handleClick}
          className={s.button}
        >
          {isSecondaryTheme ? 'Repay' : 'Withdraw'}
        </Button>
      </div>
    </div>
  );
};

export const SupplyTableDropdown = () => {
  <TableDropdown />;
};
