import React from 'react';

import { Section } from 'components/common/Section';
import { AllLiquidationPositions } from 'containers/AllLiquidationPositions';

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
      <AllLiquidationPositions />
    </Section>
  </>
);
