import React from 'react';
import cx from 'classnames';

import { useCustomOrWider } from 'utils/getMediaQuery';
import { Heading } from 'components/common/Heading';
import { SupplyAssets } from 'components/tables/containers/SupplyAssets';
import { BorrowAssets } from 'components/tables/containers/BorrowAssets';
import { SUPPLY_ASSETS_DATA } from 'components/temp-data/tables/supply';
import { BORROW_ASSETS_DATA } from 'components/temp-data/tables/borrow';

import s from './Assets.module.sass';

type AssetsProps = {
  isActiveSupply: boolean
  className?: string
};

export const Assets: React.FC<AssetsProps> = ({
  isActiveSupply = true,
  className,
}) => {
  const isMdesktopOrWider = useCustomOrWider({ minWidth: 1260 });

  return (
    <div className={cx(s.root, className)}>
      <div className={cx(s.col, { [s.show]: isActiveSupply && !isMdesktopOrWider })}>
        <Heading
          title="Supply assets"
          link={{
            label: 'docks: suppling assets',
            link: '/',
          }}
        />
        <SupplyAssets
          data={SUPPLY_ASSETS_DATA}
          className={s.table}
        />
      </div>

      <div className={cx(s.col, { [s.show]: !isActiveSupply && !isMdesktopOrWider })}>
        <Heading
          title="Borrow assets"
          link={{
            label: 'docs: borrowing assets',
            link: '/',
          }}
          theme="secondary"
        />
        <BorrowAssets
          data={BORROW_ASSETS_DATA}
          className={s.table}
        />
      </div>
    </div>
  );
};
