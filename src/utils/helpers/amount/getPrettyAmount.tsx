import BigNumber from "bignumber.js";

BigNumber.set({ EXPONENTIAL_AT: 72, DECIMAL_PLACES: 72 });

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
  isMinified = true,
}: {
  value: number | BigNumber;
  currency?: string | null;
  dec?: number;
  withTooltip?: boolean;
  isMinified?: boolean;
}) => {
  let finalValue;

  if (new BigNumber(value).decimalPlaces(0).toString().length > (dec ?? 6)) {
    finalValue = new Intl.NumberFormat("en", {
      maximumFractionDigits: dec ?? 6 > 4 ? 3 : 2,
      notation: "compact",
    }).format(+value);
    const finalSplitLetter = finalValue.slice(-1);
    if (checkIfObjectsKey(finalSplitLetter)) {
      if (finalSplitLetter === "T" && new BigNumber(value).gte(100 * 10e12)) {
        const numInSciNot: { coefficient?: number; exponent?: number } = {};
        [numInSciNot.coefficient, numInSciNot.exponent] = value
          .toExponential()
          .split("e")
          .map((item) => Number(item));
        const val = isMinified
          ? new BigNumber(numInSciNot.coefficient)
              .decimalPlaces(2, BigNumber.ROUND_DOWN)
              .toString()
          : numInSciNot.coefficient;
        finalValue = (
          <>
            {val}
            •10<sup>{numInSciNot.exponent}</sup>
          </>
        );
      } else {
        finalValue = `${new BigNumber(value)
          .div(currenciesCompacts[finalSplitLetter])
          .decimalPlaces(dec ?? 6 > 4 ? 3 : 2, BigNumber.ROUND_DOWN)
          .toString()}${finalSplitLetter}`;
      }
    }
  } else {
    finalValue = `${new Intl.NumberFormat("en", {
      maximumFractionDigits: 20,
    }).format(+value)}${withTooltip ? "..." : ""}`;
  }

  if (currency) {
    if (currency === "$") {
      return (
        <span>
          {currency} {finalValue}
        </span>
      );
    }
    return (
      <span>
        {finalValue} {currency}
      </span>
    );
  }

  return <span>{finalValue}</span>;
};
