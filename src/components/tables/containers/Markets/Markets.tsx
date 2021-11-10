import React from 'react';
import cx from 'classnames';

import { getUniqueKey } from 'utils/getUniqueKey';
import { useLphoneOrWider } from 'utils/getMediaQuery';
import { MarketsCard } from 'components/tables/components/mobile';
import { Markets as MarketsDesktop } from 'components/tables/components/desktop';

import s from './Markets.module.sass';

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
        data.map(({
          market: tokenMetadata, ...rest
        }) => (
          <MarketsCard
            key={getUniqueKey()}
            {...tokenMetadata}
            {...rest}
            className={s.item}
          />
        ))
      }
    </div>
  );
};
