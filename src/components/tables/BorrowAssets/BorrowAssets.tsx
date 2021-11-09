import React from 'react';
import cx from 'classnames';

import { useLphoneOrWider } from 'utils/mediaQuery';

import s from './BorrowAssets.module.sass';
import { BorrowAssetsCard } from '../mobile';
import { BorrowAssets as BorrowAssetsDesktop } from '../desktop';

type BorrowAssetsProps = {
  data: any[]
  className?: string
};

export const BorrowAssets: React.FC<BorrowAssetsProps> = ({
  data,
  className,
}) => {
  const isLphoneOrWider = useLphoneOrWider();

  if (isLphoneOrWider) {
    return (
      <BorrowAssetsDesktop data={data} className={className} />
    );
  }

  return (
    <div className={cx(s.root, className)}>
      {
        data.map((el) => (
          <BorrowAssetsCard key={el.address} {...el} className={s.item} />
        ))
      }
    </div>
  );
};
