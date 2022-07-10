import React, { ChangeEvent, FC, HTMLProps, useEffect } from "react";
import cx from "classnames";
import BigNumber from "bignumber.js";

import { AssetType } from "types/asset";
import { SliderPercentButtonType } from "types/analytics";
import { getAssetName } from "utils/helpers/asset";
import { AnalyticsEventCategory } from "utils/analytics/analytics-event";
import { useAnalytics } from "hooks/useAnalytics";
import { CreditProcessModalEnum } from "hooks/useCreditProcessModal";
import { events } from "constants/analytics";
import { SLIDER_PERCENTS } from "constants/slider";
import { Button } from "components/ui/Button";

import s from "./Slider.module.sass";

type SliderProps = Omit<
  HTMLProps<HTMLInputElement>,
  "type" | "onChange" | "value"
> & {
  theme?: keyof typeof themeClasses;
  value?: string;
  decimals: number;
  maxValue: BigNumber;
  className?: string;
  onChange: (newValue: BigNumber) => void;
  setPercentValue?: (percent: number) => void;
  asset?: AssetType;
  modalType?: CreditProcessModalEnum;
};

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const Slider: FC<SliderProps> = ({
  theme = "primary",
  value = "0",
  decimals,
  maxValue,
  className,
  onChange,
  setPercentValue,
  asset,
  modalType,
  ...props
}) => {
  const { trackEvent } = useAnalytics();

  const percent = maxValue.eq(0) ? 0 : (+value / +maxValue) * 100;
  const finalPercent = percent > 100 ? 100 : percent;

  useEffect(() => {
    setPercentValue?.(finalPercent);
  }, [finalPercent, setPercentValue]);

  const handleClickByPercentButton = (newPercent: number) => {
    if (!maxValue.eq(0)) {
      const numVal = new BigNumber(
        maxValue ? maxValue.multipliedBy(newPercent).div(1e2) : 0
      );
      onChange(numVal);
    }

    // Analytics track
    if (asset && modalType) {
      trackEvent(
        events.credit_process_modal.slider[
          newPercent as SliderPercentButtonType
        ],
        events.credit_process_modal.name[modalType] as AnalyticsEventCategory,
        {
          asset: getAssetName(asset),
        }
      );
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!maxValue.eq(0)) {
      onChange(
        new BigNumber(event.target.value)
          .multipliedBy(maxValue)
          .div(100)
          .decimalPlaces(decimals, BigNumber.ROUND_DOWN)
      );
    }
  };

  return (
    <div className={cx(s.root, themeClasses[theme], className)}>
      <div className={s.number} style={{ left: `${finalPercent / 1.1}%` }}>
        {finalPercent.toFixed(2)}%
      </div>
      <input
        type="range"
        step={0.01}
        value={
          value
            ? new BigNumber(value).multipliedBy(100).div(maxValue).toFixed(2)
            : 0
        }
        className={cx(s.slider, themeClasses[theme], className)}
        max={100}
        onChange={handleInputChange}
        {...props}
      />

      <div className={s.percents}>
        {SLIDER_PERCENTS.map((amount) => (
          <Button
            key={amount}
            theme="clear"
            onClick={() => handleClickByPercentButton(amount)}
            className={s.percent}
          >
            {`${amount} %`}
          </Button>
        ))}
      </div>
    </div>
  );
};
