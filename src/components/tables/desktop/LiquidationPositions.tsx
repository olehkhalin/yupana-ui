import React, { FC, useMemo, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { Cell } from "react-table";
import cx from "classnames";

import { events } from "constants/analytics";
import { LIQUIDATION_POSITIONS_ITEMS_PER_PAGE } from "constants/defaults";
import { LIQUIDATABLE_POSITIONS } from "constants/popups/liquidatable-positions";
import { AnalyticsEventCategory } from "utils/analytics/analytics-event";
import { getPrettyPercent } from "utils/helpers/amount";
import { shortize } from "utils/helpers/asset";
import { LiquidationPositionsType } from "utils/helpers/api";
import { useAnalytics } from "hooks/useAnalytics";
import { Table } from "components/ui/Table";
import { Button } from "components/ui/Button";
import {
  AttentionText,
  TooltipCategoryEnum,
} from "components/common/AttentionText";
import { PrettyAmount } from "components/common/PrettyAmount";
import { AppRoutes } from "routes/main-routes";

import s from "./Tables.module.sass";

type LiquidationPositionsProps = {
  data?: LiquidationPositionsType[];
  loading?: boolean;
  pageCount: number;
  pageSize?: number;
  setOffset: (arg: number) => void;
  className?: string;
};

export const LiquidationPositions: FC<LiquidationPositionsProps> = ({
  data,
  loading,
  pageCount,
  setOffset,
  pageSize,
  className,
}) => {
  const { trackEvent } = useAnalytics();

  // Analytics track
  const handleDetailsTrack = useCallback(
    (borrower: string) => {
      trackEvent(events.liquidate.details, AnalyticsEventCategory.LIQUIDATE, {
        borrower_address: borrower,
      });
    },
    [trackEvent]
  );

  const columns = useMemo(
    () => [
      {
        Header: () => <span className={s.white}>Borrower address</span>,
        accessor: "borrowerAddress",
        Cell: ({ cell: { value } }: { cell: Cell }) => (
          <NavLink
            to={`${AppRoutes.LIQUIDATE}/${value}`}
            onClick={() => handleDetailsTrack(value)}
            className={cx(s.address, s.white, s.noShadow)}
          >
            {loading || !value ? "—" : shortize(value)}
          </NavLink>
        ),
      },
      {
        Header: () => <span className={s.yellow}>Total borrow</span>,
        accessor: "totalBorrowed",
        Cell: ({ cell: { value } }: { cell: Cell }) => (
          <span className={s.yellow}>
            {loading || !value ? (
              "—"
            ) : (
              <PrettyAmount
                amount={value}
                theme="secondary"
                tooltipTheme="secondary"
                withLight
                isConvertable
              />
            )}
          </span>
        ),
      },
      {
        Header: () => (
          <AttentionText
            text="Health factor"
            name="health_factor"
            theme="secondary"
            category={TooltipCategoryEnum.LIQUIDATE}
            title={LIQUIDATABLE_POSITIONS.healthFactor.title}
            description={LIQUIDATABLE_POSITIONS.healthFactor.description}
          />
        ),
        accessor: "healthFactor",
        Cell: ({ cell: { value } }: { cell: Cell }) => (
          <span className={s.yellow}>
            {loading || !value ? "—" : getPrettyPercent(value)}
          </span>
        ),
      },
      {
        Header: () => <span className={s.yellow}>Borrowed asset</span>,
        accessor: "borrowedAssetsNames",
        Cell: ({ cell: { value } }: { cell: Cell }) => (
          <span className={s.yellow}>
            {loading || !value ? "—" : value.join(", ")}
          </span>
        ),
      },
      {
        Header: () => <span className={s.blue}>Collateral asset</span>,
        accessor: "collateralAssetsNames",
        Cell: ({ cell: { value } }: { cell: Cell }) => (
          <span className={s.blue}>
            {loading || !value ? "—" : value.join(", ")}
          </span>
        ),
      },
      {
        Header: () => null,
        id: "link",
        accessor: "borrowerAddress",
        Cell: ({ cell: { value } }: { cell: Cell }) => (
          <Button
            theme="light"
            href={`${AppRoutes.LIQUIDATE}/${value}`}
            disabled={loading}
            onClick={() => handleDetailsTrack(value)}
            className={s.link}
          >
            Liquidate
          </Button>
        ),
      },
    ],
    [handleDetailsTrack, loading]
  );

  return (
    <Table
      theme="tertiary"
      columns={columns}
      data={
        data ?? Array.from(Array(LIQUIDATION_POSITIONS_ITEMS_PER_PAGE).keys())
      }
      loading={loading}
      pageCount={pageCount}
      setOffset={setOffset}
      pageSize={pageSize}
      emptyText="There is no positions for liquidation"
      isPaginated
      tableClassName={s.bigTableLiquidate}
      rowClassName={cx(s.liquidationRow, { [s.white]: !(data && data.length) })}
      className={cx(s.bigTableWrapper, className)}
    />
  );
};
