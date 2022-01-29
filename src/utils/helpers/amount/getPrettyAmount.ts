import BigNumber from "bignumber.js";

export const getPrettyAmount = ({
  value,
  currency,
  dec,
  withTooltip = false,
}: {
  value: number | BigNumber;
  currency?: string | undefined;
  dec?: number;
  withTooltip?: boolean;
}) => {
  let finalValue;

  if (new BigNumber(value).decimalPlaces(0).toString().length > (dec ?? 6)) {
    finalValue = new Intl.NumberFormat("en", {
      maximumFractionDigits: 2,
      notation: "compact",
    }).format(+value);
  } else {
    finalValue = `${new Intl.NumberFormat("en", {
      maximumFractionDigits: 20,
    }).format(+value)}${withTooltip ? "..." : ""}`;
  }

  if (currency) {
    if (currency === "$") {
      return `${currency} ${finalValue}`;
    }
    return `${finalValue} ${currency}`;
  }

  return finalValue;
};
