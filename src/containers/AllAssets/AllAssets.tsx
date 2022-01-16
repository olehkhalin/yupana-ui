/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import cx from 'classnames';
import useSWR from 'swr';
import BigNumber from 'bignumber.js';

import { ORACLE_PRICE_PRECISION, STANDARD_PRECISION } from 'constants/default';
// import { useLoading } from 'hooks/useLoading';
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
import { ProcessCreditProvider } from 'providers/ProcessCreditProvider';
import { useOraclePrices } from 'providers/OraclePricesProvider';
import { Section } from 'components/common/Section';
import { AssetsSwitcher } from 'components/common/AssetsSwitcher';
import { YOUR_ASSETS_DATA_LOADING } from 'components/tables/loading-preview/your-assets-loading';
import { ASSETS_DATA_LOADING } from 'components/tables/loading-preview/assets-loading';
import { YourSupplyAssets } from 'components/tables/containers/YourSupplyAssets';
import { YourBorrowAssets } from 'components/tables/containers/YourBorrowAssets';
import { SupplyAssets } from 'components/tables/containers/SupplyAssets';
import { BorrowAssets } from 'components/tables/containers/BorrowAssets';
import { CreditProcessModal } from 'components/modals/CreditProcessModal';

import s from './AllAssets.module.sass';

type AssetsProps = {
  className?: string
};

type AllAssetsInnerProps = {
  allAssetsData?: LendingAllAssetsQuery
  userAssetsData?: LendingUserAssetsQuery
} & AssetsProps;

const AllAssetsInner: React.FC<AllAssetsInnerProps> = ({
  allAssetsData,
  userAssetsData,
  className,
}) => {
  const tezos = useTezos()!;
  const accountPkh = useAccountPkh();
  const isWiderThanMdesktop = useWiderThanMdesktop();
  const [isAssetSwitcherActive, setIsAssetSwitcherActive] = useState(true);
  const { setUserGeneralInfo } = useUserGeneralInfo();
  const { oraclePrices } = useOraclePrices();

  const getAssetsStats = useCallback(async () => {
    if (!allAssetsData) return [];

    return Promise.all(allAssetsData.asset.map(
      async (el) => {
        const asset = getPreparedTokenObject(el as Asset);

        const supplyApy = getPreparedPercentValue(el as Asset, 'supply_apy');
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
          collateralFactor: el.collateralFactor,
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

  const loading = !assetsStats || !assetsStats.length;

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
        const yToken = el.asset.ytoken;

        const oraclePrice = oraclePrices
          ? oraclePrices[yToken]
          : null;

        const maxCollateral = userAssetsData.user[0]
          ? new BigNumber(userAssetsData.user[0].maxCollateral)
          : null;

        const borrowLimit = oraclePrice && maxCollateral
          ? new BigNumber(el.borrow)
            .multipliedBy(
              convertUnits(oraclePrice.price, ORACLE_PRICE_PRECISION)
                .multipliedBy(oraclePrice.decimals),
            )
            .div(
              convertUnits(maxCollateral, STANDARD_PRECISION),
            )
          : new BigNumber(0);

        return {
          yToken,
          borrowed,
          borrowLimit,
        };
      }) : []),
    [accountPkh, oraclePrices, userAssetsData],
  );

  const preparedAllAssets = useMemo(
    () => (
      assetsStats ? assetsStats.map((item) => ({
        ...item,
        ...(
          usersSupplyAssetsPrepared
            .find(({ yToken }) => yToken === item.yToken)
          ?? { isCollateral: false, supplied: new BigNumber(0) }
        ),
        ...(
          usersBorrowedAssetsPrepared
            .find(({ yToken }) => yToken === item.yToken)
          ?? { borrowed: new BigNumber(0) }
        ),
      })) : ASSETS_DATA_LOADING),
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
        : YOUR_ASSETS_DATA_LOADING
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
        : YOUR_ASSETS_DATA_LOADING
    ),
    [assetsStats, usersBorrowedAssetsPrepared],
  );

  useEffect(() => {
    setUserGeneralInfo(
      accountPkh && userAssetsData && userAssetsData.user.length
        ? {
          maxCollateral: new BigNumber(userAssetsData.user[0]
            ? userAssetsData.user[0].maxCollateral
            : 0),
          outstandingBorrow: new BigNumber(userAssetsData.user[0]
            ? userAssetsData.user[0].outstandingBorrow
            : 0),
        }
        : null,
    );
  }, [accountPkh, setUserGeneralInfo, userAssetsData]);

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
            <YourSupplyAssets
              data={preparedUserSupplyAssets}
              loading={loading}
            />
          </Section>

          <Section
            title="Your borrow assets"
            theme="secondary"
            className={cx(s.col, { [s.show]: !isAssetSwitcherActive && !isWiderThanMdesktop })}
          >
            <YourBorrowAssets
              data={preparedUserBorrowAssets}
              loading={loading}
            />
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
          <SupplyAssets
            data={preparedAllAssets}
            loading={loading}
          />
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
          <BorrowAssets
            data={preparedAllAssets}
            loading={loading}
          />
        </Section>
      </div>
    </>
  );
};

export const AllAssets: React.FC<AssetsProps> = ({
  className,
}) => {
  const accountPkh = useAccountPkh();

  const {
    data: allAssetsData,
    // error: allAssetsError, // TODO: Research
  } = useLendingAllAssetsQuery();
  const [fetch, {
    data: userAssetsData,
    // error: userAssetsError, // TODO: Research
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

  return (
    <UserGeneralInfoProvider>
      <ProcessCreditProvider>
        <AllAssetsInner
          allAssetsData={allAssetsData}
          userAssetsData={userAssetsData}
          className={className}
        />
        <CreditProcessModal />
      </ProcessCreditProvider>
    </UserGeneralInfoProvider>
  );
};
