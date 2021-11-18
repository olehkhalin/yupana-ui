import React from 'react';

import { Header } from 'components/common/Header';
import { Footer } from 'components/common/Footer';
import { Container } from 'components/common/Container';

import s from './NotFoundPage.module.sass';

export const NotFoundPage: React.FC = () => (
  <div className={s.page}>
    <Header />
    <Container className={s.container}>
      <div className={s.message}>
        <div className={s.number}>
          404
        </div>
        <div className={s.text}>
          page not found
        </div>
      </div>
    </Container>
    <Footer />
  </div>
);
