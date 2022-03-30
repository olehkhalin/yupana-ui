import React, { FC, useCallback } from "react";
import cx from "classnames";

import { AnalyticsEventCategory } from "utils/analytics/analytics-event";
import { NAVBAR_LIST } from "constants/navl-list";
import { Button } from "components/ui/Button";

import s from "./NavList.module.sass";
import { useAnalytics } from "hooks/useAnalytics";
import { events } from "constants/analytics";

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
  const { trackEvent } = useAnalytics();

  const handleLink = useCallback(
    (item: string) => {
      const links = events.header.links as any;
      trackEvent(links[item], AnalyticsEventCategory.HEADER);
      setIsOpenDropdown?.(false);
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
