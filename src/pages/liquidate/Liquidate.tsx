import React from 'react';

import { Liquidate as LiquidateContainer } from 'containers/Liquidate';
import { LiquidationPosition } from 'containers/LiquidationPosition';
import { Section } from 'components/common/Section';

import s from './Liquidate.module.sass';

export const Liquidate: React.FC = () => (
  <>
    <Section
      title="Liquidate"
      theme="tertiary"
      head
      headingClassName={s.heading}
      className={s.root}
    >
      <LiquidateContainer />
    </Section>
    <LiquidationPosition />
  </>
);
