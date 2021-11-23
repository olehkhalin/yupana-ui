import React from 'react';

import { Header } from 'components/common/Header';
import { Footer } from 'components/common/Footer';
import { Container } from 'components/common/Container';

import s from './BaseLayout.module.sass';

type BaseLayoutProps = {};

export const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
}) => (
  <>
    <Header className={s.header} />
    <Container main className={s.container}>
      {children}
    </Container>
    <Footer />
  </>
);
