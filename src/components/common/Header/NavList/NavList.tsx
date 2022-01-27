import React, { FC } from "react";
import cx from "classnames";

import { NAVBAR_LIST } from "constants/navl-list";
import { Button } from "components/ui/Button";

import s from "./NavList.module.sass";

type NavListProps = {
  itemClassName?: string;
  className?: string;
};

export const NavList: FC<NavListProps> = ({ itemClassName, className }) => (
  <nav className={cx(s.root, className)}>
    {NAVBAR_LIST.map(({ item, href, id }) => (
      <Button
        key={id}
        href={href}
        sizeT="small"
        theme="clear"
        className={cx(s.nav, itemClassName)}
        activeClassName={s.active}
      >
        {item}
      </Button>
    ))}
  </nav>
);
