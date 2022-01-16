import React, { ReactElement } from 'react';
import { UnmountClosed } from 'react-collapse';
import cx from 'classnames';

import { Preloader, PreloaderThemes } from 'components/ui/Preloader';
import { Button } from 'components/ui/Button';
import { DropdownArrow } from 'components/common/DropdownArrow';
// import { SupplyTableDropdown } from 'components/common/TableDropdown';

import s from './TableCard.module.sass';

type TableCardProps = {
  theme?: keyof typeof themeClasses
  preloaderTheme?: PreloaderThemes
  loading?: boolean
  withDetailsButton?: boolean
  collapsed?: boolean
  active?: boolean
  href?: string
  onClick?: <T>(arg?: T) => void
  TableDropdown?: ReactElement // TODO: Research if we should use it necessarily
  className?: string
};

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const TableCard: React.FC<TableCardProps> = ({
  theme = 'primary',
  preloaderTheme = 'primary',
  loading,
  withDetailsButton = false,
  collapsed = true,
  active = false,
  href,
  onClick,
  TableDropdown,
  className,
  children,
}) => (
  <div
    onClick={!loading ? onClick : () => {}}
    className={cx(s.root, themeClasses[theme], { [s.market]: withDetailsButton }, className)}
  >
    {loading && (
    <Preloader
      theme={preloaderTheme}
      className={s.preloader}
    />
    )}
    {withDetailsButton && (
      <Button
        href={loading ? '' : href}
        sizeT="small"
        theme="light"
        disabled={loading}
        className={s.link}
      >
        Details
      </Button>
    )}
    {!withDetailsButton && collapsed && (
      <DropdownArrow
        theme={theme}
        active={active}
        loading={loading}
        disabled={loading}
        className={s.arrow}
      />
    )}

    {children}

    {!withDetailsButton && collapsed && (
      <UnmountClosed
        isOpened={active}
        initialStyle={{ height: '0px', overflow: 'hidden' }}
        checkTimeout={500}
        theme={{ collapse: s.ReactCollapse }}
      >
        {TableDropdown}
      </UnmountClosed>
    )}
  </div>
);
