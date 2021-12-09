import React from 'react';
import cx from 'classnames';

import { getPrettyAmount } from 'utils/getPrettyAmount';
import { Preloader } from 'components/ui/Preloader';

import s from './UserStat.module.sass';

type UserStatProps = {
  userSupplyBalance: number
  userBorrowBalance: number
  userNetApy: number
  className?: string
};

export const UserStat: React.FC<UserStatProps> = ({
  userSupplyBalance,
  userBorrowBalance,
  userNetApy,
  className,
}) => {
  const [isTrue, setIsTrue] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => setIsTrue(true), 2000);
  });

  return (
    <div className={cx(s.root, className)}>
      <div className={s.item}>
        <div className={s.title}>
          Your Supply Balance:
        </div>
        <div className={s.value}>
          {isTrue
            ? getPrettyAmount({ value: userSupplyBalance, currency: '$' })
            : (
              <Preloader
                theme="primary"
              />
            )}
        </div>
      </div>

      <div className={s.item}>
        <div className={s.title}>
          Net APY:
        </div>
        <div className={s.value}>
          {isTrue
            ? `${userNetApy}%`
            : (
              <Preloader
                theme="tertiary"
              />
            )}
        </div>
      </div>

      <div className={s.item}>
        <div className={s.title}>
          Your Borrow Balance:
        </div>
        <div className={s.value}>
          {isTrue
            ? getPrettyAmount({ value: userBorrowBalance, currency: '$' })
            : (
              <Preloader
                theme="secondary"
              />
            )}
        </div>
      </div>
    </div>
  );
};
