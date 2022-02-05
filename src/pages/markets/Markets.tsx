import React, { FC } from "react";

import BaseLayout from "layouts/BaseLayout";
import { MarketsCards } from "containers/markets/MarketsCards";
import { AllMarkets } from "components/markets/AllMarkets";

export const Markets: FC = () => (
  <BaseLayout>
    <MarketsCards />
    <AllMarkets />
  </BaseLayout>
);
