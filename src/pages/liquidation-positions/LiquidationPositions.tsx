import React, { FC } from "react";

import BaseLayout from "layouts/BaseLayout";
import { AllLiquidationPositions } from "containers/liquidation/AllLiquidationPositions";

export const LiquidationPositions: FC = () => (
  <BaseLayout>
    <AllLiquidationPositions />
  </BaseLayout>
);
