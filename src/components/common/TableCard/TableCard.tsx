import React, { useState } from 'react';
import { UnmountClosed } from 'react-collapse';
import cx from 'classnames';

import { getSlice } from 'utils/getSlice';
import { getTokenName } from 'utils/getTokenName';
import { TokenName } from 'components/common/TokenName';
import { DropdownArrow } from 'components/common/DropdownArrow';
import { TableDropdown } from 'components/common/TableDropdown';

import s from './TableCard.module.sass';

type TableCardProps = {
  id?: string
  address: string
  name?: string
  symbol?: string
  collateralFactor: number
  supplyApy: number
  wallet: number
  thumbnailUri?: string
  theme?: keyof typeof themeClasses
  className?: string
};

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const TableCard: React.FC<TableCardProps> = ({
  id,
  address,
  name,
  symbol,
  thumbnailUri,
  collateralFactor,
  supplyApy,
  wallet,
  theme = 'primary',
  className,
}) => {
  const [active, setActive] = useState<boolean>(false);

  const handleSwitchCollapse = () => {
    setActive(!active);
  };

  const tokenMetadata = {
    id,
    address,
    name,
    symbol,
    thumbnailUri,
  };

  return (
    <div
      onClick={handleSwitchCollapse}
      className={cx(s.root, themeClasses[theme], className)}
    >
      <DropdownArrow
        theme={theme}
        active={active}
        className={s.arrow}
      />

      <div className={s.wrapper}>
        <div className={s.row}>
          <div className={s.title}>
            Asset
          </div>
          <TokenName
            token={tokenMetadata}
            logoClassName={s.logo}
          />
        </div>

        <div className={s.row}>
          <div className={s.title}>
            Supply APY
          </div>
          <div className={s.value}>
            {`${supplyApy.toFixed(2)}%`}
          </div>
        </div>

        <div className={s.row}>
          <div className={s.title}>
            Collateral Factor
          </div>
          <div className={s.value}>
            {`${collateralFactor.toFixed(2)}%`}
          </div>
        </div>

        <div className={s.row}>
          <div className={s.title}>
            Wallet
          </div>
          <div className={s.value}>
            {`${wallet} ${getSlice(getTokenName(tokenMetadata), 5)}`}
          </div>
        </div>
      </div>

      <UnmountClosed
        isOpened={active}
        initialStyle={{ height: '0px', overflow: 'hidden' }}
        checkTimeout={500}
        theme={{ collapse: s.ReactCollapse }}
      >
        <TableDropdown
          theme={theme}
          className={s.dropdown}
        />
      </UnmountClosed>
    </div>
  );
};
