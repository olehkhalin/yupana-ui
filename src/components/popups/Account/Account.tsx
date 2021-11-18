import React from 'react';

import { Modal } from 'components/ui/Modal';
import { Button } from 'components/ui/Button';
import { shortize } from 'utils/getShortize';
import { useMphoneOrWider } from 'utils/getMediaQuery';
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
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    innerClassName={s.inner}
  >
    <div className={s.root}>
      <Button
        theme="clear"
        className={s.logout}
      >
        log out
      </Button>
      <h2 className={s.title}>
        {title}
      </h2>
      <div className={s.description}>
        {description}
      </div>
      <div className={s.address}>
        {useMphoneOrWider() ? address : shortize(address)}
      </div>
      <div className={s.options}>
        <div className={s.option}>
          <Button
            theme="clear"
            className={s.button}
          >
            <p className={s.optionName}>View on explorer</p>
            <IconCopy />
          </Button>
        </div>
        <div className={s.option}>
          <Button
            theme="clear"
            className={s.button}
          >
            <p className={s.optionName}>Copy Address</p>
            <IconLink />
          </Button>
        </div>
      </div>
    </div>
  </Modal>
);
