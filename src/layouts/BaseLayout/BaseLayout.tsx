import React, { FC } from "react";
import cx from "classnames";

import { Header } from "components/common/Header";
import { Container } from "components/common/Container";
import { Footer } from "components/common/Footer";

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
    <Header className={cx(s.header, headerClassName)} />
    <Container main className={cx(s.container, className)}>
      {children}
    </Container>
    <Footer />
  </>
);
