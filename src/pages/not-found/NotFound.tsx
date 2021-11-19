import React from 'react';

import { Header } from 'components/common/Header';
import { Footer } from 'components/common/Footer';

import s from './NotFound.module.sass';

export const NotFound: React.FC = () => (
  <>
    <Header />
    <main className={s.root}>
      <div className={s.number}>
        404
      </div>
      <div className={s.text}>
        page not found
      </div>
    </main>
    <Footer />
  </>
);
