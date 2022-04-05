import React, { FC, useCallback } from "react";

import cx from "classnames";

import { events } from "constants/analytics";
import { HeaderNavType } from "types/analytics";
import { AnalyticsEventCategory } from "utils/analytics/analytics-event";
import { useAnalytics } from "hooks/useAnalytics";
import { NAVBAR_LIST } from "constants/navl-list";
import { Button } from "components/ui/Button";

import s from "./NavList.module.sass";

type NavListProps = {
  itemClassName?: string;
  setIsOpenDropdown?: (arg: boolean) => void;
  className?: string;
};

export const NavList: FC<NavListProps> = ({
  itemClassName,
  setIsOpenDropdown,
  className,
}) => {
  const { trackEvent } = useAnalytics(true);

  const handleLink = useCallback(
    (item: string) => {
      setIsOpenDropdown?.(false);

      // Analytics track
      trackEvent(
        events.header.links[item as HeaderNavType],
        AnalyticsEventCategory.HEADER
      );
    },
    [setIsOpenDropdown, trackEvent]
  );

  return (
    <nav className={cx(s.root, className)}>
      {NAVBAR_LIST.map(({ item, href, id }) => (
        <Button
          key={id}
          href={href}
          sizeT="small"
          theme="clear"
          onClick={() => handleLink(item)}
          className={cx(s.nav, itemClassName)}
          activeClassName={s.active}
        >
          {item}
        </Button>
      ))}
    </nav>
  );
};
