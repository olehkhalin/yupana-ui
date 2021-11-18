import React from 'react';
import cx from 'classnames';

import { Heading, HeadingProps } from 'components/common/Heading';

import s from './Section.module.sass';

type SectionProps = {
  className?: string
} & HeadingProps;

export const Section: React.FC<SectionProps> = ({
  className,
  children,
  ...props
}) => (
  <section className={cx(s.root, className)}>
    <Heading {...props} />
    {children}
  </section>
);
