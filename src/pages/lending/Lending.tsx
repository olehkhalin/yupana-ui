import React, { FC } from "react";

import { useAccountPkh } from "utils/dapp";
import BaseLayout from "layouts/BaseLayout";
import { Stats } from "components/lending/Stats";
import { AllAssets } from "components/lending/AllAssets";

import s from "./Lending.module.sass";

export const Lending: FC = () => {
  const accountPkh = useAccountPkh();

  return (
    <BaseLayout>
      {!!accountPkh && <Stats className={s.stat} />}
      <AllAssets />
    </BaseLayout>
  );
};
