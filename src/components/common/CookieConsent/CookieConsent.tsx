import React, { FC } from "react";
import CookieConsentPrimitive from "react-cookie-consent";

import { Button } from "components/ui/Button";
import { ReactComponent as Close } from "svg/Close.svg";

import s from "./CookieConsent.module.sass";

export const CookieConsent: FC = () => (
  <CookieConsentPrimitive
    containerClasses={s.root}
    contentClasses={s.content}
    buttonClasses={s.button}
    buttonText={
      <Button theme="clear">
        <Close className={s.closeIcon} />
      </Button>
    }
  >
    By continuing to use this website you consent to use of third-party
    analytics cookies. You can learn more about cookies on this Website in our{" "}
    <a
      href="https://yupana-finance.gitbook.io/yupana-document-portal/agreements/cookie-policy"
      target="_blank"
      rel="noreferrer noopener"
      className={s.link}
    >
      Cookie Policy
    </a>
    .
  </CookieConsentPrimitive>
);
