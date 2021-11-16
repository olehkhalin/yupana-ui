import React from 'react';

import { Modal } from 'components/ui/Modal';
import { Button } from 'components/ui/Button';

import s from 'components/common/Popups/Disclaimer.module.sass';

type DisclaimerProps = {
  title: string
  description: string
  isOpen: boolean
  onRequestClose: () => void
};

export const Disclaimer: React.FC<DisclaimerProps> = ({
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
        I AGREE
      </Button>
    </div>
  </Modal>
);
