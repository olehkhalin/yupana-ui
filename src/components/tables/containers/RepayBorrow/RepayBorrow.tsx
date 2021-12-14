import React, { useState } from 'react';

import { getUniqueKey } from 'utils/getUniqueKey';
import { useWiderThanLphone } from 'utils/getMediaQuery';
import { getTokenSlug } from 'utils/getTokenSlug';
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
      {data.map(({ asset, ...rest }) => (
        <RepayBorrowCard
          key={getUniqueKey()}
          {...asset}
          active={selectedItem === getTokenSlug(
            { id: asset.id, address: asset.address },
          )}
          setItem={setSelectedItem}
          loading={loading}
          {...rest}
        />
      ))}
    </>
  );
};
