import React, { FC, useMemo } from "react";
import { useReactiveVar } from "@apollo/client";
import cx from "classnames";

import { prepareMarketsOverview } from "utils/helpers/api";
import { globalVariablesVar } from "utils/cache";
import { MarketOverviewQuery, useMarketOverviewQuery } from "generated/graphql";
import { Section } from "components/common/Section";
import {
  MarketsCard,
  MarketsCardLoading,
} from "components/markets/MarketsCard";

import s from "./MarketsCards.module.sass";

type MarketsCardsInnerProps = {
  data?: MarketOverviewQuery;
  loading: boolean;
};

const MarketsCardsInner: FC<MarketsCardsInnerProps> = ({ data, loading }) => {
  const { totalUsdSupply, totalUsdBorrowed } =
    useReactiveVar(globalVariablesVar);
  const preparedData = useMemo(() => {
    if (data) {
      return {
        supply: prepareMarketsOverview(data),
        borrow: prepareMarketsOverview(data, false),
      };
    }
    return undefined;
  }, [data]);

  if (!preparedData) {
    if (loading) {
      return (
        <>
          <MarketsCardLoading className={s.card} />
          <MarketsCardLoading theme="secondary" className={s.card} />
        </>
      );
    }
    return <></>;
  }

  const { supply, borrow } = preparedData;

  return (
    <>
      <MarketsCard
        totalAmount={totalUsdSupply}
        volume24h={supply.volume24h}
        numberOfMembers={supply.numberOfMembers}
        assets={supply.assets}
        className={s.card}
      />
      <MarketsCard
        totalAmount={totalUsdBorrowed}
        volume24h={borrow.volume24h}
        numberOfMembers={borrow.numberOfMembers}
        assets={borrow.assets}
        theme="secondary"
        className={s.card}
      />
    </>
  );
};

type MarketsCardsProps = {
  className?: string;
};

export const MarketsCards: FC<MarketsCardsProps> = ({ className }) => {
  const { data, loading, error } = useMarketOverviewQuery();

  if ((!data && !loading) || error) {
    return <></>;
  }

  return (
    <Section title="Market overview" theme="tertiary" head>
      <div className={cx(s.root, className)}>
        <MarketsCardsInner data={data} loading={loading} />
      </div>
    </Section>
  );
};
