import React, { FC, useCallback } from "react";
import cx from "classnames";

import { AnalyticsEventCategory } from "utils/analytics/analytics-event";
import { events } from "constants/analytics";
import { useAnalytics } from "hooks/useAnalytics";
import { Button } from "components/ui/Button";

import s from "./Heading.module.sass";

export type HeadingProps = {
  title: string;
  link?: {
    label: string;
    link: string;
    name?: string;
    external?: boolean;
  };
  head?: boolean;
  theme?: keyof typeof themeClass;
  className?: string;
};

const themeClass = {
  primary: s.primary,
  secondary: s.secondary,
  tertiary: s.tertiary,
};

export const Heading: FC<HeadingProps> = ({
  title,
  link,
  head = false,
  theme = "primary",
  className,
}) => {
  const { trackEvent } = useAnalytics();

  const handleLink = useCallback(() => {
    if (link && link.name) {
      const docs = events.lending.docs as any;
      trackEvent(docs[link.name], AnalyticsEventCategory.LENDING);
    }
  }, [link, trackEvent]);

  const compoundClassNames = cx(
    s.root,
    { [s.withLink]: !!link },
    { [s.head]: head },
    themeClass[theme],
    className
  );

  return (
    <>
      {head ? (
        <h1 className={compoundClassNames}>{title}</h1>
      ) : (
        <h2 className={compoundClassNames}>{title}</h2>
      )}
      {link && (
        <Button
          href={link.link}
          external={link.external ?? false}
          className={s.link}
          theme="light"
          sizeT="small"
          onClick={handleLink}
          withArrow
        >
          {link.label}
        </Button>
      )}
    </>
  );
};
