import React from 'react';

import { Modal } from 'components/ui/Modal';
import { Button } from 'components/ui/Button';

import s from 'components/common/Popups/Liquidation/Liquidation.module.sass';

type LiquidationProps = {
  title: string
  description: string
  isOpen: boolean
  onRequestClose: () => void
};

export const Liquidation: React.FC<LiquidationProps> = ({
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
