import React from 'react';

import { Tooltip, TooltipWrapperInterface } from 'components/ui/Tooltip';

type SliceTooltipProps = {
  text: string
} & TooltipWrapperInterface;

export const SliceTooltip: React.FC<SliceTooltipProps> = ({
  text,
  children,
}) => (
  <Tooltip
    content={text}
  >
    {children}
  </Tooltip>
);
