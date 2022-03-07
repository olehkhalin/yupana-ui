import React, { FC } from "react";
import cx from "classnames";
import { ToastContainer, CloseButtonProps } from "react-toastify";

import { useWiderThanMphone } from "utils/helpers";
import { ToastThemes, useUpdateToast } from "hooks/useUpdateToast";
import { Button } from "components/ui/Button";
import { ReactComponent as Close } from "svg/Close.svg";

import "react-toastify/dist/ReactToastify.css";
import s from "./Toast.module.sass";

const typeDependentClassNames = {
  info: s.info,
  error: s.error,
};

const getToastClassName = (theme: ToastThemes): string =>
  cx(s.notification, typeDependentClassNames[theme]);

const CustomCloseButton = ({ closeToast }: CloseButtonProps) => (
  <Button theme="clear" onClick={closeToast} className={s.iconWrapper}>
    <Close className={s.icon} />
  </Button>
);

export const Toast: FC = () => {
  const { toastTheme } = useUpdateToast();
  const isWiderThanMphone = useWiderThanMphone();

  return (
    <ToastContainer
      limit={10}
      autoClose={10000}
      position={isWiderThanMphone ? "bottom-right" : "top-center"}
      closeButton={CustomCloseButton}
      hideProgressBar
      pauseOnHover
      pauseOnFocusLoss
      draggablePercent={50}
      icon={false}
      closeOnClick={false}
      toastClassName={getToastClassName(toastTheme)}
      className={s.toastBody}
    />
  );
};
