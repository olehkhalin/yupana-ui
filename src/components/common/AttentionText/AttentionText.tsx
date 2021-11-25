import React, { useState, useCallback } from 'react';
import cx from 'classnames';

import { Button } from 'components/ui/Button';
import { InformationModal } from 'components/popups/InformationModal';
import { ReactComponent as Attention } from 'svg/Attention.svg';

import s from './AttentionText.module.sass';

export interface AttentionTextProps {
  text: string
  title?: string
  description?: string
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
  title,
  description,
  theme = 'primary',
  icon = true,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = useCallback(
    () => setIsOpen(!isOpen),
    [isOpen],
  );

  return (
    <div className={cx(s.root, themeClasses[theme], className)}>
      {text}

      {icon && (
      <Button
        theme="clear"
        onClick={handleModal}
        className={s.attention}
      >
        <Attention className={s.attentionIcon} />
      </Button>
      )}

      {icon && title && description && (
      <InformationModal
        title={title}
        description={description}
        isOpen={isOpen}
        onRequestClose={handleModal}
        onClick={handleModal}
      />
      )}
    </div>
  );
};
