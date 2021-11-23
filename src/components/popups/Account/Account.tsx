import React from 'react';

import { shortize } from 'utils/getShortize';
import { useWiderThanMphone } from 'utils/getMediaQuery';
import { Modal } from 'components/ui/Modal';
import { Button } from 'components/ui/Button';
import { ModalHeader } from 'components/popups/components/ModalHeader';
import { ReactComponent as IconCopy } from 'svg/IconCopy.svg';
import { ReactComponent as IconLink } from 'svg/IconLink.svg';

import s from './Account.module.sass';

type AccountProps = {
  title: string
  description: string
  address: string
  isOpen: boolean
  onRequestClose: () => void
};

export const Account: React.FC<AccountProps> = ({
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
      innerClassName={s.inner}
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
        className={s.head}
      />
      <div className={s.address}>
        {isWiderThanMphone ? address : shortize(address)}
      </div>
      <div className={s.options}>
        <Button
          theme="clear"
          className={s.button}
        >
          <p className={s.optionName}>
            View on explorer
          </p>
          <IconLink />
        </Button>
        <Button
          theme="clear"
          className={s.button}
        >
          <p className={s.optionName}>
            Copy Address
          </p>
          <IconCopy />
        </Button>
      </div>
    </Modal>
  );
};
