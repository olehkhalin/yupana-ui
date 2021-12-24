import React from 'react';

import { getUniqueKey, useWiderThanLphone } from 'utils/helpers';
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
  const isWiderThanLphone = useWiderThanLphone();

  if (isWiderThanLphone) {
    return (
      <LiquidateDesktop
        data={data}
        className={className}
      />
    );
  }

  return (
    <>
      <LiquidateCard
        key={getUniqueKey()}
        data={data[0]}
      />
    </>
  );
};
