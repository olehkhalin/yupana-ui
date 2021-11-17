import React from 'react';

import { Modal } from 'components/ui/Modal';
import { Button } from 'components/ui/Button';
import { ReactComponent as IconCopy } from 'svg/IconCopy.svg';
import { ReactComponent as IconLink } from 'svg/IconLink.svg';

import s from 'components/common/Popups/Account/Account.module.sass';

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
  >
    <div className={s.root}>
      <Button
        sizeT="small"
        action="borrow"
        theme="accent"
      >
        LOG OUT
      </Button>
      <h2 className={s.title}>
        {title}
      </h2>
      <div className={s.description}>
        {description}
      </div>
      <div className={s.address}>
        {address}
      </div>
      <div className={s.options}>
        <div className={s.option}>
          <p>View on explorer</p>
          <IconCopy />
        </div>
        <div className={s.option}>
          <p>Copy Address</p>
          <IconLink />
        </div>
      </div>
    </div>
  </Modal>
);
