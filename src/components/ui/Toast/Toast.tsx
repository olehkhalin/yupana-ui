import React, { useContext } from 'react';
import cx from 'classnames';
import { ToastContainer, TypeOptions, CloseButtonProps } from 'react-toastify';

import { useWiderThanMphone } from 'utils/getMediaQuery';
import { ThemeContext } from 'providers/ThemeContext';

import 'react-toastify/dist/ReactToastify.css';

import { ReactComponent as Close } from 'svg/Close.svg';

import s from './Toast.module.sass';

const typeDependentClassNames: Partial<Record<TypeOptions, string>> | any = {
  info: s.info,
  error: s.error,
};

const getToastClassName: Exclude<any, string> = (context: string) => cx(
  s.notification,
  typeDependentClassNames[context],
);

const CustomCloseButton = ({ closeToast }: CloseButtonProps) => (
  <i
    onClick={closeToast}
    className={s.iconWrapper}
  >
    <Close className={s.icon} />
  </i>
);

export const Toast: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const isWiderThanMphone = useWiderThanMphone();

  return (
    <ToastContainer
      autoClose={5000}
      position={isWiderThanMphone ? 'bottom-right' : 'top-center'}
      className={s.toastBody}
      toastClassName={getToastClassName(theme)}
      closeButton={CustomCloseButton}
      hideProgressBar
      pauseOnHover
      pauseOnFocusLoss
      draggablePercent={50}
      icon={false}
      closeOnClick={false}
    />
  );
};
