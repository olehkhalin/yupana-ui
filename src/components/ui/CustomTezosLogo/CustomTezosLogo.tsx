import React, { FC } from "react";
import cx from "classnames";

import s from "./CustomTezosLogo.module.sass";

const getThemeShadows = (theme: keyof typeof themeClass, isError = false) => {
  if (isError) {
    return "0 0 0 0 0.988235 0 0 0 0 0.298039 0 0 0 0 0 0 0 0 1 0";
  }
  switch (theme) {
    case "primary":
      return "0 0 0 0 0 0 0 0 0 0.760784 0 0 0 0 1 0 0 0 1 0";
    case "secondary":
      return "0 0 0 0 1 0 0 0 0 0.66 0 0 0 0 0 0 0 0 1 0";
    default:
      return "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0";
  }
};

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
  withLight?: boolean;
  className?: string;
};

export const CustomTezosLogo: FC<CustomTezosLogo> = ({
  theme = "tertiary",
  size = "small",
  error = false,
  withLight = false,
  className,
}) => {
  const classNames = cx(
    s.root,
    themeClass[theme],
    sizeClass[size],
    { [s.error]: error },
    { [s.withLight]: withLight },
    className
  );

  if (withLight) {
    return (
      <svg
        viewBox="0 0 35 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={classNames}
      >
        <g clipPath={`url(#clip0_2_5-${theme})`}>
          <g filter={`url(#filter0_d_2_5-${theme})`}>
            <path
              d="M12.7655 21.1928C13.3097 21.1928 13.8321 21.1392 14.3328 21.0322C14.8334 20.9252 15.3341 20.7969 15.8347 20.6469V24.2104C15.3123 24.4245 14.6593 24.6063 13.8756 24.7562C13.1137 24.9273 12.2757 25.0129 11.3614 25.0129C10.2948 25.0129 9.33702 24.8418 8.48807 24.4993C7.6609 24.1569 6.99698 23.5683 6.49632 22.7337C6.01742 21.8776 5.77797 20.7005 5.77797 19.2023V10.7594H3.4597V8.73694L6.13714 7.13181L7.54117 3.44002H10.6431V7.16392H31.0505V10.2779L23.9976 16.7626C25.9133 16.9766 27.4369 17.4581 28.569 18.2072C29.7008 18.9348 30.5172 19.8551 31.0178 20.968C31.5185 22.0809 31.7689 23.3116 31.7689 24.6598C31.7689 26.1152 31.4205 27.4313 30.7239 28.6084C30.0274 29.7856 28.9607 30.7058 27.5241 31.3692C26.0874 32.054 24.2589 32.3965 22.0386 32.3965C19.3611 32.3965 17.0102 31.9792 14.9858 31.1445V27.0354C16.0306 27.5276 17.1517 27.9021 18.3489 28.1591C19.5679 28.4158 20.6781 28.5442 21.6794 28.5442C23.0073 28.5442 24.0411 28.3516 24.7813 27.9663C25.5214 27.5812 26.0439 27.0676 26.3486 26.4255C26.6752 25.8047 26.8383 25.1413 26.8383 24.4351C26.8383 23.6433 26.6534 22.9369 26.2833 22.3163C25.9133 21.6742 25.2602 21.1714 24.3242 20.8075C23.41 20.4224 22.1256 20.2296 20.4712 20.2296H18.5775V16.8268L25.1404 10.7594H10.6431V19.2023C10.6431 19.8659 10.839 20.3688 11.2308 20.7113C11.6226 21.0322 12.1342 21.1928 12.7655 21.1928Z"
              fill="#00E0FF"
            />
          </g>
        </g>
        <defs>
          <filter
            id={`filter0_d_2_5-${theme}`}
            x="-0.540298"
            y="-0.559984"
            width="36.3092"
            height="36.9565"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values={getThemeShadows(theme, error)}
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_2_5"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_2_5"
              result="shape"
            />
          </filter>
          <clipPath id={`clip0_2_5-${theme}`}>
            <rect width="35" height="36" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }

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
