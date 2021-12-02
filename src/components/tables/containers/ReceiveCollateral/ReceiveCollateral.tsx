import React, { useState } from 'react';

import { getUniqueKey } from 'utils/getUniqueKey';
import { useWiderThanLphone } from 'utils/getMediaQuery';
import { getTokenSlug } from 'utils/getTokenSlug';
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
    <div className={className}>
      {data.map(({ asset, ...rest }) => (
        <ReceiveCollateralCard
          key={getUniqueKey()}
          {...asset}
          active={selectedItem === getTokenSlug(
            { id: asset.id, address: asset.address },
          )}
          setItem={setSelectedItem}
          {...rest}
        />
      ))}
    </div>
  );
};
