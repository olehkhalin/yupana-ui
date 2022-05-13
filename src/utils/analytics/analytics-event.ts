import { Analytics, AnalyticsBrowser } from "@segment/analytics-next";
import BigNumber from "bignumber.js";

import { ANALYTICS_WRITE_KEY } from "constants/defaults";

export enum AnalyticsEventCategory {
  HEADER = "Header",
  FOOTER = "Footer",
  ACCOUNT_POPUP = "Account_pop-up",
  CONNECT_WALLET_POPUP = "Connect_to_a_wallet_pop-up",
  INSTALL_WALLET = "Install_wallet_popup",
  LENDING = "Lending",
  MARKETS = "Markets",
  MARKETS_DETAILS = "Markets_details",
  LIQUIDATE = "Liquidate",
  LIQUIDATE_DETAILS = "Liquidate_details",
  SUPPLY = "Supply",
  BORROW = "Borrow",
  WITHDRAW = "Withdraw",
  REPAY = "Repay",
}

let client: Analytics | undefined;

export const getClient = async () => {
  if (!client) {
    [client] = await AnalyticsBrowser.load({
      writeKey: ANALYTICS_WRITE_KEY,
    });
  }
  return client;
};

export const sendTrackEvent = async (
  userId: string,
  event: string,
  category: AnalyticsEventCategory = AnalyticsEventCategory.LENDING,
  properties?: { [key: string]: number | BigNumber | string }
) => {
  const analyticsClient = await getClient();
  analyticsClient.track({
    userId,
    type: "track",
    event: `${category}/${event}`,
    timestamp: new Date(),
    properties: {
      ...properties,
      event,
      category,
    },
  });
};

export const sendPageEvent = async (
  userId: string,
  name: string,
  category: string,
  properties?: { [key: string]: number | BigNumber | string }
) => {
  const analyticsClient = await getClient();
  analyticsClient.page({
    userId,
    name,
    timestamp: new Date(),
    category,
    path: `${category}/${name}`,
    properties: {
      ...properties,
    },
  });
};
