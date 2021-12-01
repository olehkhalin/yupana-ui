import React from 'react';

import { ModalActions } from 'types/modal';
import { Modal } from 'components/ui/Modal';
import { Button } from 'components/ui/Button';
import { ModalHeader } from 'components/common/ModalHeader';

type InformationModalProps = {
  buttonText?: string
} & ModalActions;

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
  >
    <ModalHeader
      title={title}
      description={description}
    />
    <Button
      sizeT="small"
      onClick={onRequestClose}
    >
      {buttonText}
    </Button>
  </Modal>
);
