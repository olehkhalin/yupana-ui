import React, { FC } from "react";
import cx from "classnames";

import { Preloader } from "components/ui/Preloader";
import { Section } from "components/common/Section";
import { Heading } from "components/common/Heading";
import { Item } from "components/markets-details/Item";
import { INTEREST_RATE_MODEL } from "constants/popups/interest-rate-model";

import s from "./InterestRateModel.module.sass";

const { baseRatePerYear: baseRatePerYearPopup, kink: kinkPopup } =
  INTEREST_RATE_MODEL;

const ItemsArray = [
  { text: "Current Util. rate" },
  {
    text: "Base rate per year",
    title: baseRatePerYearPopup.title,
    description: baseRatePerYearPopup.description,
  },
  { text: "Multiplier per year" },
  { text: "Jump multiplier per year" },
  {
    text: "Kink",
    title: kinkPopup.title,
    description: kinkPopup.description,
  },
];

type InterestRateModelLoadingProps = {
  className?: string;
};

export const InterestRateModelLoading: FC<InterestRateModelLoadingProps> = ({
  className,
}) => {
  return (
    <Section className={cx(s.root, className)}>
      <div className={s.detailsWrapper}>
        <Heading
          title="Interest Rate Model"
          link={{
            label: "IRM in docs",
            link: "/",
          }}
          theme="secondary"
          className={s.detailsTitle}
        />
        <div className={s.tokenName}>
          Token
          <div className={s.modelTitle}>Jump rate model</div>
        </div>
        <div className={s.list}>
          {ItemsArray.map(({ text, title, description }) => (
            <Item
              key={text}
              theme="secondary"
              text={text}
              value={""}
              title={title}
              description={description}
              icon={!!title && !!description}
              loading
              className={s.item}
            />
          ))}
        </div>
      </div>

      <div className={s.chartWrapper}>
        <Preloader theme="primary" sizeT="fluent" />
      </div>
    </Section>
  );
};
