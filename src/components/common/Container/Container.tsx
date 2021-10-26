import React from 'react';
import cx from 'classnames';

import s from './Container.module.sass';

type ContainerProps = {
  className?: string
};

export const Container: React.FC<ContainerProps> = ({
  className,
  children,
}) => (
  <div className={cx(s.root, className)}>
    {children}
  </div>
);
