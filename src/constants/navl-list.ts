import { AppRoutes } from "routes/main-routes";

type NavBarListProps = {
  id: number;
  item: string;
  href: string;
};

export const NAVBAR_LIST: NavBarListProps[] = [
  {
    id: 1,
    item: "Lending",
    href: AppRoutes.LENDING,
  },
  {
    id: 2,
    item: "Markets",
    href: AppRoutes.MARKETS,
  },
  {
    id: 3,
    item: "Liquidate",
    href: AppRoutes.LIQUIDATE,
  },
];
