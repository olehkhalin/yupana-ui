import React, { ReactNode } from "react";

import { Tooltip, TooltipProps } from "components/ui/Tooltip";

type TextWithTooltipProps = {
  tooltipContent: ReactNode;
  text: string;
  className?: string;
} & TooltipProps;

export const TextWithTooltip: React.FC<TextWithTooltipProps> = ({
  tooltipContent,
  text,
  className,
  children,
}) => {
  return (
    <Tooltip content={tooltipContent} className={className}>
      <>
        {text}
        {children}
      </>
    </Tooltip>
  );
};
