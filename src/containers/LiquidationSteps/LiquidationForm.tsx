/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import BigNumber from 'bignumber.js';
import cx from 'classnames';

import { useUserBorrowedYTokens } from 'providers/UserBorrowedYTokensProvider';
import { useCurrency } from 'providers/CurrencyProvider';
import { LiquidateStep } from 'pages/liquidate/Liquidate';
import { CONTRACT_ADDRESS, PROXY_CONTRACT_ADDRESS } from 'constants/default';
import { liquidate } from 'utils/dapp/methods/liquidate';
import { useAccountPkh, useTezos } from 'utils/dapp';
import { getTokenName } from 'utils/helpers/token';
import { convertUnits, getPrettyAmount } from 'utils/helpers/amount';
import { assetAmountValidationFactory, getAdvancedErrorMessage } from 'utils/validation';
import { useWiderThanMphone } from 'utils/helpers';
import { Button } from 'components/ui/Button';
import { Heading } from 'components/common/Heading';
import { NumberInput } from 'components/common/NumberInput';
import { FormTypes } from 'components/modals/CreditProcessModal';

import s from './LiquidationSteps.module.sass';

type LiquidationFormProps = {
  data: LiquidateStep | null
};

export const LiquidationForm: React.FC<LiquidationFormProps> = ({
  data,
}) => {
  const isWiderThanMphone = useWiderThanMphone();
  const { convertPriceByBasicCurrency } = useCurrency();

  const tezos = useTezos()!;
  const accountPkh = useAccountPkh();
  const { userBorrowedYTokens } = useUserBorrowedYTokens();

  const {
    handleSubmit,
    control,
    formState,
    watch,
    setFocus,
    setValue,
  } = useForm<FormTypes>({
    defaultValues: {
      amount: new BigNumber(0),
    },
    mode: 'onChange',
  });

  const { errors } = formState;

  // Subscribe on input
  const amount = watch('amount');

  useEffect(() => {
    if (data) {
      setValue('amount', new BigNumber(0));
    }
  }, [data, setValue]);

  // Prepare all data
  const prepareData = useMemo(
    () => {
      const youWillReceive = data ? amount
        .times(data.borrowAssetPrice)
        .div(data.collateralAssetPrice)
        .times(data.liquidationIncentive) : new BigNumber(0);

      return ({
        borrowAsset: data ? getTokenName(data.borrowAsset) : '',
        collateralAsset: data ? getTokenName(data.collateralAsset) : '',
        borrowDecimals: (data ? data.borrowAsset.decimals : 0) ?? 0,
        amountToClose: data ? data.amountToClose : new BigNumber(0),
        youWillReceive,
        youWillReceiveInUsd: data ? youWillReceive.times(data?.collateralAssetPrice) : new BigNumber(0),
        borrowAssetPrice: data ? new BigNumber(data.borrowAssetPrice) : new BigNumber(0),
        collateralAssetPrice: data ? new BigNumber(data.collateralAssetPrice) : new BigNumber(0),
      });
    },
    [amount, data],
  );

  const amountErrorMessage = useMemo(
    () => getAdvancedErrorMessage(errors.amount),
    [errors.amount],
  );

  const validateAmount = useMemo(
    () => (assetAmountValidationFactory({
      max: prepareData.amountToClose.decimalPlaces(prepareData.borrowDecimals),
    })),
    [prepareData.amountToClose, prepareData.borrowDecimals],
  );

  // Submit form
  const onSubmit = useCallback(
    async ({ amount: inputAmount }: FormTypes) => {
      try {
        if (data) {
          const params = {
            fabricaContractAddress: CONTRACT_ADDRESS,
            proxyContractAddress: PROXY_CONTRACT_ADDRESS,
            otherYTokens: [...userBorrowedYTokens, data.collateralAsset.yToken],
            borrowToken: data.borrowAsset.yToken,
            collateralToken: data.collateralAsset.yToken,
            tokenContract: data.borrowAsset.address,
            tokenId: data.borrowAsset.id,
            borrower: data.borrowerAddress,
            amount: convertUnits(inputAmount, -(prepareData.borrowDecimals ?? 0)),
          };

          const operation = await liquidate(tezos, accountPkh!, params);
          await operation.confirmation(1);
        }
      } catch (e) {
        console.log(e);
      }
    },
    [accountPkh, data, prepareData.borrowDecimals, tezos, userBorrowedYTokens],
  );

  return (
    <>
      <div className={s.description}>
        Now you can liquidate the debtor.
        Be aware that the amount to be liquidated cannot exceed the MAX Liquidate of the debt.
      </div>
      <Heading
        title={
        // eslint-disable-next-line no-nested-ternary
        data ? isWiderThanMphone
          ? `Amount to close in ${prepareData.borrowAsset}:`
          : 'Amount to close:'
          : 'Complete all the previous steps first:'
        }
        className={s.heading}
      />
      <div className={s.liquidateWrapper}>
        <form
          onSubmit={handleSubmit(onSubmit as any)}
          className={s.inputWrapper}
        >
          <Controller
            name="amount"
            control={control}
            rules={{ validate: validateAmount }}
            render={
            ({ field }) => (
              // @ts-ignore
              <NumberInput
                theme="primary"
                decimals={prepareData.borrowDecimals}
                error={amountErrorMessage}
                maxValue={prepareData.amountToClose.decimalPlaces(prepareData.borrowDecimals)}
                withSlider={false}
                setFocus={() => setFocus('amount')}
                exchangeRate={new BigNumber(prepareData.borrowAssetPrice)}
                className={s.input}
                disabled={!data}
                {...field}
              />
            )
          }
          />
          <Button
            type="submit"
            disabled={!!amountErrorMessage || !data}
            className={cx(s.button, { [s.error]: amountErrorMessage })}
          >
            Liquidate
          </Button>
        </form>

        <div className={s.recieveInfo}>
          <div className={s.recieveColumn}>
            <div className={s.recieveTitle}>
              You will receive:
            </div>

            <div className={s.recieveValue}>
              {data ? (
                <>
                  {
                    getPrettyAmount({
                      value: prepareData.youWillReceive,
                      currency: prepareData.collateralAsset,
                    })
                  }
                  {' '}
                  {`(${convertPriceByBasicCurrency(prepareData.youWillReceiveInUsd)})`}
                </>
              ) : '—'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
