import React, { useState } from 'react';
import cx from 'classnames';

import { Button } from 'components/ui/Button';

import s from './CreditInput.module.sass';

type CreditInputProps = {
  error?: string
  className?: string
};

export const CreditInput: React.FC<CreditInputProps> = ({
  error,
  className,
}) => {
  const [changeableElement, setChangeableElement] = useState(0);

  const handleChange = (num: any) => {
    setChangeableElement(num * 1.3435342);
  };

  return (
    <>
      <div className={cx(s.root, className)}>
        <div className={s.inner}>
          <div className={s.mainInfo}>
            <div className={s.inputBlock}>
              <input
                type="number"
                placeholder="0.00"
                onChange={(e) => handleChange(+e.target.value)}
                className={cx(s.input, className)}
              />
            </div>
            <div className={cx(s.exchange, className)}>
              $
              {' '}
              {changeableElement || '0.00'}
            </div>
          </div>
          <Button
            theme="clear"
            className={s.button}
          >
            max
          </Button>
        </div>
      </div>
      {error && (
      <div className={s.errorContainer}>
        <div className={cx(s.errorText)}>{error}</div>
      </div>
      )}
    </>
  );
};
