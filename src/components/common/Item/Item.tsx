import React from 'react';
import cx from 'classnames';

import { AttentionText, AttentionTextProps } from 'components/common/AttentionText';

import s from './Item.module.sass';

type ItemProps = {
  value: string | number
} & AttentionTextProps;

export const Item: React.FC<ItemProps> = ({
  value,
  className,
  ...props
}) => (
  <div className={cx(s.root, className)}>
    <AttentionText
      {...props}
    />
    {value}
  </div>
);
