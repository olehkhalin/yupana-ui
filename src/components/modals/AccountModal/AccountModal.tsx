import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import cx from 'classnames';

import { shortize } from 'utils/getShortize';
import { useWiderThanMphone } from 'utils/getMediaQuery';
import { ModalActions } from 'types/modal';
import { Modal } from 'components/ui/Modal';
import { Button } from 'components/ui/Button';
import { ModalHeader } from 'components/common/ModalHeader';
import { ReactComponent as IconCopy } from 'svg/IconCopy.svg';
import { ReactComponent as IconLink } from 'svg/IconLink.svg';
import { ReactComponent as Success } from 'svg/Success.svg';

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
  const [success, setSuccess] = useState<boolean>(false);

  const handleSetSuccessOfCopy = () => {
    if (!success) {
      setSuccess(true);

      setTimeout(() => setSuccess(false), 2000);
    }
  };

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
        <CopyToClipboard
          text={address}
          onCopy={handleSetSuccessOfCopy}
        >
          <Button
            theme="clear"
            className={s.button}
          >
            Copy address
            <div className={cx(s.iconsWrapper, { [s.success]: success })}>
              <Success className={s.arrow} />
              <IconCopy className={s.clipboard} />
            </div>
          </Button>
        </CopyToClipboard>
      </div>
    </Modal>
  );
};
