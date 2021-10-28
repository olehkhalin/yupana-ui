import React from 'react';
import cx from 'classnames';

import { Button } from 'components/ui/Button';

import s from './Heading.module.sass';

type HeadingProps = {
  title: string
  link?: {
    label: string
    link: string
    external?: boolean
  }
  theme?: keyof typeof themeClass
  className?: string
};

const themeClass = {
  primary: s.primary,
  secondary: s.secondary,
};

export const Heading: React.FC<HeadingProps> = ({
  title,
  link,
  theme = 'primary',
  className,
}) => (
  <>
    <h2 className={cx(s.header, { [s.withLink]: !!link }, themeClass[theme], className)}>
      {title}
    </h2>
    {link && (
      <Button
        href={link.link}
        external={link.external ?? false}
        className={s.link}
        theme="light"
        sizeT="small"
        withArrow
      >
        {link.label}
      </Button>
    )}
  </>
);
