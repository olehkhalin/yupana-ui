import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import cx from 'classnames';
import useSWR from 'swr';
import BigNumber from 'bignumber.js';

import { STANDARD_PRECISION } from 'constants/default';
import {
  getUserBalance,
  useAccountPkh,
  useTezos,
} from 'utils/dapp';
import { getPreparedTokenObject } from 'utils/helpers/token';
import { useWiderThanMdesktop } from 'utils/helpers';
import { convertUnits, getPreparedPercentValue } from 'utils/helpers/amount';
import {
  Asset,
  LendingAllAssetsQuery,
  LendingUserAssetsQuery,
  useLendingAllAssetsQuery,
  useLendingUserAssetsLazyQuery,
} from 'generated/graphql';
import {
  UserGeneralInfoProvider,
  useUserGeneralInfo,
} from 'providers/UserGeneralInfoProvider';
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
  const { setUserGeneralInfo } = useUserGeneralInfo();

  const getAssetsStats = useCallback(async () => {
    if (!allAssetsData) return [];

    return Promise.all(allAssetsData.asset.map(
      async (el) => {
        const asset = getPreparedTokenObject(el as Asset);

        const supplyApy = getPreparedPercentValue(el as Asset, 'supply_apy');
        const collateralFactor = Number(
          convertUnits(el.collateralFactor, STANDARD_PRECISION)
            .multipliedBy(1e2)
            .div(1e2),
        );
        const borrowApy = getPreparedPercentValue(el as Asset, 'borrow_apy');
        const utilisationRate = getPreparedPercentValue(el as Asset, 'utilization_rate');
        const liquidity = convertUnits(el.totalLiquid, STANDARD_PRECISION);

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

  const usersSupplyAssetsPrepared = useMemo(
    () => (
      (accountPkh && userAssetsData) ? userAssetsData.userSupply.map((el) => {
        const supplied = convertUnits(el.supply, STANDARD_PRECISION);

        return {
          yToken: el.asset.ytoken,
          isCollateral: el.entered,
          supplied,
        };
      }) : []),
    [accountPkh, userAssetsData],
  );

  const usersBorrowedAssetsPrepared = useMemo(
    () => (
      (accountPkh && userAssetsData) ? userAssetsData.userBorrow.map((el) => {
        const borrowed = convertUnits(el.borrow, STANDARD_PRECISION);

        return {
          yToken: el.asset.ytoken,
          borrowed,
        };
      }) : []),
    [accountPkh, userAssetsData],
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
      usersSupplyAssetsPrepared && assetsStats
        ? usersSupplyAssetsPrepared.map((item) => (
          {
            ...item,
            ...(assetsStats.find(({ yToken }) => yToken === item.yToken)),
          }
        ))
        : []
    ),
    [assetsStats, usersSupplyAssetsPrepared],
  );

  const preparedUserBorrowAssets = useMemo(
    () => (
      usersBorrowedAssetsPrepared && assetsStats
        ? usersBorrowedAssetsPrepared.map((item) => (
          {
            ...item,
            ...(assetsStats.find(({ yToken }) => yToken === item.yToken)),
          }
        ))
        : []
    ),
    [assetsStats, usersBorrowedAssetsPrepared],
  );

  useEffect(() => {
    if (error) {
      console.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    setUserGeneralInfo(
      accountPkh && userAssetsData
        ? {
          maxCollateral: new BigNumber(userAssetsData.user[0].maxCollateral),
          outstandingBorrow: new BigNumber(userAssetsData.user[0].outstandingBorrow),
        }
        : null,
    );
  }, [accountPkh, setUserGeneralInfo, userAssetsData]);

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

  const { data: allAssetsData, error: allAssetsError } = useLendingAllAssetsQuery();
  const [fetch, {
    data: userAssetsData,
    error: userAssetsError,
  }] = useLendingUserAssetsLazyQuery();

  useEffect(() => {
    if (accountPkh) {
      fetch({
        variables: {
          account: accountPkh,
        },
      });
    }
  }, [accountPkh, fetch]);

  if (userAssetsError || allAssetsError) {
    return <></>;
  }

  return (
    <UserGeneralInfoProvider>
      <AllAssetsInner
        allAssetsData={allAssetsData}
        userAssetsData={userAssetsData}
        className={className}
      />
    </UserGeneralInfoProvider>
  );
};
