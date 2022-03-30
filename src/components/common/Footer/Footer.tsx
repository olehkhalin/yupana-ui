import React, { FC, useCallback } from "react";
import cx from "classnames";

import { AnalyticsEventCategory } from "utils/analytics/analytics-event";
import { FOOTER_LIST } from "constants/footer-list";
import { events } from "constants/analytics";
import { useAnalytics } from "hooks/useAnalytics";
import { Button } from "components/ui/Button";
import { Container } from "components/common/Container";

import { SocialLinks } from "./SocialLinks";
import s from "./Footer.module.sass";

type FooterProps = {
  className?: string;
};

export const Footer: FC<FooterProps> = ({ className }) => {
  const { trackEvent } = useAnalytics();

  const handleTrackLink = useCallback(
    (name: string) => {
      const links = events.footer.links as any;
      trackEvent(links[name], AnalyticsEventCategory.FOOTER);
    },
    [trackEvent]
  );

  return (
    <footer className={cx(s.root, className)}>
      <Container className={s.container}>
        <div className={s.row}>
          <SocialLinks />
          <div className={s.links}>
            <div className={s.column}>
              {FOOTER_LIST.slice(0, 3).map(
                ({ id, text, name, to, external }) => (
                  <Button
                    key={id}
                    href={to}
                    external={external}
                    theme="clear"
                    onClick={() => handleTrackLink(name)}
                    className={s.link}
                  >
                    {text}
                  </Button>
                )
              )}
            </div>
            <div className={s.column}>
              {FOOTER_LIST.slice(3, 6).map(
                ({ id, text, name, to, external }) => (
                  <Button
                    key={id}
                    href={to}
                    external={external}
                    theme="clear"
                    onClick={() => handleTrackLink(name)}
                    className={s.link}
                  >
                    {text}
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
        <div className={s.row}>
          <div className={s.copyright}>
            Copyright © {new Date().getFullYear()} Yupana.finance
          </div>
          <div className={s.company}>
            <div className={s.withLove}>Made with 💙</div>
            <div>
              <span className={s.marginRight}>by</span>
              {/* eslint-disable-next-line react/jsx-no-target-blank */}
              <a
                href="https://www.madfish.solutions/"
                target="_blank"
                onClick={() => handleTrackLink("madfish")}
                className={s.owner}
              >
                mad.fish
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
