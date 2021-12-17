import React from 'react';
import cx from 'classnames';

import { Toast } from 'components/ui/Toast';
import { Header } from 'components/common/Header';
import { Footer } from 'components/common/Footer';
import { Container } from 'components/common/Container';

import s from './BaseLayout.module.sass';

type BaseLayoutProps = {
  headerClassName?: string
  className?: string
};

export const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
  headerClassName,
  className,
}) => (
  <>
    <Header className={cx(s.header, headerClassName)} />
    <Container main className={cx(s.container, className)}>
      <Toast />
      {children}
    </Container>
    <Footer />
  </>
);
