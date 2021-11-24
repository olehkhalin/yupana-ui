import React, { useMemo } from 'react';
import cx from 'classnames';

import { getPrettyAmount } from 'utils/getPrettyAmount';
import { Section } from 'components/common/Section';
import { Item } from 'components/common/Item';
import { Heading } from 'components/common/Heading';
import { INTEREST_RATE_MODEL_DATA } from 'components/temp-data/interest-rate-model';

import s from './InterestRateModel.module.sass';

type InterestRateModelProps = {
  className?: string
};

export const InterestRateModel: React.FC<InterestRateModelProps> = ({
  className,
}) => {
  const {
    name,
    curentUtilizationRate,
    baseRatePerYear,
    multiplierPerYear,
    jumpMultiplierPerYear,
    kink,
  } = useMemo(() => ({
    ...INTEREST_RATE_MODEL_DATA,
  }), []);

  return (
    <Section className={cx(s.root, className)}>
      <div className={s.detailsWrapper}>
        <Heading
          title="Interest Rate Model"
          link={{
            label: 'IRM in docs',
            link: '/',
          }}
          theme="secondary"
          className={s.detailsTitle}
        />
        <div className={s.tokenName}>
          {name}
          <div className={s.modelTitle}>
            Jump rate model
          </div>
        </div>
        <div className={s.list}>
          <Item
            text="Curent Util. rate"
            value={`${curentUtilizationRate}%`}
            theme="secondary"
            icon={false}
            className={s.item}
          />
          <Item
            text="Base rate per year"
            value={`${baseRatePerYear}%`}
            theme="secondary"
            className={s.item}
          />
          <Item
            text="Multiplier per year"
            value={getPrettyAmount({ value: multiplierPerYear })}
            theme="secondary"
            icon={false}
            className={s.item}
          />
          <Item
            text="Jump multiplier per year"
            value={getPrettyAmount({ value: jumpMultiplierPerYear })}
            theme="secondary"
            icon={false}
            className={s.item}
          />
          <Item
            text="Kink"
            value={`${kink}%`}
            theme="secondary"
            className={s.item}
          />
        </div>
      </div>

      <div className={s.graphWrapper} />
    </Section>
  );
};
