import React, { FC, useEffect, useMemo, useState } from "react";

import { DOCS_LINKS } from "constants/docs";
import { LIQUIDATION_POSITIONS_ITEMS_PER_PAGE } from "constants/defaults";
import {
  LiquidationPositionsQuery,
  useLiquidationPositionsLazyQuery,
} from "generated/graphql";
import { useAssetsMetadata } from "hooks/useAssetsMetadata";
import { useAccountPkh } from "utils/dapp";
import { prepareLiquidationPositions } from "utils/helpers/api";
import { Section } from "components/common/Section";
import { LiquidationPositions as LiquidatationTable } from "components/tables/desktop/LiquidationPositions";

type LiquidationPositionsWrapperProps = {
  data?: LiquidationPositionsQuery;
  setOffset: (arg: number) => void;
  loading: boolean;
  className?: string;
};

const LiquidationPositionsWrapper: FC<LiquidationPositionsWrapperProps> = ({
  data,
  setOffset,
  loading,
  className,
}) => {
  const { data: assetsMetadata, loading: assetsLoading } = useAssetsMetadata();

  const borrowersCount = useMemo(
    () => data?.userAggregate.aggregate?.count ?? 1,
    [data?.userAggregate.aggregate?.count]
  );

  const preparedData = useMemo(() => {
    if ((!data && !loading) || (!assetsMetadata && !assetsLoading)) {
      return [];
    }

    if (loading || !data || !assetsMetadata || assetsLoading) {
      return undefined;
    }

    return prepareLiquidationPositions(data, assetsMetadata);
  }, [assetsLoading, assetsMetadata, data, loading]);

  return (
    <Section
      title="Liquidatable positions"
      theme="tertiary"
      link={{
        label: "Docs: Liquidations",
        link: DOCS_LINKS.liquidations,
        external: true,
      }}
      head
    >
      <LiquidatationTable
        data={preparedData}
        loading={loading}
        setOffset={setOffset}
        pageSize={LIQUIDATION_POSITIONS_ITEMS_PER_PAGE}
        pageCount={borrowersCount}
        className={className}
      />
    </Section>
  );
};

type AllLiquidationPositionsProps = {
  className?: string;
};

export const AllLiquidationPositions: FC<AllLiquidationPositionsProps> = ({
  className,
}) => {
  const [offset, setOffset] = useState<number>(0);
  const pkh = useAccountPkh();

  const [fetchBorrowersData, { data, error, loading }] =
    useLiquidationPositionsLazyQuery({
      variables: {
        limit: LIQUIDATION_POSITIONS_ITEMS_PER_PAGE,
        offset,
        address: pkh ?? "",
      },
    });

  useEffect(() => {
    fetchBorrowersData({
      variables: {
        limit: LIQUIDATION_POSITIONS_ITEMS_PER_PAGE,
        offset,
        address: pkh ?? "",
      },
    });
  }, [fetchBorrowersData, offset, pkh]);

  if ((!data && !loading) || error) {
    return <></>;
  }

  return (
    <LiquidationPositionsWrapper
      data={data}
      setOffset={setOffset}
      loading={loading}
      className={className}
    />
  );
};
