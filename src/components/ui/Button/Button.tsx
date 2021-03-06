import React, { FC, HTMLProps } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import cx from "classnames";

import { ReactComponent as Arrow } from "svg/Arrow.svg";

import s from "./Button.module.sass";

export type HTMLButtonType =
  | HTMLProps<HTMLButtonElement>
  | HTMLProps<HTMLAnchorElement>;

export type ButtonProps = {
  theme?: keyof typeof themeClass;
  sizeT?: keyof typeof sizeClass;
  actionT?: "supply" | "borrow";
  withArrow?: boolean;
  external?: boolean;
  className?: string;
  activeClassName?: string;
} & HTMLButtonType;

const actionClass = {
  supply: s.supply,
  borrow: s.borrow,
};

const themeClass = {
  primary: s.primary,
  secondary: s.secondary,
  tertiary: s.tertiary,
  light: s.light,
  accent: s.accent,
  clear: s.clear,
};

const sizeClass = {
  large: s.large,
  medium: s.medium,
  small: s.small,
};

export const Button: FC<ButtonProps> = ({
  theme = "primary",
  sizeT = "large",
  type = "button",
  actionT = "supply",
  withArrow = false,
  href,
  external = false,
  className,
  activeClassName,
  children,
  ...props
}) => {
  const classNames = cx(
    s.root,
    themeClass[theme],
    sizeClass[sizeT],
    { [s.withArrow]: withArrow && (theme === "light" || theme === "accent") },
    actionClass[actionT],
    className
  );

  const inner = (
    <>
      {children}
      {withArrow && (theme === "light" || theme === "accent") && (
        <Arrow className={s.arrow} />
      )}
    </>
  );

  if (href) {
    if (props.disabled) {
      return <span className={classNames}>{inner}</span>;
    }
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className={classNames}
          {...(props as HTMLProps<HTMLAnchorElement>)}
        >
          {inner}
        </a>
      );
    }
    return (
      <NavLink
        {...(props as NavLinkProps)}
        to={href}
        className={({ isActive }) =>
          cx(classNames, isActive && cx(s.active, activeClassName))
        }
      >
        {inner}
      </NavLink>
    );
  }

  return (
    <button
      // @ts-ignore
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={classNames}
      {...props}
    >
      {inner}
    </button>
  );
};
