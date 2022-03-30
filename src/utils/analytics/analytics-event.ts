import { Analytics, AnalyticsBrowser } from "@segment/analytics-next";
import { ANALYTICS_WRITE_KEY } from "constants/defaults";

export enum AnalyticsEventCategory {
  LOAD_PAGE = "load_page",
  HEADER = "header",
  FOOTER = "footer",
  ACCOUNT_POPUP = "account_popup",
  CONNECT_WALLET_POPUP = "connect_wallet_popup",
  INSTALL_WALLET = "install_wallet_popup",
  LENDING = "lending",
  MARKETS = "markets",
  MARKETS_DETAILS = "markets_details",
  LIQUIDATE = "liquidate",
  LIQUIDATE_DETAILS = "liquidate_details",
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
  properties?: any
) => {
  const analyticsClient = await getClient();
  analyticsClient.track({
    userId,
    type: "track",
    event: `${category}: ${event}`,
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
  additionalProperties = {}
) => {
  const analyticsClient = await getClient();
  analyticsClient.page({
    userId,
    name,
    timestamp: new Date(),
    category,
    path: `${category}: ${name}`,
    properties: {
      ...additionalProperties,
    },
  });
};
