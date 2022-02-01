import React, { ReactNode } from "react";
import Tippy, { TippyProps } from "@tippyjs/react";
import cx from "classnames";

import s from "./Tooltip.module.sass";

export type TooltipProps = {
  theme?: keyof typeof themeClass;
  content?: ReactNode;
  className?: string;
} & TippyProps;

const themeClass = {
  primary: s.primary,
  secondary: s.secondary,
  tertiary: s.tertiary,
};

export const Tooltip: React.FC<TooltipProps> = ({
  theme = "primary",
  content,
  className,
  children,
  ...props
}) => {
  const compoundClassName = cx(s.root, themeClass[theme], className);

  return (
    <Tippy
      placement="bottom-end"
      className={compoundClassName}
      content={content}
      duration={0}
      interactive
      {...props}
    >
      <div className={cx(s.wrapper)}>{children}</div>
    </Tippy>
  );
};
