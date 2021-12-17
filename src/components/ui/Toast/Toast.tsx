import React from 'react';
import { ToastContainer, TypeOptions } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { ReactComponent as Close } from 'svg/Close.svg';

import s from './Toast.module.sass';

export const Toast: React.FC = () => {
  const CustomCloseButton = ({ closeToast }: any) => (
    <i
      onClick={closeToast}
    >
      <Close className={s.icon} />
    </i>
  );

  const typeDependentClassNames: Partial<Record<TypeOptions, string>> = {
    success: s.success, // ?
    info: s.info,
    error: s.error,
  };

  return (
    <ToastContainer
      autoClose={false}
      hideProgressBar
      position="top-center"
      className={s.toastBody}
      bodyClassName={s.toastBody}
      closeButton={CustomCloseButton}
      toastClassName={typeDependentClassNames.info}
      pauseOnHover
      closeOnClick={false}
      pauseOnFocusLoss
      icon={false}
    />
  );
};
