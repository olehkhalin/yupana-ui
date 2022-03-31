import React, { ChangeEvent, FC, HTMLProps, useEffect } from "react";
import cx from "classnames";
import BigNumber from "bignumber.js";

import { AssetType } from "types/asset";
import { getAssetName } from "utils/helpers/asset";
import { AnalyticsEventCategory } from "utils/analytics/analytics-event";
import { useAnalytics } from "hooks/useAnalytics";
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
  modalType?: string;
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

    if (asset && modalType) {
      const values = events.credit_process_modal.slider as any;
      trackEvent(
        values[newPercent],
        AnalyticsEventCategory.CREDIT_PROCESS_MODAL,
        {
          asset: getAssetName(asset),
          modal_name: modalType,
        }
      );
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!maxValue.eq(0)) {
      onChange(new BigNumber(event.target.value));
    }
  };

  return (
    <div className={cx(s.root, themeClasses[theme], className)}>
      <div className={s.number} style={{ left: `${finalPercent / 1.1}%` }}>
        {finalPercent.toFixed(2)}%
      </div>
      <input
        type="range"
        step={1 / 10 ** decimals}
        value={value || 0}
        className={cx(s.slider, themeClasses[theme], className)}
        max={+(maxValue ?? 1)}
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
