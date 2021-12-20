import React from 'react';
import cx from 'classnames';

import { CreditProcessType, useCreditProcess } from 'providers/CreditProcessProvider';
import { useUserStats } from 'providers/UserStatsProvider';
import { useCurrency } from 'providers/CurrencyProvider';
import { getSliceTokenName } from 'utils/helpers/token';
import { convertUnits, getPrettyAmount } from 'utils/helpers/amount';
import { Button } from 'components/ui/Button';
import { SupplyModal } from 'components/modals/CreditProcessModal/SupplyModal';
import { WithdrawModal } from 'components/modals/CreditProcessModal/WithdrawModal';
import { BorrowModal } from 'components/modals/CreditProcessModal/BorrowModal';
import { RepayModal } from 'components/modals/CreditProcessModal/RepayModal';

import s from './TableDropdown.module.sass';

type TableDropdownProps = {
  data?: any
  theme?: keyof typeof themeClasses
  className?: string
};

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const TableDropdown: React.FC<TableDropdownProps> = ({
  data,
  theme = 'primary',
  className,
}) => {
  const { setCreditProcess } = useCreditProcess();
  const { userStats } = useUserStats();
  const { getPriceByCurrentToken } = useCurrency();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, callBack: () => void) => {
    event.stopPropagation();
    callBack();
  };

  const onSupplyButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    type: CreditProcessType,
  ) => {
    const commonFields = {
      isOpen: true,
      maxCollateral: +convertUnits(userStats.maxCollateral, 18), // check decimals
      outstandingBorrow: userStats.outstandingBorrow,
      oraclePrice: getPriceByCurrentToken(data.row.original.yToken),
    };

    switch (type) {
      case CreditProcessType.SUPPLY:
        handleClick(
          event,
          () => setCreditProcess({
            type: CreditProcessType.SUPPLY,
            yToken: data.row.original.yToken,
            asset: data.row.original.asset,
            // data from table data
            walletBalance: data.row.original.wallet,
            collateralFactor: data.row.original.collateralFactor,
            ...commonFields,
          }),
        );
        console.log(
          'SUPPLY', JSON.stringify({
            type: CreditProcessType.SUPPLY,
            yToken: data.row.original.yToken,
            asset: data.row.original.asset,
            // data from table data
            walletBalance: data.row.original.wallet,
            collateralFactor: data.row.original.collateralFactor,
            ...commonFields,
          }, null, 2),
        );

        break;
      case CreditProcessType.WITHDRAW:
        handleClick(
          event,
          () => setCreditProcess({
            type: CreditProcessType.WITHDRAW,
            yToken: data.row.original.yToken,
            asset: data.row.original.asset,
            collateralFactor: data.row.original.collateralFactor,
            ...commonFields,
          }),
        );
        console.log(
          'WITHDRAW', JSON.stringify({
            type: CreditProcessType.WITHDRAW,
            yToken: data.row.original.yToken,
            asset: data.row.original.asset,
            collateralFactor: data.row.original.collateralFactor,
            ...commonFields,
          }, null, 2),
        );
        break;
      case CreditProcessType.BORROW:
        handleClick(
          event,
          () => setCreditProcess({
            type: CreditProcessType.BORROW,
            yToken: data.row.original.yToken,
            asset: data.row.original.asset,
            collateralFactor: data.row.original.collateralFactor,
            ...commonFields,
          }),
        );
        console.log(
          'BORROW', JSON.stringify({
            type: CreditProcessType.BORROW,
            yToken: data.row.original.yToken,
            asset: data.row.original.asset,
            collateralFactor: data.row.original.collateralFactor,
            ...commonFields,
          }, null, 2),
        );
        break;
      case CreditProcessType.REPAY:
        handleClick(
          event,
          () => setCreditProcess({
            type: CreditProcessType.REPAY,
            yToken: data.row.original.yToken,
            asset: data.row.original.asset,
            ...commonFields,
          }),
        );
        console.log(
          'REPAY', JSON.stringify({
            type: CreditProcessType.REPAY,
            yToken: data.row.original.yToken,
            asset: data.row.original.asset,
            ...commonFields,
          }, null, 2),
        );
        break;
      default:
    }
  };

  const isSecondaryTheme = theme === 'secondary';
  return (
    <div className={cx(s.root, themeClasses[theme], className)}>
      <div className={s.content}>
        <div className={s.title}>
          {`${isSecondaryTheme ? 'Borrow' : 'Supply'} balance:`}
          <div className={s.amount}>
            {
              isSecondaryTheme
                ? getPrettyAmount({
                  value: convertUnits(
                    data.row.original.borrowed ?? 0, data.row.original.asset.decimals,
                  ),
                  currency: getSliceTokenName(data.row.original.asset),
                  dec: data.row.original.asset.decimals,
                })
                : getPrettyAmount({
                  value: convertUnits(
                    data.row.original.supplied ?? 0, data.row.original.asset.decimals,
                  ),
                  currency: getSliceTokenName(data.row.original.asset),
                  dec: data.row.original.asset.decimals,
                })
            }
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
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => onSupplyButtonClick(
            e,
            isSecondaryTheme ? CreditProcessType.BORROW : CreditProcessType.SUPPLY,
          )}
          className={s.button}
        >
          {isSecondaryTheme ? 'Borrow' : 'Supply'}
        </Button>
        <Button
          sizeT="small"
          actionT={isSecondaryTheme ? 'borrow' : 'supply'}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => onSupplyButtonClick(
            e,
            isSecondaryTheme ? CreditProcessType.REPAY : CreditProcessType.WITHDRAW,
          )}
          className={s.button}
        >
          {isSecondaryTheme ? 'Repay' : 'Withdraw'}
        </Button>
      </div>
      {/* TODO: Move to another place, Oleh help */}
      <SupplyModal />
      <WithdrawModal />
      <BorrowModal />
      <RepayModal />
    </div>
  );
};
