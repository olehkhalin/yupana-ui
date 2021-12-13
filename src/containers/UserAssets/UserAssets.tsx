import React from 'react';
import cx from 'classnames';

import { useLoading } from 'hooks/useLoading';
import { useWiderThanMdesktop } from 'utils/getMediaQuery';
import { Section } from 'components/common/Section';
import { YourSupplyAssets } from 'components/tables/containers/YourSupplyAssets';
import { YourBorrowAssets } from 'components/tables/containers/YourBorrowAssets';
import { YOUR_SUPPLY_ASSETS_DATA } from 'components/temp-data/tables/your-supply';
import { YOUR_BORROW_ASSETS_DATA } from 'components/temp-data/tables/your-borrow';
import { YOUR_ASSETS_DATA_LOADING } from 'components/tables/loading-preview/your-assets-loading';

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

  // TODO: Delete later
  const { loading } = useLoading();

  return (
    <div className={cx(s.root, className)}>
      <Section
        title="Your supply assets"
        className={cx(s.col, { [s.show]: isActiveSupply && !isWiderThanMdesktop })}
      >
        <YourSupplyAssets
          loading={loading}
          data={loading ? YOUR_ASSETS_DATA_LOADING : YOUR_SUPPLY_ASSETS_DATA}
          className={s.table}
        />
      </Section>

      <Section
        title="Your borrow assets"
        theme="secondary"
        className={cx(s.col, { [s.show]: !isActiveSupply && !isWiderThanMdesktop })}
      >
        <YourBorrowAssets
          loading={loading}
          data={loading ? YOUR_ASSETS_DATA_LOADING : YOUR_BORROW_ASSETS_DATA}
          className={s.table}
        />
      </Section>
    </div>
  );
};
