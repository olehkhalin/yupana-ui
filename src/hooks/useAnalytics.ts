import { useCallback, useEffect, useMemo, useState } from "react";
import { nanoid } from "nanoid";
import BigNumber from "bignumber.js";

import {
  AnalyticsEventCategory,
  sendPageEvent,
  sendTrackEvent,
} from "utils/analytics/analytics-event";

const USER_ID_KEY = "analytics-user-id";

export const useAnalytics = (referer?: boolean) => {
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
      properties?: { [key: string]: string | number | BigNumber }
    ) => {
      if (referer) {
        return sendTrackEvent(userId, event, category, {
          ...properties,
          referer: window.location.href,
        });
      }
      return sendTrackEvent(userId, event, category, properties);
    },
    [referer, userId]
  );

  const pageEvent = useCallback(
    (
      name: string,
      category: string,
      properties?: { [key: string]: string | number | BigNumber }
    ) => {
      if (referer) {
        return sendPageEvent(userId, name, category, {
          ...properties,
          referer: window.location.href,
        });
      }
      return sendPageEvent(userId, name, category, properties);
    },
    [referer, userId]
  );

  return {
    trackEvent,
    pageEvent,
  };
};
