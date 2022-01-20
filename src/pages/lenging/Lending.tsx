import React from 'react';

import BaseLayout from 'layouts/BaseLayout';
import { Stats } from 'containers/Stats';
import { AllAssets } from 'containers/AllAssets';

import s from './Lending.module.sass';

export const Lending: React.FC = () => (
  <BaseLayout>
    <Stats className={s.stat} />
    <AllAssets />
  </BaseLayout>
);
