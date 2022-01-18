import React, { useState } from 'react';

import { getUniqueKey, useWiderThanLphone } from 'utils/helpers';
import { getTokenSlug } from 'utils/helpers/token';
import { RepayBorrow as RepayBorrowDesktop } from 'components/tables/components/desktop';
import { RepayBorrowCard } from 'components/tables/components/mobile';

type RepayBorrowProps = {
  data: any[]
  loading: boolean
  className?: string
};

export const RepayBorrow: React.FC<RepayBorrowProps> = ({
  data,
  loading,
  className,
}) => {
  const [selectedItem, setSelectedItem] = useState<string>('');
  const isWiderThanLphone = useWiderThanLphone();

  if (isWiderThanLphone) {
    return (
      <RepayBorrowDesktop
        data={data}
        loading={loading}
        className={className}
      />
    );
  }

  return (
    <>
      {data.map((asset) => (
        <RepayBorrowCard
          key={getUniqueKey()}
          data={asset}
          active={selectedItem === getTokenSlug(
            { id: asset.asset.id, address: asset.asset.address },
          )}
          setItem={setSelectedItem}
          loading={loading}
        />
      ))}
    </>
  );
};
