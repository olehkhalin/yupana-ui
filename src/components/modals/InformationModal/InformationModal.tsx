import React, { FC } from "react";

import { ModalProps } from "types/modal";
import { Modal } from "components/ui/Modal";
import { ModalHeader } from "components/ui/Modal/ModalHeader";
import { Button } from "components/ui/Button";

export const InformationModal: FC<ModalProps> = ({
  title,
  description,
  buttonText = "Ok, I got it",
  isOpen,
  onRequestClose,
}) => (
  <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
    <ModalHeader title={title} description={description} />
    <Button sizeT="small" onClick={onRequestClose}>
      {buttonText}
    </Button>
  </Modal>
);
