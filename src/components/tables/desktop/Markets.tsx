import React, { FC, useCallback, useMemo } from "react";
import BigNumber from "bignumber.js";
import { Cell } from "react-table";
import cx from "classnames";

import { ORACLE_PRICE_PRECISION, STANDARD_PRECISION } from "constants/defaults";
import { AssetsResponseData, AssetType } from "types/asset";
import { convertUnits, getPrettyPercent } from "utils/helpers/amount";
import { useOraclePriceQuery } from "generated/graphql";
import { Table } from "components/ui/Table";
import { Button } from "components/ui/Button";
import { AssetName } from "components/common/AssetName";
import { PrettyAmount } from "components/common/PrettyAmount";
import { AppRoutes } from "routes/main-routes";

import s from "./Tables.module.sass";

type MarketsProps = {
  data?: AssetsResponseData;
  loading?: boolean;
  className?: string;
};

export const Markets: FC<MarketsProps> = ({ data, loading, className }) => {
  const { data: oraclePrices } = useOraclePriceQuery();

  const calculateUsdTotals = useCallback(
    (
      total: BigNumber,
      yToken: number,
      asset: AssetType,
      exchangeRate?: BigNumber
    ) => {
      const oraclePrice = oraclePrices
        ? oraclePrices.oraclePrice.find(({ ytoken }) => ytoken === yToken) ?? {
            price: new BigNumber(0),
            decimals: 0,
          }
        : {
            price: new BigNumber(0),
            decimals: 0,
          };

      return convertUnits(
        convertUnits(total.multipliedBy(exchangeRate ?? 1), STANDARD_PRECISION),
        asset.decimals
      )
        .multipliedBy(convertUnits(oraclePrice.price, ORACLE_PRICE_PRECISION))
        .multipliedBy(oraclePrice.decimals);
    },
    [oraclePrices]
  );

  const columns = useMemo(
    () => [
      {
        Header: () => <span className={s.white}>Market</span>,
        id: "details",
        accessor: (row: { asset: AssetType; yToken: number }) => ({
          asset: row.asset,
          yToken: row.yToken,
        }),
        Cell: ({ cell: { value } }: { cell: Cell }) => (
          <AssetName
            asset={loading ? undefined : value.asset}
            loading={loading}
            href={`${AppRoutes.MARKETS}/${value.yToken}`}
            theme="tertiary"
          />
        ),
      },
      {
        Header: () => <span className={s.blue}>Total Supply</span>,
        id: "usdSupply",
        accessor: (row: {
          asset: AssetType;
          totalSupply: BigNumber;
          exchangeRate: BigNumber;
          yToken: number;
        }) => ({
          asset: row.asset,
          totalSupply: row.totalSupply,
          exchangeRate: row.exchangeRate,
          yToken: row.yToken,
        }),
        Cell: ({ cell: { value } }: { cell: Cell }) => {
          if (loading) {
            return "—";
          }

          return (
            <PrettyAmount
              amount={calculateUsdTotals(
                value.totalSupply,
                value.yToken,
                value.asset,
                value.exchangeRate
              )}
              // isMinified
              isConvertable
              className={cx(s.blue, s.withTezos)}
            />
          );
        },
      },
      {
        Header: () => <span className={s.blue}>Supply APY</span>,
        accessor: "rates.supplyApy",
        Cell: ({ cell: { value } }: { cell: Cell }) => (
          <span className={s.blue}>
            {loading
              ? "—"
              : getPrettyPercent(
                  convertUnits(value, STANDARD_PRECISION).multipliedBy(1e2)
                )}
          </span>
        ),
      },
      {
        Header: () => <span className={s.blue}># of supplier</span>,
        accessor: "numberOfSuppliers",
        Cell: ({ cell: { value } }: { cell: Cell }) => (
          <span className={s.blue}>{loading ? "—" : value}</span>
        ),
      },
      {
        Header: () => <span className={s.yellow}>Total borrow</span>,
        id: "usdBorrowed",
        accessor: (row: {
          asset: AssetType;
          totalBorrowed: BigNumber;
          yToken: number;
        }) => ({
          asset: row.asset,
          totalBorrowed: row.totalBorrowed,
          yToken: row.yToken,
        }),
        Cell: ({ cell: { value } }: { cell: Cell }) => {
          if (loading) {
            return <span className={s.yellow}>—</span>;
          }

          return (
            <PrettyAmount
              amount={calculateUsdTotals(
                value.totalBorrowed,
                value.yToken,
                value.asset
              )}
              isConvertable
              className={cx(s.yellow, s.withTezos)}
            />
          );
        },
      },
      {
        Header: () => <span className={s.yellow}>Borrow APY</span>,
        accessor: "rates.borrowApy",
        Cell: ({ cell: { value } }: { cell: Cell }) => (
          <span className={s.yellow}>
            {loading
              ? "—"
              : getPrettyPercent(
                  convertUnits(value, STANDARD_PRECISION).multipliedBy(1e2)
                )}
          </span>
        ),
      },
      {
        Header: () => <span className={s.yellow}># of borrowers</span>,
        accessor: "numberOfBorrowers",
        Cell: ({ cell: { value } }: { cell: Cell }) => (
          <span className={s.yellow}>{loading ? "—" : value}</span>
        ),
      },
      {
        Header: () => null,
        accessor: "yToken",
        Cell: ({ cell: { value } }: { cell: Cell }) => (
          <Button
            theme="light"
            href={`${AppRoutes.MARKETS}/${value}`}
            className={s.link}
            disabled={loading}
          >
            Details
          </Button>
        ),
      },
    ],
    [loading]
  );

  return (
    <Table
      theme="tertiary"
      columns={columns}
      data={data ?? [0, 1, 2]}
      loading={loading}
      emptyText="There is no supply assets"
      tableClassName={s.bigTable}
      rowClassName={s.marketsRow}
      className={cx(s.bigTableWrapper, className)}
    />
  );
};
