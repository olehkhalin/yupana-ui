import React from 'react';

import { getUniqueKey } from 'utils/getUniqueKey';
import { useWiderThanLphone } from 'utils/getMediaQuery';
import { Liquidate as LiquidateDesktop } from 'components/tables/components/desktop';
import { LiquidateCard } from 'components/tables/components/mobile';

type LiquidateProps = {
  data: any[]
  loading: boolean
  className?: string
};

export const Liquidate: React.FC<LiquidateProps> = ({
  data,
  loading,
  className,
}) => {
  const isWiderThanLphone = useWiderThanLphone();

  if (isWiderThanLphone) {
    return (
      <LiquidateDesktop
        data={data}
        loading={loading}
        className={className}
      />
    );
  }

  return (
    <>
      <LiquidateCard
        key={getUniqueKey()}
        loading={loading}
        {...data[0]}
      />
    </>
  );
};
