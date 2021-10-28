import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import { Button } from 'components/ui/Button';
import { Burger } from 'components/common/Burger';
import { Container } from 'components/common/Container';
import { NavList } from 'components/common/NavList';
import { CurrencySwitcher } from 'components/common/CurrencySwitcher';
import { ReactComponent as Logo } from 'svg/Logo.svg';
import { AppRoutes } from 'routes/main-routes';

import s from './Header.module.sass';

type HeaderProps = {
  className?: string
};

export const Header: React.FC<HeaderProps> = ({
  className,
}) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);

  const handleSwitchDropdown = useCallback(
    () => setIsOpenDropdown(!isOpenDropdown),
    [isOpenDropdown],
  );

  return (
    <header className={cx(s.root, className)}>
      <div className={s.headerWrapper}>
        <Container className={s.container}>
          <Link
            to={AppRoutes.LENDING}
            className={s.logotype}
          >
            <Logo className={s.logo} />
          </Link>

          <div className={s.content}>
            <NavList
              itemClassName={s.navItem}
              className={cx(s.navlist, s.desktop)}
            />

            <Button
              sizeT="medium"
              theme="primary"
              className={cx(s.connectWallet, s.desktop)}
            >
              Connect wallet
            </Button>

            <Button
              sizeT="small"
              theme="primary"
              className={cx(s.connectWallet, s.mobile)}
            >
              Connect
            </Button>

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
          className={cx(s.navlist, s.desktop)}
        />
      </div>
    </header>
  );
};
