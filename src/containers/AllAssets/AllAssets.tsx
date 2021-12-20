import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import cx from 'classnames';
import BigNumber from 'bignumber.js';
import useSWR from 'swr';

import { AssetsPrice, useCurrency } from 'providers/CurrencyProvider';
import { useUserStats } from 'providers/UserStatsProvider';
import { getUserBalance, useAccountPkh, useTezos } from 'utils/dapp';
import { getPreparedTokenObject } from 'utils/helpers/token';
import { useWiderThanMdesktop } from 'utils/helpers';
import { getPreparedPercentValue } from 'utils/helpers/amount';
import {
  Asset,
  LendingAllAssetsQuery, LendingUserAssetsQuery,
  useLendingAllAssetsQuery, useLendingUserAssetsLazyQuery,
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
  allAssetsData?: LendingAllAssetsQuery
  userAssetsData?: LendingUserAssetsQuery
} & AssetsProps;

const AllAssetsInner: React.FC<AllAssetsInnerProps> = ({
  className,
  allAssetsData,
  userAssetsData,
}) => {
  const tezos = useTezos()!;
  const accountPkh = useAccountPkh();
  const isWiderThanMdesktop = useWiderThanMdesktop();
  const [isAssetSwitcherActive, setIsAssetSwitcherActive] = useState(true);

  const getAssetsStats = useCallback(async () => {
    if (!allAssetsData) return [];

    return Promise.all(allAssetsData.asset.map(
      async (el) => {
        const asset = getPreparedTokenObject(el as Asset);

        const supplyApy = getPreparedPercentValue(el as Asset, 'supply_apy');
        const collateralFactor = Number(new BigNumber(el.collateralFactor)
          .div(1e18)
          .multipliedBy(1e2)) / 100;
        const borrowApy = getPreparedPercentValue(el as Asset, 'borrow_apy');
        const utilisationRate = getPreparedPercentValue(el as Asset, 'utilization_rate');
        const liquidity = new BigNumber(el.totalLiquid).div(1e18);

        const wallet = await getUserBalance(
          tezos,
          asset.address,
          asset.id,
          accountPkh!,
        ) ?? 0;

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
  }, [accountPkh, allAssetsData, tezos]);

  const {
    data: assetsStats,
    error,
  } = useSWR(
    ['lending-assets-stats',
      accountPkh,
      allAssetsData,
    ],
    getAssetsStats,
    { refreshInterval: 30000 },
  );

  // TODO: Research
  // useOnBlock(tezos, revalidate);
  const { setAssetsPrice } = useCurrency();
  const { setUserBorrowedAssets } = useUserStats();

  const usersSupplyAssetsPrepared = useMemo(
    () => (
      userAssetsData ? userAssetsData.userSupply.map((el) => {
        const supplied = new BigNumber(el.supply).div(1e18);

        return {
          yToken: el.asset.ytoken,
          isCollateral: el.entered,
          supplied,
        };
      }) : []),
    [userAssetsData],
  );

  // get tokens price in dollars with correct decimals
  const getAssetsPriceWithDecimals: AssetsPrice[] | undefined = useMemo(
    () => {
      if (allAssetsData && assetsStats && assetsStats.length) {
        return assetsStats.map((asset) => {
          const currentAssetFromOracle = allAssetsData.oraclePrice.find(
            (oracle) => asset.yToken === oracle.ytoken,
          );
          if (currentAssetFromOracle) {
            return {
              ...currentAssetFromOracle,
              price: Number(new BigNumber(currentAssetFromOracle.price).div(`1e${asset.asset.decimals}`)),
            };
          }
          return {
            name: 'Token not found',
            price: 0,
            ytoken: 0,
          };
        });
      }
      return [];
    },
    [assetsStats, allAssetsData],
  );

  const usersBorrowedAssetsPrepared = useMemo(
    () => (
      userAssetsData ? userAssetsData.userBorrow.map((el) => {
        const borrowed = new BigNumber(el.borrow).div(1e18);

        return {
          yToken: el.asset.ytoken,
          borrowed,
        };
      }) : []),
    [userAssetsData],
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
    const findUserBorrowedAssets = usersBorrowedAssetsPrepared
      .filter((asset) => asset.borrowed.lt(0));
    setUserBorrowedAssets(findUserBorrowedAssets);
  }, [setUserBorrowedAssets, usersBorrowedAssetsPrepared]);

  useEffect(() => {
    setAssetsPrice(getAssetsPriceWithDecimals);
  }, [getAssetsPriceWithDecimals, setAssetsPrice]);

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
  const { setUserStats } = useUserStats();
  const { data: allAssetsData, error: allAssetsError } = useLendingAllAssetsQuery();
  const [fetch, { data, error }] = useLendingUserAssetsLazyQuery();

  useEffect(() => {
    if (accountPkh) {
      fetch({
        variables: {
          account: accountPkh,
        },
      });
    }
  }, [accountPkh, fetch]);

  // Set user stats to provider
  useEffect(() => {
    if (data && data.user) {
      setUserStats({
        maxCollateral: data.user[0].maxCollateral,
        outstandingBorrow: data.user[0].outstandingBorrow !== '0' ? data.user[0].outstandingBorrow : 1,
      });
    }
  }, [data, setUserStats]);

  if (error || allAssetsError) {
    return <></>;
  }

  return (
    <AllAssetsInner
      allAssetsData={allAssetsData}
      userAssetsData={data}
      className={className}
    />
  );
};
