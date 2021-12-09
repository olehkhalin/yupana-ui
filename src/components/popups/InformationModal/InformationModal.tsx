import React from 'react';

import { ModalInterface } from 'types/modal';
import { Modal } from 'components/ui/Modal';
import { Button } from 'components/ui/Button';
import { ModalHeader } from 'components/popups/components';

type InformationModalProps = {
  buttonText?: string
} & ModalInterface;

export const InformationModal: React.FC<InformationModalProps> = ({
  title,
  description,
  buttonText = 'Ok, I got it',
  isOpen,
  onRequestClose,
  onClick,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
  >
    <ModalHeader
      title={title}
      description={description}
    />
    <Button
      sizeT="small"
      onClick={onClick}
    >
      {buttonText}
    </Button>
  </Modal>
);
