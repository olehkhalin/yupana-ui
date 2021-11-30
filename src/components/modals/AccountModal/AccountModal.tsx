import React from 'react';

import { shortize } from 'utils/getShortize';
import { useWiderThanMphone } from 'utils/getMediaQuery';
import { ModalActions } from 'types/modal';
import { Modal } from 'components/ui/Modal';
import { Button } from 'components/ui/Button';
import { ModalHeader } from 'components/modals/components/ModalHeader';
import { ReactComponent as IconCopy } from 'svg/IconCopy.svg';
import { ReactComponent as IconLink } from 'svg/IconLink.svg';

import s from './AccountModal.module.sass';

type AccountModalProps = {
  address: string
} & ModalActions;

export const AccountModal: React.FC<AccountModalProps> = ({
  title,
  description,
  address,
  isOpen,
  onRequestClose,
}) => {
  const isWiderThanMphone = useWiderThanMphone();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <Button
        theme="clear"
        className={s.logout}
      >
        log out
      </Button>
      <ModalHeader
        title={title}
        description={description}
        className={s.root}
      />
      <div className={s.address}>
        {isWiderThanMphone ? address : shortize(address)}
      </div>
      <div className={s.options}>
        <Button
          theme="clear"
          className={s.button}
        >
          View on explorer
          <IconLink className={s.icon} />
        </Button>
        <Button
          theme="clear"
          className={s.button}
        >
          Copy Address
          <IconCopy className={s.icon} />
        </Button>
      </div>
    </Modal>
  );
};
