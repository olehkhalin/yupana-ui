import React, { useState } from 'react';

import { getUniqueKey, useWiderThanLphone } from 'utils/helpers';
import { getTokenSlug } from 'utils/helpers/token';
import { ReceiveCollateral as ReceiveCollateralDesktop } from 'components/tables/components/desktop';
import { ReceiveCollateralCard } from 'components/tables/components/mobile/ReceiveCollateralCard';

type ReceiveCollateralProps = {
  data: any[]
  className?: string
};

export const ReceiveCollateral: React.FC<ReceiveCollateralProps> = ({
  data,
  className,
}) => {
  const [selectedItem, setSelectedItem] = useState<string>('');
  const isWiderThanLphone = useWiderThanLphone();

  if (isWiderThanLphone) {
    return (
      <ReceiveCollateralDesktop
        data={data}
        className={className}
      />
    );
  }

  return (
    <>
      {data.map((asset) => (
        <ReceiveCollateralCard
          key={getUniqueKey()}
          data={asset}
          active={selectedItem === getTokenSlug(
            { id: asset.asset.id, address: asset.asset.address },
          )}
          setItem={setSelectedItem}
        />
      ))}
    </>
  );
};
