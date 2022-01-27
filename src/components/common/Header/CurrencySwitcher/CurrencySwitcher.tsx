import React, { FC } from "react";
import cx from "classnames";

import { useWiderThanMphone } from "utils/helpers";
import { Button } from "components/ui/Button";

import s from "./CurrencySwitcher.module.sass";

type CurrencySwitcherProps = {
  className?: string;
};

export const CurrencySwitcher: FC<CurrencySwitcherProps> = ({ className }) => {
  const isWiderThanMphone = useWiderThanMphone();

  // const handleSwitchCurrency = () => {
  //   console.log("handle switch");
  // };
  //
  // const handleSwitchCurrencyMobile = (arg: boolean) => {
  //   if (arg) {
  //     console.log("arg");
  //   } else {
  //     console.log("else - arg");
  //   }
  // };

  if (isWiderThanMphone) {
    return (
      <div className={cx(s.root, className)}>
        <Button sizeT="small" theme="clear" className={cx(s.button, s.active)}>
          XTZ
        </Button>
        <span className={s.separator} />
        <Button sizeT="small" theme="clear" className={cx(s.button)}>
          USD
        </Button>
      </div>
    );
  }

  return (
    <Button sizeT="small" theme="clear" className={cx(s.root, className)}>
      <div className={cx(s.currency, s.active)}>
        <div className={cx(s.item, s.active)}>XTZ</div>
        <div className={cx(s.item)}>USD</div>
      </div>
    </Button>
  );
};
