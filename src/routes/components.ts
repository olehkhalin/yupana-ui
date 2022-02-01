import { FC } from "react";

import Lending from "pages/lending";
import Markets from "pages/markets";
import LiquidationPositions from "pages/liquidation-positions";
import MarketsDetails from "pages/markets-details";
import Liquidate from "pages/liquidate";

import { AppRoutes } from "./main-routes";

export type RoutesType = {
  id: number;
  path: string;
  status?: number;
  Component: FC;
};

export const components: RoutesType[] = [
  {
    id: 1,
    path: AppRoutes.LENDING,
    Component: Lending,
  },
  {
    id: 2,
    path: AppRoutes.MARKETS,
    Component: Markets,
  },
  {
    id: 3,
    path: AppRoutes.LIQUIDATE,
    Component: LiquidationPositions,
  },
  {
    id: 4,
    path: AppRoutes.MARKETS_DETAILS,
    Component: MarketsDetails,
  },
  {
    id: 5,
    path: AppRoutes.LIQUIDATE_POSITION,
    Component: Liquidate,
  },
];
