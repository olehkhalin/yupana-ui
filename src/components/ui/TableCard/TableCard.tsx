import React from 'react';
import { UnmountClosed } from 'react-collapse';
import cx from 'classnames';

import { Button } from 'components/ui/Button';
import { DropdownArrow } from 'components/common/DropdownArrow';
import { TableDropdown } from 'components/common/TableDropdown';

import s from './TableCard.module.sass';

type TableCardProps = {
  theme?: keyof typeof themeClasses
  withDetailsButton?: boolean
  collapsed?: boolean
  active?: boolean
  onClick?: <T>(arg?: T) => void
  className?: string
};

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const TableCard: React.FC<TableCardProps> = ({
  theme = 'primary',
  withDetailsButton = false,
  collapsed = true,
  active = false,
  onClick,
  className,
  children,
}) => (
  <div
    onClick={onClick}
    className={cx(s.root, themeClasses[theme], className)}
  >
    {withDetailsButton && (
      <Button
        href="/"
        sizeT="small"
        theme="light"
        className={s.link}
      >
        Details
      </Button>
    )}
    {!withDetailsButton && collapsed && (
      <DropdownArrow
        theme={theme}
        active={active}
        className={s.arrow}
      />
    )}

    <div className={s.wrapper}>
      {children}
    </div>

    {!withDetailsButton && collapsed && (
      <UnmountClosed
        isOpened={active}
        initialStyle={{ height: '0px', overflow: 'hidden' }}
        checkTimeout={500}
        theme={{ collapse: s.ReactCollapse }}
      >
        <TableDropdown
          theme={theme}
          className={s.dropdown}
        />
      </UnmountClosed>
    )}
  </div>
);
