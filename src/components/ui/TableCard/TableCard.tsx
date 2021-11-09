import React, { useState } from 'react';
import { UnmountClosed } from 'react-collapse';
import cx from 'classnames';

import { Button } from 'components/ui/Button';
import { DropdownArrow } from 'components/common/DropdownArrow';
import { TableDropdown } from 'components/common/TableDropdown';

import s from './TableCard.module.sass';

type TableCardProps = {
  theme?: keyof typeof themeClasses
  market?: boolean
  className?: string
};

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const TableCard: React.FC<TableCardProps> = ({
  theme = 'primary',
  market = false,
  className,
  children,
}) => {
  const [active, setActive] = useState<boolean>(false);

  const handleSwitchCollapse = () => {
    setActive(!active);
  };

  return (
    <div
      onClick={handleSwitchCollapse}
      className={cx(s.root, themeClasses[theme], className)}
    >
      {market ? (
        <Button
          href="/"
          sizeT="small"
          theme="light"
          className={s.link}
        >
          Details
        </Button>
      )
        : (
          <DropdownArrow
            theme={theme}
            active={active}
            className={s.arrow}
          />
        )}

      <div className={s.wrapper}>
        {children}
      </div>

      {!market && (
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
};
