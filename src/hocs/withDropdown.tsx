import React, { useState } from 'react';

import { WithDropdownInterface } from 'types/with-dropdown';

export function withDropdown<P>(
  WrappedComponent: React.ComponentType<P & WithDropdownInterface>,
) {
  return (props: P) => {
    const [active, setActive] = useState<boolean>(false);

    const handleSwitchCollapse = () => {
      setActive(!active);
    };

    return (
      <WrappedComponent
        active={active}
        onClick={handleSwitchCollapse}
        {...props}
      />
    );
  };
}
