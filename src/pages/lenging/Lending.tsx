import React, { FC } from "react";

import BaseLayout from "layouts/BaseLayout";
import { UserStats } from "components/lending/UserStats";

export const Lending: FC = () => {
  return (
    <BaseLayout>
      <UserStats />
    </BaseLayout>
  );
};
