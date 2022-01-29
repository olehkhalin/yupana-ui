import { FC } from "react";
import BigNumber from "bignumber.js";
import cx from "classnames";

import { getPrettyAmount } from "utils/helpers/amount";
import { CurrencyEnum, useCurrency } from "hooks/useCurrency";
import { Tooltip } from "components/ui/Tooltip";
import { ReactComponent as TezosIcon } from "svg/Tezos.svg";

import s from "./PrettyAmount.module.sass";

type PrettyAmountProps = {
  amount: BigNumber;
  currency?: string;
  isConvertable?: boolean;
  className?: string;
};

export const PrettyAmount: FC<PrettyAmountProps> = ({
  amount,
  currency,
  isConvertable = false,
  className,
}) => {
  const { currency: convertableCurrency, convertPriceByBasicCurrency } =
    useCurrency();

  const compoundClassNames = cx(s.root, className);

  const convertedAmount = isConvertable
    ? convertPriceByBasicCurrency(amount)
    : amount;

  const integerPart = convertedAmount.decimalPlaces(0);
  const decimalPlaces = +convertedAmount.toString().split(".")[1];

  let decSplit = 6;
  if (integerPart.gte(1000)) {
    decSplit = 2;
  }

  let isShownDecTooltip = false;
  if (decimalPlaces > decSplit) {
    isShownDecTooltip = true;
  }

  const isShownSimpleTooltip = integerPart.toString().length > 6;

  const finalCurrency =
    isConvertable && convertableCurrency === CurrencyEnum.USD ? "$" : currency;

  console.log("finalCurrency", finalCurrency);

  if (isShownSimpleTooltip) {
    return (
      <Tooltip
        content={getPrettyAmount({
          value: convertedAmount,
          currency: finalCurrency,
          dec: 1e24,
        })}
      >
        <span className={compoundClassNames}>
          {getPrettyAmount({
            value: convertedAmount,
            currency: finalCurrency,
          })}
          {isConvertable && convertableCurrency === CurrencyEnum.XTZ && (
            <TezosIcon className={s.tezosIcon} />
          )}
        </span>
      </Tooltip>
    );
  }

  if (isShownDecTooltip) {
    return (
      <Tooltip
        content={getPrettyAmount({
          value: convertedAmount,
          currency: finalCurrency,
        })}
      >
        <span className={compoundClassNames}>
          {getPrettyAmount({
            value: convertedAmount.decimalPlaces(
              decSplit,
              BigNumber.ROUND_DOWN
            ),
            currency: finalCurrency,
            withTooltip: true,
          })}
          {isConvertable && convertableCurrency === CurrencyEnum.XTZ && (
            <TezosIcon className={s.tezosIcon} />
          )}
        </span>
      </Tooltip>
    );
  }

  return (
    <span className={compoundClassNames}>
      {getPrettyAmount({
        value: convertedAmount,
        currency: finalCurrency,
      })}
      {isConvertable && convertableCurrency === CurrencyEnum.XTZ && (
        <TezosIcon className={s.tezosIcon} />
      )}
    </span>
  );
};
