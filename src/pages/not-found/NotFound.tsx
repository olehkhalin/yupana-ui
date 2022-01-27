import React, { FC } from "react";

import BaseLayout from "layouts/BaseLayout";

import s from "./NotFound.module.sass";

export const NotFound: FC = () => (
  <BaseLayout className={s.container}>
    <h1 className={s.number}>404</h1>
    <h2 className={s.text}>page not found</h2>
  </BaseLayout>
);
