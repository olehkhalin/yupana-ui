import React, { useState } from 'react';

import { useWiderThanMdesktop } from 'utils/getMediaQuery';
import { Stats } from 'containers/Stats';
import { UserAssets } from 'containers/UserAssets';
import { Assets } from 'containers/Assets';
import { AssetsSwitcher } from 'components/common/AssetsSwitcher';

import s from './Lending.module.sass';

export const Lending: React.FC = () => {
  const [isAssetSwitcherActive, setIsAssetSwitcherActive] = useState(true);
  const isWiderThanMdesktop = useWiderThanMdesktop();

  return (
    <>
      <Stats className={s.stat} />
      {!isWiderThanMdesktop && (
      <AssetsSwitcher
        active={isAssetSwitcherActive}
        setActive={setIsAssetSwitcherActive}
        className={s.switcher}
      />
      )}
      <UserAssets
        isActiveSupply={isAssetSwitcherActive}
        className={s.assets}
      />
      <Assets
        isActiveSupply={isAssetSwitcherActive}
        className={s.assets}
      />
    </>
  );
};
