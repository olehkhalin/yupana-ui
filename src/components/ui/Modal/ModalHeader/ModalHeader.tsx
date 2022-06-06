import React, { FC } from "react";
import cx from "classnames";

import s from "./ModalHeader.module.sass";

type ModalHeaderProps = {
  title: string;
  description?: string;
  className?: string;
};

export const ModalHeader: FC<ModalHeaderProps> = ({
  title,
  description,
  className,
}) => (
  <div className={cx(s.root, className)}>
    <h2 className={s.title}>{title}</h2>
    {description && <div className={s.description}>{description}</div>}
  </div>
);
