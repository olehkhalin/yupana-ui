import React from 'react';

import { Modal } from 'components/ui/Modal';
import { Button } from 'components/ui/Button';

import s from 'components/common/Popups/BaseRate/BaseRate.module.sass';

type BaseRateProps = {
  title: string
  description: string
  isOpen: boolean
  onRequestClose: () => void
};

export const BaseRate: React.FC<BaseRateProps> = ({
  title,
  description,
  isOpen,
  onRequestClose,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    innerClassName={s.inner}
  >
    <div className={s.root}>
      <h2 className={s.title}>
        {title}
      </h2>
      <div className={s.description}>
        {description}
      </div>
      <Button
        sizeT="small"
      >
        Ok, I got it
      </Button>
    </div>
  </Modal>
);
