import React from 'react';

import { shortize } from 'utils/getShortize';
import { useMphoneOrWider } from 'utils/getMediaQuery';
import { Modal } from 'components/ui/Modal';
import { Button } from 'components/ui/Button';
import { ReactComponent as IconCopy } from 'svg/IconCopy.svg';
import { ReactComponent as IconLink } from 'svg/IconLink.svg';
import { ModalHeader } from '../components';

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
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    innerClassName={s.inner}
    className={s.root}
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
      {useMphoneOrWider() ? address : shortize(address)}
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
