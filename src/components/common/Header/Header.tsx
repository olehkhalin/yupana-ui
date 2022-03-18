import React, { FC, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import cx from "classnames";

import { AppRoutes } from "routes/main-routes";
import { Container } from "components/common/Container";
import { ConnectWalletButton } from "components/common/ConnectWalletButton";
import { ReactComponent as Logo } from "svg/Logo.svg";
import { ReactComponent as LogoMobile } from "svg/LogoMobile.svg";

import { Burger } from "./Burger";
import { NavList } from "./NavList";
import { CurrencySwitcher } from "./CurrencySwitcher";
import s from "./Header.module.sass";

type HeaderProps = {
  className?: string;
};

export const Header: FC<HeaderProps> = ({ className }) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);

  const handleSwitchDropdown = useCallback(
    () => setIsOpenDropdown(!isOpenDropdown),
    [isOpenDropdown]
  );

  return (
    <header className={cx(s.root, className)}>
      <div className={s.headerWrapper}>
        <Container className={s.container}>
          <Link to={AppRoutes.LENDING} className={s.logotype}>
            <Logo className={cx(s.logo, s.logoDesktop)} />
            <LogoMobile className={cx(s.logo, s.logoMobile)} />
          </Link>

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
