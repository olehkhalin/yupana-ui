import React, { FC } from "react";

import { PaginationInterface } from "types/pagination";
import { useWiderThanMphone } from "utils/helpers";

import { DesktopPagination } from "./DesktopPagination";
import { MobilePagination } from "./MobilePagination";

type PaginationProps = {
  className?: string;
} & PaginationInterface;

export const Pagination: FC<PaginationProps> = ({ className, ...props }) => {
  const isMobileOrWider = useWiderThanMphone();

  if (!isMobileOrWider) {
    return <MobilePagination {...props} className={className} />;
  }

  return <DesktopPagination {...props} className={className} />;
};
