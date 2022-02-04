import BigNumber from "bignumber.js";

const checkIfObjectsKey = (key: string) =>
  key === "K" || key === "M" || key === "B" || key === "T";

const currenciesCompacts: {
  [key: string]: number;
} = {
  K: 1e3,
  M: 1e6,
  B: 1e9,
  T: 1e12,
};

export const getPrettyAmount = ({
  value,
  currency,
  dec,
  withTooltip = false,
}: {
  value: number | BigNumber;
  currency?: string | null;
  dec?: number;
  withTooltip?: boolean;
}) => {
  let finalValue;

  if (new BigNumber(value).decimalPlaces(0).toString().length > (dec ?? 6)) {
    finalValue = new Intl.NumberFormat("en", {
      maximumFractionDigits: dec ?? 6 > 4 ? 3 : 2,
      notation: "compact",
    }).format(+value);
    const finalSplitLetter = finalValue.slice(-1);
    if (checkIfObjectsKey(finalSplitLetter)) {
      finalValue = `${new BigNumber(value)
        .div(currenciesCompacts[finalSplitLetter])
        .decimalPlaces(dec ?? 6 > 4 ? 3 : 2, BigNumber.ROUND_DOWN)
        .toString()}${finalSplitLetter}`;
    }
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
