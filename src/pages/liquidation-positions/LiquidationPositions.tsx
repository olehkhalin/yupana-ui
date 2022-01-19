import React from 'react';

import BaseLayout from 'layouts/BaseLayout';
import { Section } from 'components/common/Section';
import { AllLiquidationPositions } from 'containers/AllLiquidationPositions';

export const LiquidationPositions: React.FC = () => (
  <BaseLayout>
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
  </BaseLayout>
);
