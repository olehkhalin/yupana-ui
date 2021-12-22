import React from 'react';
import cx from 'classnames';
import BigNumber from 'bignumber.js';

import { TokenMetadataInterface } from 'types/token';
import { convertUnits, getPrettyAmount } from 'utils/helpers/amount';
import { getSliceTokenName } from 'utils/helpers/token';
import { useUserGeneralInfo } from 'providers/UserGeneralInfoProvider';
import { useOraclePrices } from 'providers/OraclePricesProvider';
import { TypeEnum, useProcessCredit } from 'providers/ProcessCreditProvider';
import { Button } from 'components/ui/Button';

import s from './TableDropdown.module.sass';

type TableDropdownProps = {
  theme?: keyof typeof themeClasses
  className?: string
};

type SupplyDropdownProps = {
  yToken?: number
  asset?: TokenMetadataInterface
  collateralFactor?: BigNumber
  supplied?: BigNumber
  wallet?: BigNumber
} & TableDropdownProps;

type EventType = React.MouseEvent<HTMLButtonElement>;

type TableDropdownInnerProps = {
  balanceLabel: string
  balanceAmount: string
  firstButtonLabel: string
  secondButtonLabel: string
  handleFirstButtonClick: () => void
  handleSecondButtonClick: () => void
} & TableDropdownProps;

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const TableDropdown: React.FC<TableDropdownInnerProps> = ({
  theme = 'primary',
  balanceLabel,
  balanceAmount,
  firstButtonLabel,
  secondButtonLabel,
  handleFirstButtonClick,
  handleSecondButtonClick,
  className,
}) => {
  const handleClick = (event: EventType, callback: () => void) => {
    event.stopPropagation();
    callback();
  };

  const isSecondaryTheme = theme === 'secondary';
  return (
    <div className={cx(s.root, themeClasses[theme], className)}>
      <div className={s.content}>
        <div className={s.title}>
          {`${balanceLabel}:`}
          <div className={s.amount}>
            {balanceAmount}
          </div>
        </div>
        <Button
          theme="clear"
          href="/"
          className={s.details}
        >
          Markets details...
        </Button>
      </div>

      <div className={s.buttons}>
        <Button
          sizeT="small"
          actionT={isSecondaryTheme ? 'borrow' : 'supply'}
          onClick={(e: EventType) => handleClick(e, handleFirstButtonClick)}
          className={s.button}
        >
          {firstButtonLabel}
        </Button>
        <Button
          sizeT="small"
          actionT={isSecondaryTheme ? 'borrow' : 'supply'}
          onClick={(e: EventType) => handleClick(e, handleSecondButtonClick)}
          className={s.button}
        >
          {secondButtonLabel}
        </Button>
      </div>
    </div>
  );
};

export const SupplyTableDropdown:React.FC<SupplyDropdownProps> = ({
  yToken,
  asset,
  collateralFactor,
  supplied,
  wallet,
  theme,
  className,
}) => {
  const { userGeneralInfo } = useUserGeneralInfo();
  const { oraclePrices } = useOraclePrices();
  const { setProcessCreditData } = useProcessCredit();

  const maxCollateral = userGeneralInfo
    ? userGeneralInfo.maxCollateral
    : new BigNumber(0);
  const outstandingBorrow = userGeneralInfo
    ? userGeneralInfo.outstandingBorrow
    : new BigNumber(0);
  const price = oraclePrices ? oraclePrices[yToken!] : new BigNumber(1);

  const handleSupply = () => {
    setProcessCreditData({
      type: TypeEnum.SUPPLY,
      maxAmount: wallet!,
      asset: asset!,
      borrowLimit: maxCollateral!,
      dynamicBorrowLimitFunc: (input: BigNumber) => (
        maxCollateral.plus(
          input
            .multipliedBy(price)
            .multipliedBy(collateralFactor!),
        )
      ),
      borrowLimitUsed: maxCollateral.eq(0)
        ? new BigNumber(0)
        : outstandingBorrow.div(maxCollateral),
      dynamicBorrowLimitUsedFunc: (input: BigNumber) => (
        (outstandingBorrow.eq(0) || input.eq(0))
          ? new BigNumber(0)
          : outstandingBorrow.div(
            maxCollateral.plus(
              input
                .multipliedBy(price)
                .multipliedBy(collateralFactor!),
            ),
          )
      ),
      isOpen: true,
    });
  };

  const handleWithdraw = () => {
    console.log('borrow', +maxCollateral.minus(outstandingBorrow).div(1e18).div(price).div(collateralFactor!));
  };

  return (
    <TableDropdown
      theme={theme}
      className={className}
      balanceLabel="Supply balance"
      balanceAmount={getPrettyAmount({
        value: convertUnits(supplied!, asset!.decimals),
        currency: getSliceTokenName(asset!),
        dec: asset!.decimals,
      })}
      firstButtonLabel="Supply"
      secondButtonLabel="Withdraw"
      handleFirstButtonClick={handleSupply}
      handleSecondButtonClick={handleWithdraw}
    />
  );
};
