import { FC } from "react";
import BigNumber from "bignumber.js";
import cx from "classnames";

import { getPrettyAmount } from "utils/helpers/amount";
import { CurrencyEnum, useCurrency } from "hooks/useCurrency";
import { Tooltip, TooltipTheme } from "components/ui/Tooltip";
import { CustomTezosLogo } from "components/ui/CustomTezosLogo";
import { themeClass, sizeClass } from "components/ui/CustomTezosLogo";

import s from "./PrettyAmount.module.sass";

export type PrettyAmountProps = {
  amount: BigNumber;
  currency?: string | null;
  isConvertable?: boolean;
  isMinified?: boolean;
  className?: string;
  tezosClassName?: string;
  tooltipTheme?: TooltipTheme;
  theme?: keyof typeof themeClass;
  size?: keyof typeof sizeClass;
  withLight?: boolean;
};

export const PrettyAmount: FC<PrettyAmountProps> = ({
  amount,
  currency,
  isConvertable = false,
  isMinified = false,
  className,
  tezosClassName,
  tooltipTheme,
  theme,
  size,
  withLight = false,
}) => {
  const { currency: convertableCurrency, convertPriceByBasicCurrency } =
    useCurrency();

  const compoundClassNames = cx(s.root, className);

  const convertedAmount = isConvertable
    ? convertPriceByBasicCurrency(amount)
    : amount;

  const integerPart = convertedAmount.decimalPlaces(0);
  const decimalPlaces = convertedAmount.toString().split(".")[1];

  let decSplit = isMinified ? 2 : 6;
  if (integerPart.gte(1000)) {
    decSplit = 2;
  }

  const finalDecLength = decimalPlaces ? decimalPlaces.length : 0;

  let isShownDecTooltip = false;
  if (finalDecLength > decSplit) {
    isShownDecTooltip = true;
  }

  const isShownSimpleTooltip =
    integerPart.toString().length > (isMinified ? 3 : 6);

  const finalCurrency =
    isConvertable && convertableCurrency === CurrencyEnum.USD ? "$" : currency;

  const isTezosCurrency =
    isConvertable && convertableCurrency === CurrencyEnum.XTZ;

  if (isShownSimpleTooltip || isShownDecTooltip) {
    let tooltipAmount = "";

    let childrenAmount = "";

    if (isShownSimpleTooltip) {
      tooltipAmount = getPrettyAmount({
        value: convertedAmount,
        currency: finalCurrency,
        dec: 1e24,
      });

      childrenAmount = getPrettyAmount({
        value: convertedAmount,
        currency: finalCurrency,
        dec: isMinified ? 3 : undefined,
      });
    }

    if (isShownDecTooltip) {
      tooltipAmount = getPrettyAmount({
        value: convertedAmount,
        currency: finalCurrency,
      });

      childrenAmount = getPrettyAmount({
        value: convertedAmount.decimalPlaces(decSplit, BigNumber.ROUND_DOWN),
        currency: finalCurrency,
        withTooltip: true,
        dec: isMinified ? 3 : undefined,
      });
    }

    return (
      <Tooltip
        content={
          <span className={s.tooltipContent}>
            {tooltipAmount}
            {isTezosCurrency && (
              <CustomTezosLogo theme="tertiary" size="superExtraSmall" />
            )}
          </span>
        }
        theme={tooltipTheme}
      >
        <span className={compoundClassNames}>
          {childrenAmount}
          {isTezosCurrency && (
            <CustomTezosLogo
              theme={theme}
              size={size}
              withLight={withLight}
              className={tezosClassName}
            />
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
        dec: isMinified ? 3 : undefined,
      })}
      {isTezosCurrency && (
        <CustomTezosLogo
          theme={theme}
          size={size}
          withLight={withLight}
          className={tezosClassName}
        />
      )}
    </span>
  );
};
