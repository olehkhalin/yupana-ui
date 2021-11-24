import React from 'react';
import cx from 'classnames';

import { Button } from 'components/ui/Button';
import { ReactComponent as Attention } from 'svg/Attention.svg';

import s from './AttentionText.module.sass';

export interface AttentionTextProps {
  text: string
  theme?: keyof typeof themeClasses
  icon?: boolean
  className?: string
}

export const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const AttentionText: React.FC<AttentionTextProps> = ({
  text,
  theme = 'primary',
  icon = true,
  className,
}) => (
  <div className={cx(s.root, themeClasses[theme], className)}>
    {text}

    {icon && (
    <Button
      theme="clear"
      className={s.attention}
    >
      <Attention className={s.attentionIcon} />
    </Button>
    )}

    {/* TODO: Information modal, props: title, description */}
  </div>
);
