import React, { useState } from 'react';

import { getUniqueKey, useWiderThanLphone } from 'utils/helpers';
import { getTokenSlug } from 'utils/helpers/token';
import { RepayBorrow as RepayBorrowDesktop } from 'components/tables/components/desktop';
import { RepayBorrowCard } from 'components/tables/components/mobile';

type RepayBorrowProps = {
  data: any[]
  className?: string
};

export const RepayBorrow: React.FC<RepayBorrowProps> = ({
  data,
  className,
}) => {
  const [selectedItem, setSelectedItem] = useState<string>('');
  const isWiderThanLphone = useWiderThanLphone();

  if (isWiderThanLphone) {
    return (
      <RepayBorrowDesktop
        data={data}
        className={className}
      />
    );
  }

  return (
    <>
      {data.map((asset) => (
        <RepayBorrowCard
          key={getUniqueKey()}
          active={selectedItem === getTokenSlug(
            { id: asset.asset.id, address: asset.asset.address },
          )}
          setItem={setSelectedItem}
          data={asset}
        />
      ))}
    </>
  );
};
