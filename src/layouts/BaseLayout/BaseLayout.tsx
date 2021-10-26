import React from 'react';
import cx from 'classnames';

import { Header } from 'components/common/Header';

import s from './BaseLayout.module.sass';

type BaseLayoutProps = {
  className?: string
};

export const BaseLayout: React.FC<BaseLayoutProps> = ({
  className,
  children,
}) => (
  <main className={cx(s.root, className)}>
    <Header />
    {children}
    {/* Footer */}
  </main>
);
