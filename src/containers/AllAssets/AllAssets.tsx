import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import cx from 'classnames';
import BigNumber from 'bignumber.js';
import useSWR from 'swr';

import { getUserBalance, useAccountPkh, useTezos } from 'utils/dapp';
import { getPreparedTokenObject } from 'utils/helpers/token';
import { useWiderThanMdesktop } from 'utils/helpers';
import { getPreparedPercentValue } from 'utils/helpers/amount';
import {
  Asset,
  LendingAllAssetsQuery,
  useLendingAllAssetsLazyQuery,
} from 'generated/graphql';
import { Section } from 'components/common/Section';
import { AssetsSwitcher } from 'components/common/AssetsSwitcher';
import { YourSupplyAssets } from 'components/tables/containers/YourSupplyAssets';
import { YourBorrowAssets } from 'components/tables/containers/YourBorrowAssets';
import { SupplyAssets } from 'components/tables/containers/SupplyAssets';
import { BorrowAssets } from 'components/tables/containers/BorrowAssets';

import s from './AllAssets.module.sass';

type AssetsProps = {
  className?: string
};

type AllAssetsInnerProps = {
  data?: LendingAllAssetsQuery
} & AssetsProps;

const AllAssetsInner: React.FC<AllAssetsInnerProps> = ({
  className,
  data,
}) => {
  const tezos = useTezos()!;
  const accountPkh = useAccountPkh();
  const isWiderThanMdesktop = useWiderThanMdesktop();
  const [isAssetSwitcherActive, setIsAssetSwitcherActive] = useState(true);

  const getAssetsStats = useCallback(async () => {
    if (!data) return [];

    return Promise.all(data.asset.map(
      async (el) => {
        const asset = getPreparedTokenObject(el as Asset);

        const supplyApy = getPreparedPercentValue(el as Asset, 'supply_apy');
        const collateralFactor = new BigNumber(el.collateralFactor).div(1e18).multipliedBy(1e2);
        const borrowApy = getPreparedPercentValue(el as Asset, 'borrow_apy');
        const utilisationRate = getPreparedPercentValue(el as Asset, 'utilization_rate');
        const liquidity = new BigNumber(el.totalLiquid).div(1e18);

        const wallet = await getUserBalance(
          tezos,
          asset.address,
          asset.id ?? undefined,
          accountPkh!,
        );

        return {
          yToken: el.ytoken,
          asset,
          supplyApy,
          collateralFactor,
          borrowApy,
          utilisationRate,
          liquidity,
          wallet,
        };
      },
    ));
  }, [accountPkh, data, tezos]);

  const {
    data: assetsStats,
    error,
  } = useSWR(
    ['lending-assets-stats',
      accountPkh,
      data,
    ],
    getAssetsStats,
    { refreshInterval: 30000 },
  );

  // TODO: Research
  // useOnBlock(tezos, revalidate);

  const usersSupplyAssetsPrepared = useMemo(
    () => (
      data ? data.userSupply.map((el) => {
        const supplied = new BigNumber(el.supply).div(1e18);

        return {
          yToken: el.asset.ytoken,
          isCollateral: el.entered,
          supplied,
        };
      }) : []),
    [data],
  );

  const usersBorrowedAssetsPrepared = useMemo(
    () => (
      data ? data.userBorrow.map((el) => {
        const borrowed = new BigNumber(el.borrow).div(1e18);

        return {
          yToken: el.asset.ytoken,
          borrowed,
        };
      }) : []),
    [data],
  );

  const preparedAllAssets = useMemo(
    () => (
      assetsStats ? assetsStats.map((item) => ({
        ...item,
        ...(usersSupplyAssetsPrepared.find(({ yToken }) => yToken === item.yToken)),
        ...(usersBorrowedAssetsPrepared.find(({ yToken }) => yToken === item.yToken)),
      })) : []),
    [assetsStats, usersSupplyAssetsPrepared, usersBorrowedAssetsPrepared],
  );

  const preparedUserSupplyAssets = useMemo(
    () => (
      accountPkh && usersSupplyAssetsPrepared && assetsStats
        ? usersSupplyAssetsPrepared.map((item) => (
          {
            ...item,
            ...(assetsStats.find(({ yToken }) => yToken === item.yToken)),
          }
        ))
        : []
    ),
    [accountPkh, assetsStats, usersSupplyAssetsPrepared],
  );

  const preparedUserBorrowAssets = useMemo(
    () => (
      accountPkh && usersBorrowedAssetsPrepared && assetsStats
        ? usersBorrowedAssetsPrepared.map((item) => (
          {
            ...item,
            ...(assetsStats.find(({ yToken }) => yToken === item.yToken)),
          }
        ))
        : []
    ),
    [accountPkh, assetsStats, usersBorrowedAssetsPrepared],
  );

  useEffect(() => {
    if (error) {
      console.error(error.message);
    }
  }, [error]);

  return (
    <>
      {!isWiderThanMdesktop && (
        <AssetsSwitcher
          active={isAssetSwitcherActive}
          setActive={setIsAssetSwitcherActive}
          className={s.switcher}
        />
      )}

      {accountPkh && (
        <div className={cx(s.root, className)}>
          <Section
            title="Your supply assets"
            className={cx(s.col, { [s.show]: isAssetSwitcherActive && !isWiderThanMdesktop })}
          >
            <YourSupplyAssets data={preparedUserSupplyAssets} />
          </Section>

          <Section
            title="Your borrow assets"
            theme="secondary"
            className={cx(s.col, { [s.show]: !isAssetSwitcherActive && !isWiderThanMdesktop })}
          >
            <YourBorrowAssets data={preparedUserBorrowAssets} />
          </Section>
        </div>
      )}

      <div className={cx(s.root, className)}>
        <Section
          title="Supply assets"
          link={{
            label: 'docks: suppling assets',
            link: '/',
          }}
          className={cx(s.col, { [s.show]: isAssetSwitcherActive && !isWiderThanMdesktop })}
        >
          <SupplyAssets data={preparedAllAssets} />
        </Section>

        <Section
          title="Borrow assets"
          link={{
            label: 'docs: borrowing assets',
            link: '/',
          }}
          theme="secondary"
          className={cx(s.col, { [s.show]: !isAssetSwitcherActive && !isWiderThanMdesktop })}
        >
          <BorrowAssets data={preparedAllAssets} />
        </Section>
      </div>
    </>
  );
};

export const AllAssets: React.FC<AssetsProps> = ({
  className,
}) => {
  const accountPkh = useAccountPkh();

  const [fetch, { data, error }] = useLendingAllAssetsLazyQuery();

  useEffect(() => {
    fetch({
      variables: {
        account: accountPkh,
      },
    });
  }, [accountPkh, fetch]);

  if (error) {
    return <></>;
  }

  return (
    <AllAssetsInner
      data={data}
      className={className}
    />
  );
};
