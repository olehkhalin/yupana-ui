import React from 'react';

import Lending from 'pages/lenging';
import Markets from 'pages/markets';
import UiKit from 'pages/ui-kit';

import { AppRoutes } from './main-routes';

export type RoutesType = {
  id: number
  path: string
  status?: number
  Component: React.FC
};

export const components: RoutesType[] = [
  {
    id: 0,
    path: AppRoutes.UIKIT,
    Component: UiKit,
  },
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
];
