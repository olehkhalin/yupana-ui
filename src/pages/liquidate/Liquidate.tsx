import React, { FC, useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";

import { AssetType } from "types/asset";
import { LiquidateDetailsResponseData } from "types/liquidate-details";
import { getAssetName } from "utils/helpers/asset";
import { useRedirect } from "hooks/useRedirect";
import { useLiquidateDetails } from "hooks/useLiquidateDetails";
import { LiquidateDataProvider } from "hooks/useLiquidateData";
import NotFound from "pages/not-found";
import BaseLayout from "layouts/BaseLayout";
import { Section } from "components/common/Section";
import { Liquidate as LiquidateTable } from "components/tables/containers";
import {
  LiquidationStepFirst,
  LiquidationStepSecond,
  LiquidationForm,
} from "components/liquidate/LiquidationSteps";
import { AppRoutes } from "routes/main-routes";

import s from "./Liquidate.module.sass";

type LiquidateInnerProps = {
  data: LiquidateDetailsResponseData | null;
  loading?: boolean;
};

const LiquidateInner: FC<LiquidateInnerProps> = ({ data, loading }) => {
  const generalInfo = useMemo(() => {
    if (!data) {
      return undefined;
    }
    return [
      {
        borrowerAddress: data.borrowerAddress,
        borrowedAssetsNames: data.borrowedAssets.map(
          ({ asset }: { asset: AssetType }) => getAssetName(asset)
        ),
        collateralAssetsNames: data.collateralAssets.map(
          ({ asset }: { asset: AssetType }) => getAssetName(asset)
        ),
        totalBorrowed: data.totalBorrowUsd,
        healthFactor: data.healthFactor,
      },
    ];
  }, [data]);

  return (
    <>
      <Section
        title="Liquidate"
        theme="tertiary"
        head
        headingClassName={s.heading}
        className={s.root}
      >
        <LiquidateTable
          data={generalInfo}
          loading={loading}
          className={s.table}
        />
      </Section>
      <LiquidationStepFirst />
      <LiquidationStepSecond />
      <LiquidationForm />
    </>
  );
};

export const Liquidate: FC = () => {
  // @ts-ignore
  const { borrowerAddress }: { borrowerAddress: string } = useParams();
  const { redirect } = useRedirect();

  const { data, error, loading } = useLiquidateDetails(borrowerAddress);

  if (redirect && error) {
    return <Navigate to={AppRoutes.LIQUIDATE} />;
  }

  if (!loading && error && !redirect) {
    return <NotFound />;
  }

  return (
    <BaseLayout>
      <LiquidateDataProvider>
        <LiquidateInner data={data} loading={loading} />
      </LiquidateDataProvider>
    </BaseLayout>
  );
};
