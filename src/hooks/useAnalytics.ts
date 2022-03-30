import { useCallback, useEffect, useMemo, useState } from "react";
import { nanoid } from "nanoid";

import {
  AnalyticsEventCategory,
  sendPageEvent,
  sendTrackEvent,
} from "utils/analytics/analytics-event";

const USER_ID_KEY = "analytics-user-id";

export const useAnalytics = () => {
  const analyticsUserId: string | null = useMemo(
    () => JSON.parse(localStorage.getItem(USER_ID_KEY) as string),
    []
  );

  const [userId] = useState<string>(analyticsUserId ?? nanoid());

  useEffect(() => {
    if (!analyticsUserId) {
      localStorage.setItem(USER_ID_KEY, JSON.stringify(userId));
    }
  }, [analyticsUserId, userId]);

  const trackEvent = useCallback(
    (
      event: string,
      category: AnalyticsEventCategory = AnalyticsEventCategory.LENDING,
      properties?: any
    ) => sendTrackEvent(userId, event, category, properties),
    [userId]
  );

  const pageEvent = useCallback(
    (name: string, category: string, additionalProperties = {}) =>
      sendPageEvent(userId, name, category, additionalProperties),
    [userId]
  );

  return {
    trackEvent,
    pageEvent,
  };
};
