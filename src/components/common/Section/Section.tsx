import React, { FC } from "react";
import cx from "classnames";

import { Heading, HeadingProps } from "components/common/Heading";

import s from "./Section.module.sass";

type SectionProps = {
  title?: string;
  headingClassName?: string;
  className?: string;
} & Omit<HeadingProps, "title">;

export const Section: FC<SectionProps> = ({
  title,
  headingClassName,
  className,
  children,
  ...props
}) => (
  <section className={cx(s.root, className)}>
    {title && <Heading title={title} className={headingClassName} {...props} />}
    {children}
  </section>
);
