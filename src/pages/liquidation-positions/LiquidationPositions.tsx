import React from 'react';

import { Section } from 'components/common/Section';
import { LiquidationPositions as LiquidationContainer } from 'containers/LiquidationPositions';

export const LiquidationPositions: React.FC = () => (
  <>
    <Section
      title="Liquidation positions"
      theme="tertiary"
      link={{
        label: 'Docks: Liquidations',
        link: '/',
      }}
      head
    >
      <LiquidationContainer />
    </Section>
  </>
);
