import React from 'react';

import { getUniqueKey } from 'utils/getUniqueKey';
import { useLphoneOrWider } from 'utils/getMediaQuery';
import { Liquidate as LiquidateDesktop } from 'components/tables/components/desktop';
import { LiquidateCard } from 'components/tables/components/mobile';

type LiquidateProps = {
  data: any[]
  className?: string
};

export const Liquidate: React.FC<LiquidateProps> = ({
  data,
  className,
}) => {
  const isLphoneOrWider = useLphoneOrWider();

  if (isLphoneOrWider) {
    return (
      <LiquidateDesktop
        data={data}
        className={className}
      />
    );
  }

  return (
    <div className={className}>
      <LiquidateCard
        key={getUniqueKey()}
        {...data[0]}
      />
    </div>
  );
};
