import React, { useState } from 'react';

import { getUniqueKey } from 'utils/getUniqueKey';
import { useLphoneOrWider } from 'utils/getMediaQuery';
import { getTokenSlug } from 'utils/getTokenSlug';
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
  const isLphoneOrWider = useLphoneOrWider();

  if (isLphoneOrWider) {
    return (
      <RepayBorrowDesktop
        data={data}
        className={className}
      />
    );
  }

  return (
    <div className={className}>
      {data.map(({ asset, ...rest }) => (
        <RepayBorrowCard
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
