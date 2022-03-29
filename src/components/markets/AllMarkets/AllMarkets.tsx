import React, { FC } from "react";

import { useAssets } from "hooks/useAssets";
import { Section } from "components/common/Section";
import { Markets } from "components/tables/containers";

import s from "./AllMarkets.module.sass";

type AllMarketsProps = {
  className?: string;
};

export const AllMarkets: FC<AllMarketsProps> = ({ className }) => {
  const { data, loading, error } = useAssets();

  if ((!data && !loading) || error) {
    return <></>;
  }

  return (
    <Section title="All markets" theme="tertiary" className={s.root}>
      <Markets data={data?.assets} loading={loading} className={className} />
    </Section>
  );
};
