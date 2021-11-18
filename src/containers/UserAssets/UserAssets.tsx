import React from 'react';
import cx from 'classnames';

import { useCustomOrWider } from 'utils/getMediaQuery';
import { Heading } from 'components/common/Heading';
import { YourSupplyAssets } from 'components/tables/containers/YourSupplyAssets';
import { YourBorrowAssets } from 'components/tables/containers/YourBorrowAssets';
import { YOUR_SUPPLY_ASSETS_DATA } from 'components/temp-data/tables/your-supply';
import { YOUR_BORROW_ASSETS_DATA } from 'components/temp-data/tables/your-borrow';

import s from './UserAssets.module.sass';

type UserAssetsProps = {
  isActiveSupply: boolean
  className?: string
};

export const UserAssets: React.FC<UserAssetsProps> = ({
  isActiveSupply = true,
  className,
}) => {
  const isMdesktopOrWider = useCustomOrWider({ minWidth: 1260 });

  return (
    <div className={cx(s.root, className)}>
      <div className={cx(s.col, { [s.show]: isActiveSupply && !isMdesktopOrWider })}>
        <Heading
          title="Your supply assets"
        />
        <YourSupplyAssets
          data={YOUR_SUPPLY_ASSETS_DATA}
          className={s.table}
        />
      </div>

      <div className={cx(s.col, { [s.show]: !isActiveSupply && !isMdesktopOrWider })}>
        <Heading
          title="Your borrow assets"
          theme="secondary"
        />
        <YourBorrowAssets
          data={YOUR_BORROW_ASSETS_DATA}
          className={s.table}
        />
      </div>
    </div>
  );
};
