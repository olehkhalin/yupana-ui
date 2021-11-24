import React from 'react';

import { TokenDetails } from 'containers/TokenDetails';
import { MarketDetails } from 'containers/MarketDetails';
import { InterestRateModel } from 'containers/InterestRateModel';

import s from './MarketsDetails.module.sass';

export const MarketsDetails: React.FC = () => (
  <>
    <TokenDetails
      className={s.tokenDetails}
    />
    <MarketDetails />
    <InterestRateModel />
  </>
);
