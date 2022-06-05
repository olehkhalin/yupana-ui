import React, { FC } from "react";
import cx from "classnames";

import { Toast } from "components/ui/Toast";
import { Header } from "components/common/Header";
import { Container } from "components/common/Container";
import { Footer } from "components/common/Footer";
import { CookieConsent } from "components/common/CookieConsent";

import s from "./BaseLayout.module.sass";

type BaseLayoutProps = {
  headerClassName?: string;
  className?: string;
};

export const BaseLayout: FC<BaseLayoutProps> = ({
  children,
  headerClassName,
  className,
}) => (
  <>
    <Header className={headerClassName} />
    <Container main className={cx(s.container, className)}>
      {children}
      <Toast />
    </Container>
    <Footer />
    <CookieConsent />
  </>
);
