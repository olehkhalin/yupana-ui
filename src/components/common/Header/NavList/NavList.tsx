import React, { FC, useCallback } from "react";
import cx from "classnames";

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
  const closeDropdown = useCallback(() => {
    setIsOpenDropdown?.(false);
  }, [setIsOpenDropdown]);

  return (
    <nav className={cx(s.root, className)}>
      {NAVBAR_LIST.map(({ item, href, id }) => (
        <Button
          key={id}
          href={href}
          sizeT="small"
          theme="clear"
          onClick={closeDropdown}
          className={cx(s.nav, itemClassName)}
          activeClassName={s.active}
        >
          {item}
        </Button>
      ))}
    </nav>
  );
};
