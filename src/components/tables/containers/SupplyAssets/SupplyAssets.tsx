import React from 'react';
import cx from 'classnames';

import { getUniqueKey } from 'utils/getUniqueKey';
import { useLphoneOrWider } from 'utils/getMediaQuery';
import { SupplyAssetsCard } from 'components/tables/components/mobile';
import { SupplyAssets as SupplyAssetsDesktop } from 'components/tables/components//desktop';

import s from './SupplyAssets.module.sass';

type SupplyAssetsProps = {
  data: any[]
  className?: string
};

export const SupplyAssets: React.FC<SupplyAssetsProps> = ({
  data,
  className,
}) => {
  const isLphoneOrWider = useLphoneOrWider();

  if (isLphoneOrWider) {
    return (
      <SupplyAssetsDesktop
        data={data}
        className={className}
      />
    );
  }

  return (
    <div className={cx(s.root, className)}>
      {
        data.map((el) => (
          <SupplyAssetsCard
            key={getUniqueKey()}
            {...el}
            className={s.item}
          />
        ))
      }
    </div>
  );
};
