import React from 'react';

import BaseLayout from 'layouts/BaseLayout';

import s from './NotFound.module.sass';

export const NotFound: React.FC = () => (
  <>
    <BaseLayout headerClassName={s.header} className={s.container}>
      <div className={s.number}>
        404
      </div>
      <div className={s.text}>
        page not found
      </div>
    </BaseLayout>
  </>
);
