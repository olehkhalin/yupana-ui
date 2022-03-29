import { useCallback } from "react";
import { nanoid } from "nanoid";

import {
  AnalyticsEventCategory,
  sendPageEvent,
  sendTrackEvent,
} from "utils/analytics/analytics-event";

import { useLocalStorage } from "./useLocalStorage";

interface AnalyticsStateInterface {
  enabled?: boolean;
  userId: string;
}

export const useAnalytics = () => {
  const [analyticsState] = useLocalStorage<AnalyticsStateInterface>(
    "analytics",
    {
      userId: nanoid(),
    }
  );

  const trackEvent = useCallback(
    (
      event: string,
      category: AnalyticsEventCategory = AnalyticsEventCategory.OPEN_PAGE,
      properties?: any
    ) => sendTrackEvent(analyticsState.userId, event, category, properties),
    [analyticsState.userId]
  );

  const pageEvent = useCallback(
    (path: string, search: string, additionalProperties = {}) =>
      sendPageEvent(analyticsState.userId, path, search, additionalProperties),
    [analyticsState.userId]
  );

  return {
    trackEvent,
    pageEvent,
  };
};
