import React from 'react';
import cx from 'classnames';

import { Button } from 'components/ui/Button';

import s from './Radio.module.sass';

type RadioProps = {
  active?: boolean
  theme?: keyof typeof themeClasses
  className?: string
};

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const Radio: React.FC<RadioProps> = ({
  active,
  theme = 'primary',
  className,
}) => {
  const compoundClassNames = cx(
    s.root,
    className,
  );

  return (
    <Button
      theme="clear"
      className={compoundClassNames}
    >
      <div className={cx(s.radio, themeClasses[theme], { [s.active]: active })} />
    </Button>
  );
};
