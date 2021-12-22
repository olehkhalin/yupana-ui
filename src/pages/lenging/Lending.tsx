import React from 'react';

import { Stats } from 'containers/Stats';
import { AllAssets } from 'containers/AllAssets';

import s from './Lending.module.sass';

export const Lending: React.FC = () => (
  <>
    <Stats className={s.stat} />
    <AllAssets />
  </>
);
