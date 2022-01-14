import React, { useCallback, useState } from 'react';
import { BatchWalletOperation } from '@taquito/taquito/dist/types/wallet/batch-operation';

import { CONTRACT_ADDRESS, PROXY_CONTRACT_ADDRESS } from 'constants/default';
import { enterMarket, exitMarket } from 'utils/dapp/methods';
import { useAccountPkh, useTezos } from 'utils/dapp';
import { useUserBorrowedYTokens } from 'providers/UserBorrowedYTokensProvider';
import { Switcher } from 'components/ui/Switcher';

type SwitcherProps = {
  yToken: number
  isCollateral: boolean
  className?: string
};

export const CollateralSwitcher: React.FC<SwitcherProps> = ({
  yToken,
  isCollateral,
  className,
}) => {
  const tezos = useTezos()!;
  const accountPkh = useAccountPkh();
  const [disabled, setDisabled] = useState(false);
  const { userBorrowedYTokens } = useUserBorrowedYTokens();

  const handleChange = useCallback(async () => {
    if (!disabled) {
      try {
        setDisabled(true);
        let operation: BatchWalletOperation;
        const params: {
          fabricaContractAddress: string
          proxyContractAddress: string
          yToken: number[]
          otherYTokens?: number[]
        } = {
          fabricaContractAddress: CONTRACT_ADDRESS,
          proxyContractAddress: PROXY_CONTRACT_ADDRESS,
          yToken: [yToken],
        };
        if (!isCollateral) {
          operation = await enterMarket(tezos, accountPkh!, params);
        } else {
          params.otherYTokens = userBorrowedYTokens;
          operation = await exitMarket(tezos, accountPkh!, params);
        }
        await operation.confirmation(1);
        console.log('The Asset enter market request was successful, please wait...!');
      } catch (e) {
        console.log(e);
      } finally {
        setDisabled(false);
        console.log('finally');
      }
    }
  }, [accountPkh, disabled, isCollateral, tezos, userBorrowedYTokens, yToken]);

  return (
    <Switcher
      active={isCollateral}
      handleChange={handleChange}
      disabled={disabled}
      className={className}
    />
  );
};
