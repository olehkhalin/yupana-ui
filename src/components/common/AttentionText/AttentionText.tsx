import React, { useState, useCallback, FC } from "react";
import cx from "classnames";

import { TooltipsKeyType } from "types/analytics";
import { AnalyticsEventCategory } from "utils/analytics/analytics-event";
import { events } from "constants/analytics";
import { useAnalytics } from "hooks/useAnalytics";
import { Button } from "components/ui/Button";
import { InformationModal } from "components/modals/InformationModal";
import { ReactComponent as Attention } from "svg/Attention.svg";

import s from "./AttentionText.module.sass";

export enum TooltipCategoryEnum {
  LENDING = AnalyticsEventCategory.LENDING,
  LIQUIDATE = AnalyticsEventCategory.LIQUIDATE,
}

export type ModalContent = {
  title?: string;
  description?: string;
  buttonText?: string;
};

export type AttentionTextProps = {
  text: string;
  theme?: keyof typeof themeClasses;
  icon?: boolean;
  name?: string;
  category?: TooltipCategoryEnum;
  className?: string;
} & ModalContent;

export const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const AttentionText: FC<AttentionTextProps> = ({
  text,
  title,
  description,
  buttonText,
  theme = "primary",
  icon = true,
  name,
  category,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { trackEvent } = useAnalytics();

  const handleModal = useCallback(() => {
    setIsOpen(!isOpen);

    // Analytics track
    if (name && !isOpen) {
      trackEvent(
        events.tooltips[name as TooltipsKeyType],
        category as unknown as AnalyticsEventCategory
      );
    }
  }, [category, isOpen, name, trackEvent]);

  return (
    <div className={cx(s.root, themeClasses[theme], className)}>
      {text}
      {icon && title && description && (
        <>
          <Button theme="clear" onClick={handleModal} className={s.attention}>
            <Attention className={s.attentionIcon} />
          </Button>
          <InformationModal
            title={title}
            description={description}
            buttonText={buttonText}
            isOpen={isOpen}
            onRequestClose={handleModal}
            onClick={handleModal}
          />
        </>
      )}
    </div>
  );
};
