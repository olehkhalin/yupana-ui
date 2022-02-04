import React, { FC } from "react";

import BaseLayout from "layouts/BaseLayout";
import { MarketsCards } from "containers/markets/MarketsCards";

export const Markets: FC = () => (
  <BaseLayout>
    <MarketsCards />
  </BaseLayout>
);
