import React, { useCallback } from 'react';

import { shortize } from 'utils/getShortize';
import { useWiderThanMphone } from 'utils/getMediaQuery';
import { useDisconnect } from 'utils/dapp';
import { ModalActions } from 'types/modal';
import { Modal } from 'components/ui/Modal';
import { Button } from 'components/ui/Button';
import { ModalHeader } from 'components/popups/components/ModalHeader';
import { ReactComponent as IconCopy } from 'svg/IconCopy.svg';
import { ReactComponent as IconLink } from 'svg/IconLink.svg';

import s from './Account.module.sass';

type AccountProps = {
  address: string
} & ModalActions;

export const Account: React.FC<AccountProps> = ({
  address,
  isOpen,
  onRequestClose,
}) => {
  const disconnect = useDisconnect();
  const isWiderThanMphone = useWiderThanMphone();

  const tzktLink = `${process.env.REACT_APP_TZKT_BASE_URL}/${address}`;

  const handleCopyToClipboard = useCallback(
    () => {
      console.log(tzktLink);
    },
    [tzktLink],
  );

  const handleLogout = useCallback(() => {
    disconnect();
    onRequestClose();
  }, [disconnect, onRequestClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <Button
        theme="clear"
        onClick={handleLogout}
        className={s.logout}
      >
        log out
      </Button>
      <ModalHeader
        title="Account"
        description="Connected wallet address:"
        className={s.root}
      />
      <div className={s.address}>
        {isWiderThanMphone ? address : shortize(address)}
      </div>
      <div className={s.options}>
        <Button
          theme="clear"
          href={tzktLink}
          external
          className={s.button}
        >
          View on explorer
          <IconLink className={s.icon} />
        </Button>
        <Button
          theme="clear"
          onClick={handleCopyToClipboard}
          className={s.button}
        >
          Copy Address
          <IconCopy className={s.icon} />
        </Button>
      </div>
    </Modal>
  );
};
