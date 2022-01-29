import React, { FC } from "react";

import BaseLayout from "layouts/BaseLayout";
import { Stats } from "components/lending/Stats";

export const Lending: FC = () => {
  return (
    <BaseLayout>
      <Stats />
    </BaseLayout>
  );
};
