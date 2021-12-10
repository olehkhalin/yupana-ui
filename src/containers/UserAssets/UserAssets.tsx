import React, { useState, useEffect } from 'react';
import cx from 'classnames';

import { useWiderThanMdesktop } from 'utils/getMediaQuery';
import { Section } from 'components/common/Section';
import { YourSupplyAssets } from 'components/tables/containers/YourSupplyAssets';
import { YourBorrowAssets } from 'components/tables/containers/YourBorrowAssets';
import { YOUR_SUPPLY_ASSETS_DATA } from 'components/temp-data/tables/your-supply';
import { YOUR_BORROW_ASSETS_DATA } from 'components/temp-data/tables/your-borrow';
import { YOUR_SUPPLY_ASSETS_DATA_LOADING } from 'components/temp-data/tables/your-supply-loading';
import { YOUR_BORROW_ASSETS_DATA_LOADING } from 'components/temp-data/tables/your-borrow-loading';

import s from './UserAssets.module.sass';

type UserAssetsProps = {
  isActiveSupply: boolean
  className?: string
};

export const UserAssets: React.FC<UserAssetsProps> = ({
  isActiveSupply = true,
  className,
}) => {
  const isWiderThanMdesktop = useWiderThanMdesktop();
  const [supplyData, setSupplyData] = useState<any>(YOUR_SUPPLY_ASSETS_DATA_LOADING);
  const [borrowData, setBorrowData] = useState<any>(YOUR_BORROW_ASSETS_DATA_LOADING);

  useEffect(() => {
    setTimeout(() => {
      setSupplyData(YOUR_SUPPLY_ASSETS_DATA);
      setBorrowData(YOUR_BORROW_ASSETS_DATA);
    }, 2000);
  });

  return (
    <div className={cx(s.root, className)}>
      <Section
        title="Your supply assets"
        className={cx(s.col, { [s.show]: isActiveSupply && !isWiderThanMdesktop })}
      >
        <YourSupplyAssets
          loading={false}
          data={supplyData}
          className={s.table}
        />
      </Section>

      <Section
        title="Your borrow assets"
        theme="secondary"
        className={cx(s.col, { [s.show]: !isActiveSupply && !isWiderThanMdesktop })}
      >
        <YourBorrowAssets
          data={borrowData}
          className={s.table}
        />
      </Section>
    </div>
  );
};
