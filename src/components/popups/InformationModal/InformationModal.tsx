import React from 'react';

import { Modal } from 'components/ui/Modal';
import { Button } from 'components/ui/Button';
import { ModalHeader } from 'components/popups/components';

import s from './InformationModal.module.sass';

type InformationModalProps = {
  title: string
  description: string
  buttonText?: string
  isOpen: boolean
  onRequestClose: () => void
};

export const InformationModal: React.FC<InformationModalProps> = ({
  title,
  description,
  buttonText = 'Ok, I got it',
  isOpen,
  onRequestClose,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    innerClassName={s.inner}
  >
    <ModalHeader
      title={title}
      description={description}
    />
    <Button
      sizeT="small"
    >
      {buttonText}
    </Button>
  </Modal>
);
