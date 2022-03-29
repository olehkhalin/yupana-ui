import { Analytics, AnalyticsBrowser } from "@segment/analytics-next";
import { ANALYTICS_WRITE_KEY } from "constants/defaults";

export enum AnalyticsEventCategory {
  SUBMIT_BUTTON = "SUBMIT_BUTTON",
  OPEN_PAGE = "OPEN_PAGE",
  OPEN_MODAL = "OPEN_MODAL",
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
  category: AnalyticsEventCategory = AnalyticsEventCategory.OPEN_PAGE,
  properties?: any
) => {
  const analyticsClient = await getClient();
  analyticsClient.track({
    userId,
    type: "track",
    event: `${category} ${event}`,
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
  path: string,
  search: string,
  additionalProperties = {}
) => {
  const url = `${path}${search}`;

  const analyticsClient = await getClient();
  analyticsClient.page({
    userId,
    name: path,
    timestamp: new Date(),
    category: AnalyticsEventCategory.OPEN_PAGE,
    properties: {
      url,
      path: search,
      referrer: path,
      category: AnalyticsEventCategory.OPEN_PAGE,
      ...additionalProperties,
    },
  });
};
