import React, { FC } from "react";
import cx from "classnames";

import s from "./Container.module.sass";

type ContainerProps = {
  main?: boolean;
  className?: string;
};

export const Container: FC<ContainerProps> = ({
  main = false,
  className,
  children,
}) => {
  const compoundClassNames = cx(s.root, className);

  if (main) {
    return <main className={compoundClassNames}>{children}</main>;
  }

  return <section className={compoundClassNames}>{children}</section>;
};
