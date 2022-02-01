import React, { FC } from "react";

import BaseLayout from "layouts/BaseLayout";
import { Stats } from "components/lending/Stats";
import { AllAssets } from "components/lending/AllAssets";

import s from "./Lending.module.sass";

export const Lending: FC = () => {
  return (
    <BaseLayout>
      <Stats className={s.stat} />
      <AllAssets />
    </BaseLayout>
  );
};
