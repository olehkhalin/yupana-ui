import React, { FC } from "react";

import BaseLayout from "layouts/BaseLayout";
import { useGlobalFactorsQuery } from "../../generated/graphql";

export const Lending: FC = () => {
  const { data, loading, error } = useGlobalFactorsQuery();
  console.log("globalFactors - data", data);
  console.log("globalFactors - loading", loading);
  console.log("globalFactors - error", error);

  return <BaseLayout>Lending</BaseLayout>;
};
