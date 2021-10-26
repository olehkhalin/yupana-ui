import React from 'react';
import cx from 'classnames';

import { Header } from 'components/common/Header';
import { Footer } from 'components/common/Footer';
import { Container } from 'components/common/Container';

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
    <Container className={s.container}>
      {children}
    </Container>
    <Footer />
  </main>
);
