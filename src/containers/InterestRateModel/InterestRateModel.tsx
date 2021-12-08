import React, { useMemo } from 'react';
import cx from 'classnames';

import { getPrettyAmount } from 'utils/getPrettyAmount';
import { getTokenName } from 'utils/getTokenName';
import { getPrettyPercent } from 'utils/getPrettyPercent';
import { TokenMetadataInterface } from 'types/token';
import { Section } from 'components/common/Section';
import { Item } from 'components/common/Item';
import { Heading } from 'components/common/Heading';
import { INTEREST_RATE_MODEL } from 'constants/popups/interest-rate-model';

import s from './InterestRateModel.module.sass';

type InterestRateModelProps = {
  asset: TokenMetadataInterface
  data: any
  className?: string
};

export const InterestRateModel: React.FC<InterestRateModelProps> = ({
  asset,
  data,
  className,
}) => {
  const {
    currentUtilizationRate,
    baseRatePerYear,
    multiplierPerYear,
    jumpMultiplierPerYear,
    kink,
  } = data;

  const {
    baseRatePerYear: baseRatePerYearPopup,
    kink: kinkPopup,
  } = useMemo(
    () => INTEREST_RATE_MODEL,
    [],
  );

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
          {getTokenName(asset, false, true)}
          <div className={s.modelTitle}>
            Jump rate model
          </div>
        </div>
        <div className={s.list}>
          <Item
            text="Current Util. rate"
            value={getPrettyPercent(currentUtilizationRate)}
            theme="secondary"
            icon={false}
            className={s.item}
          />
          <Item
            text="Base rate per year"
            value={getPrettyPercent(baseRatePerYear)}
            title={baseRatePerYearPopup.title}
            description={baseRatePerYearPopup.description}
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
            value={getPrettyPercent(kink)}
            title={kinkPopup.title}
            description={kinkPopup.description}
            theme="secondary"
            className={s.item}
          />
        </div>
      </div>

      <div className={s.graphWrapper} />
    </Section>
  );
};
