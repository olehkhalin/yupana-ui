import { Analytics, AnalyticsBrowser } from "@segment/analytics-next";
import { ANALYTICS_WRITE_KEY } from "constants/defaults";

export enum AnalyticsEventCategory {
  SWITCHER = "SWITCHER",
  LINK = "LINK",
  BUTTON = "BUTTON",
  SUBMIT_BUTTON = "SUBMIT_BUTTON",
  OPEN_MODAL_BUTTON = "OPEN_MODAL_BUTTON",
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
    properties: {
      ...additionalProperties,
    },
  });
};
