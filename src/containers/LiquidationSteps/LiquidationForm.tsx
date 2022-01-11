import React, { useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import BigNumber from 'bignumber.js';

import { useCurrency } from 'providers/CurrencyProvider';
import { getPrettyAmount } from 'utils/helpers/amount';
import { assetAmountValidationFactory, getAdvancedErrorMessage } from 'utils/validation';
import { useWiderThanMphone } from 'utils/helpers';
import { Button } from 'components/ui/Button';
import { Heading } from 'components/common/Heading';
import { NumberInput } from 'components/common/NumberInput';
import { FormTypes } from 'components/modals/CreditProcessModal';

import s from './LiquidationSteps.module.sass';

export const LiquidationForm: React.FC = () => {
  const isWiderThanMphone = useWiderThanMphone();
  const { convertPriceByBasicCurrency } = useCurrency();

  const {
    handleSubmit,
    control,
    formState,
    watch,
    setFocus,
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
    console.log(+amount);
  }, [amount]);

  const amountErrorMessage = useMemo(
    () => getAdvancedErrorMessage(errors.amount),
    [errors.amount],
  );

  const validateAmount = useMemo(
    () => (assetAmountValidationFactory({
      max: new BigNumber(5000),
    })),
    [],
  );

  const onSubmit = useCallback(
    () => {
      console.log('Submit');
    },
    [],
  );

  return (
    <>
      <div className={s.description}>
        Now you can liquidate the debtor.
        Be aware that the amount to be liquidated cannot exceed the MAX Liquidate of the debt.
      </div>
      <Heading
        title={
        isWiderThanMphone
          ? 'Amount to close in \'XTZ\':'
          : 'Amount to close:'
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
                decimals={0}
                error={amountErrorMessage}
                maxValue={new BigNumber(5000)}
                withSlider={false}
                setFocus={() => setFocus('amount')}
                className={s.input}
                {...field}
              />
            )
          }
          />
          <Button
            type="submit"
            disabled={(!!amountErrorMessage && amountErrorMessage !== 'Beware of the Liquidation Risk')}
            className={s.button}
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
              {getPrettyAmount({ value: 802.12, currency: '\'SMAK\'' })}
              {' '}
              {`(${convertPriceByBasicCurrency(2100)})`}
            </div>
          </div>

          <div className={s.recieveColumn}>
            <div className={s.recieveTitle}>
              Health factor of borrower after liquidation:
            </div>

            <div className={s.recieveValue}>
              {getPrettyAmount({ value: 0.86 })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
