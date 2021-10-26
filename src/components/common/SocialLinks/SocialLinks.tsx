import React from 'react';
import cx from 'classnames';

import { SOCIAL_LIST } from 'constants/social';
import { Button } from 'components/ui/Button';

import s from './SocialLinks.module.sass';

type SocialLinksProps = {
  className?: string
};

export const SocialLinks: React.FC<SocialLinksProps> = ({
  className,
}) => (
  <div className={cx(s.root, className)}>
    {
        SOCIAL_LIST.map(({ href, id, Icon }) => (
          <Button
            key={id}
            href={href}
            theme="clear"
            sizeT="small"
            className={s.link}
          >
            <Icon className={s.icon} />
          </Button>
        ))
      }
  </div>
);
