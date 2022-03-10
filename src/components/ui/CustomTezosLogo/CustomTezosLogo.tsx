import React, { FC } from "react";
import cx from "classnames";

import s from "./CustomTezosLogo.module.sass";

export const themeClass = {
  primary: s.primary,
  secondary: s.secondary,
  tertiary: s.tertiary,
};

export const sizeClass = {
  extraLarge: s.extraLarge,
  large: s.large,
  medium: s.medium,
  small: s.small,
  extraSmall: s.extraSmall,
  superExtraSmall: s.superExtraSmall,
};

type CustomTezosLogo = {
  theme?: keyof typeof themeClass;
  size?: keyof typeof sizeClass;
  error?: boolean;
  className?: string;
};

export const CustomTezosLogo: FC<CustomTezosLogo> = ({
  theme = "tertiary",
  size = "small",
  error = false,
  className,
}) => {
  const classNames = cx(
    s.root,
    themeClass[theme],
    sizeClass[size],
    { [s.error]: error },
    className
  );

  return (
    <svg
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames}
    >
      <path d="M5.80111 11.7955C6.13368 11.7955 6.45294 11.7622 6.7589 11.6957C7.06486 11.6292 7.37081 11.5494 7.67677 11.4562V13.6713C7.35751 13.8044 6.95843 13.9174 6.47954 14.0106C6.01395 14.117 5.5018 14.1702 4.9431 14.1702C4.29127 14.1702 3.70595 14.0638 3.18715 13.8509C2.68166 13.6381 2.27593 13.2722 1.96997 12.7534C1.67731 12.2212 1.53098 11.4895 1.53098 10.5582V5.3099H0.114258V4.05269L1.75047 3.05491L2.60849 0.76001H4.50411V3.07487H16.9753V5.01056L12.6652 9.04161C13.8359 9.17464 14.767 9.47398 15.4588 9.93961C16.1505 10.3919 16.6494 10.964 16.9553 11.6558C17.2613 12.3476 17.4143 13.1126 17.4143 13.9507C17.4143 14.8554 17.2014 15.6735 16.7757 16.4052C16.3501 17.137 15.6982 17.709 14.8203 18.1214C13.9423 18.5471 12.8249 18.76 11.468 18.76C9.83178 18.76 8.39511 18.5006 7.15797 17.9817V15.4274C7.79649 15.7334 8.48158 15.9662 9.21322 16.1259C9.95816 16.2855 10.6366 16.3653 11.2485 16.3653C12.06 16.3653 12.6918 16.2456 13.1441 16.0061C13.5964 15.7667 13.9157 15.4474 14.1019 15.0483C14.3015 14.6624 14.4012 14.25 14.4012 13.811C14.4012 13.3188 14.2882 12.8797 14.062 12.4939C13.8359 12.0948 13.4368 11.7822 12.8648 11.556C12.3061 11.3166 11.5212 11.1968 10.5102 11.1968H9.3529V9.08152L13.3636 5.3099H4.50411V10.5582C4.50411 10.9707 4.62383 11.2833 4.86328 11.4962C5.10272 11.6957 5.41534 11.7955 5.80111 11.7955Z" />
    </svg>
  );
};
