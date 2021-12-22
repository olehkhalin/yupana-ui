import React, { useState } from 'react';

import { Stats } from 'containers/Stats';
import { AllAssets } from 'containers/AllAssets';

import s from './Lending.module.sass';
import { Button } from '../../components/ui/Button';
import { CreditProcessModal } from '../../components/modals/CreditProcessModal';
import { SUPPLY_ASSETS_DATA } from '../../components/temp-data/tables/supply';

export const Lending: React.FC = () => {
  const [isOp, setIsOp] = useState(false);
  const [, setIntroducedValueInBasicPrice] = useState<number>(0);

  return (
    <>
      <Button onClick={() => setIsOp(true)}>Modal</Button>
      <CreditProcessModal
        asset={SUPPLY_ASSETS_DATA[0].asset}
        pricePerTokenInBasicCurrency={1}
        yourBorrowLimit={20}
        borrowLimitUsed={10}
        dynamicBorrowLimitUsed={10}
        title="Supply"
        balanceLabel="Wallet balance"
        buttonLabel="Supply"
        maxAmount={1200}
        setIntroducedValueInBasicPrice={setIntroducedValueInBasicPrice}
        isOpen={isOp}
        onRequestClose={() => setIsOp(false)}
      />
      <Stats className={s.stat} />
      <AllAssets />
    </>
  );
};
