import React, { FC, ReactElement, useState, useCallback } from "react";
import cx from "classnames";

import { AssetType } from "types/asset";
import { getSliceAssetName } from "utils/helpers/asset";
import { AnalyticsEventCategory } from "utils/analytics/analytics-event";
import { useAnalytics } from "hooks/useAnalytics";
import { Preloader } from "components/ui/Preloader";
import { Button } from "components/ui/Button";
import { DropdownArrow } from "components/tables/DropdownArrow";

import s from "./TableCard.module.sass";

type FunctionType = () => string | ReactElement;

type DataType = {
  id?: string;
  title: ReactElement | string;
  content: ReactElement | string | FunctionType;
  isLogo?: boolean;
  rowClassName?: string;
}[];

type TableCardProps = {
  data: DataType;
  asset?: AssetType;
  tableName?: string;
  loading?: boolean;
  subComponent?: any;
  renderRowSubComponent?: (props: any) => void;
  href?: string;
  theme?: keyof typeof themeClasses;
  yToken?: number;
  handleClick?: (props: number) => void;
  className?: string;
};

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
  tertiary: s.tertiary,
};

export const TableCard: FC<TableCardProps> = ({
  data,
  asset,
  tableName,
  loading,
  subComponent,
  renderRowSubComponent,
  href,
  theme = "primary",
  yToken,
  handleClick,
  className,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const { trackEvent } = useAnalytics();

  const isExpander = !!subComponent && !!renderRowSubComponent;

  const handleCardClick = useCallback(() => {
    setIsOpened(!isOpened);
    if (yToken !== undefined && handleClick) {
      handleClick(yToken);
    }

    if (asset && !isOpened) {
      trackEvent(`Card click`, AnalyticsEventCategory.LENDING, {
        table_name: tableName,
        asset: getSliceAssetName(asset),
      });
    }
  }, [asset, handleClick, isOpened, tableName, trackEvent, yToken]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={cx(s.root, themeClasses[theme], className)}
      onClick={handleCardClick}
    >
      {loading && <Preloader theme={theme} className={s.preloader} />}
      {isExpander && (
        <DropdownArrow
          theme={theme !== "tertiary" ? theme : undefined}
          active={isOpened}
          loading={loading}
          disabled={loading}
          className={s.arrow}
        />
      )}
      {href && (
        <Button
          href={loading ? "" : href}
          sizeT="small"
          theme="light"
          disabled={loading}
          className={s.link}
        >
          Details
        </Button>
      )}
      {data.map(({ id, title, content, isLogo, rowClassName }, i) => (
        <>
          <div
            className={cx(s.row, rowClassName)}
            key={id ?? (title && typeof title === "string" ? title : i)}
          >
            <h4 className={s.title}>{title}</h4>
            <div className={cx({ [s.value]: !isLogo })}>
              {typeof content === "function" ? content() : content}
            </div>
          </div>
        </>
      ))}
      {isExpander &&
        isOpened &&
        renderRowSubComponent &&
        renderRowSubComponent(subComponent)}
    </div>
  );
};
