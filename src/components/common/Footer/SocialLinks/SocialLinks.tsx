import React, { FC, useCallback } from "react";
import cx from "classnames";

import { AnalyticsEventCategory } from "utils/analytics/analytics-event";
import { SOCIAL_LIST } from "constants/social-links";
import { events } from "constants/analytics";
import { useAnalytics } from "hooks/useAnalytics";
import { Button } from "components/ui/Button";

import s from "./SocialLinks.module.sass";

type SocialLinksProps = {
  className?: string;
};

export const SocialLinks: FC<SocialLinksProps> = ({ className }) => {
  const { trackEvent } = useAnalytics();

  const handleTrackLink = useCallback(
    (name: string) => {
      const socials = events.footer.socials as any;
      trackEvent(socials[name], AnalyticsEventCategory.FOOTER);
    },
    [trackEvent]
  );

  return (
    <div className={cx(s.root, className)}>
      {SOCIAL_LIST.map(({ href, id, Icon, name }) => (
        <Button
          key={id}
          href={href}
          theme="clear"
          sizeT="small"
          external
          onClick={() => handleTrackLink(name)}
          className={s.link}
        >
          <Icon className={s.icon} />
        </Button>
      ))}
    </div>
  );
};
