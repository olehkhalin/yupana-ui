import React, { FC, useCallback, useState } from "react";
import cx from "classnames";

import { AnalyticsEventCategory } from "utils/analytics/analytics-event";
import { events } from "constants/analytics";
import { useAnalytics } from "hooks/useAnalytics";
import { Button } from "components/ui/Button";
import { Container } from "components/common/Container";
import { ConnectWalletButton } from "components/common/ConnectWalletButton";
import { ReactComponent as Logo } from "svg/Logo.svg";
import { ReactComponent as LogoMobile } from "svg/LogoMobile.svg";
import { YUPANA_LANDING_LINK } from "constants/defaults";

import { Burger } from "./Burger";
import { NavList } from "./NavList";
import { CurrencySwitcher } from "./CurrencySwitcher";
import s from "./Header.module.sass";

type HeaderProps = {
  className?: string;
};

export const Header: FC<HeaderProps> = ({ className }) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const { trackEvent } = useAnalytics();

  const handleSwitchDropdown = useCallback(
    () => setIsOpenDropdown(!isOpenDropdown),
    [isOpenDropdown]
  );

  const handleLogotype = useCallback(() => {
    trackEvent(events.header.links.logotype, AnalyticsEventCategory.HEADER);
  }, [trackEvent]);

  return (
    <header className={cx(s.root, className)}>
      <div className={s.headerWrapper}>
        <Container className={s.container}>
          <Button
            href={YUPANA_LANDING_LINK}
            onClick={handleLogotype}
            external
            theme="clear"
            className={s.logotype}
          >
            <Logo className={cx(s.logo, s.logoDesktop)} />
            <LogoMobile className={cx(s.logo, s.logoMobile)} />
          </Button>

          <div className={s.content}>
            <NavList
              itemClassName={s.navItem}
              className={cx(s.navlist, s.desktop)}
            />

            <ConnectWalletButton />

            <CurrencySwitcher className={s.currencySwitcher} />
          </div>

          <Burger
            opened={isOpenDropdown}
            handleSwitchDropdown={handleSwitchDropdown}
            className={cx(s.burger, s.mobile)}
          />
        </Container>
      </div>

      <div className={cx(s.dropdown, s.mobile, { [s.active]: isOpenDropdown })}>
        <NavList
          itemClassName={s.navItem}
          setIsOpenDropdown={setIsOpenDropdown}
          className={cx(s.navlist, s.desktop)}
        />
      </div>
    </header>
  );
};
