import React from 'react';
import cx from 'classnames';

import { getUniqueKey } from 'utils/getUniqueKey';
import { useLphoneOrWider } from 'utils/getMediaQuery';

import s from './Markets.module.sass';

import { MarketsCard } from '../mobile';
import { Markets as MarketsDesktop } from '../desktop';

type MarketsProps = {
  data: any[]
  className?: string
};

export const Markets: React.FC<MarketsProps> = ({
  data,
  className,
}) => {
  const isLphoneOrWider = useLphoneOrWider();

  if (isLphoneOrWider) {
    return (
      <MarketsDesktop
        data={data}
        className={className}
      />
    );
  }

  return (
    <div className={cx(s.root, className)}>
      {
        data.map((el) => (
          <MarketsCard
            key={getUniqueKey()}
            {...el}
            className={s.item}
          />
        ))
      }
    </div>
  );
};
