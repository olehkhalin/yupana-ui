import React, { FC } from "react";
import cx from "classnames";

import { Preloader } from "components/ui/Preloader";
import {
  AttentionText,
  AttentionTextProps,
} from "components/common/AttentionText";

import s from "./Item.module.sass";

type ItemProps = {
  value: string | number | JSX.Element;
  name?: string;
  loading?: boolean;
} & AttentionTextProps;

export const Item: FC<ItemProps> = ({
  value,
  className,
  loading,
  ...props
}) => (
  <div className={cx(s.root, className)}>
    <AttentionText {...props} />
    {!loading ? value : <Preloader sizeT="small" />}
  </div>
);
