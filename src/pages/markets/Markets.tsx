import React from 'react';

import BaseLayout from 'layouts/BaseLayout';
import { AllMarkets } from 'containers/AllMarkets';
import { MarketCards } from 'containers/MarketCards';
import { Section } from 'components/common/Section';

export const Markets: React.FC = () => (
  <BaseLayout>
    <Section
      title="Market overview"
      theme="tertiary"
      head
    >
      <MarketCards />
    </Section>
    <Section
      title="All markets"
      theme="tertiary"
    >
      <AllMarkets />
    </Section>
  </BaseLayout>
);
