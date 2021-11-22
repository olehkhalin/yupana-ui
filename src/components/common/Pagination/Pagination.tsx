import React from 'react';

import { PaginationInterface } from 'types/pagination';
import { useMphoneOrWider } from 'utils/getMediaQuery';
import { DesktopPagination } from 'components/common/Pagination/DesktopPagination';
import { MobilePagination } from 'components/common/Pagination/MobilePagination';

type PaginationProps = {
  className?: string
} & PaginationInterface;

export const Pagination: React.FC<PaginationProps> = ({
  className,
  ...props
}) => {
  const isMobileOrWider = useMphoneOrWider();

  if (!isMobileOrWider) {
    return (
      <MobilePagination
        {...props}
        className={className}
      />
    );
  }

  return (
    <DesktopPagination
      {...props}
      className={className}
    />
  );
};
