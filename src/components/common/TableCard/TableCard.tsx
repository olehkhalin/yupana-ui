import React, { FC, ReactElement, useState } from "react";
import cx from "classnames";

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
  loading?: boolean;
  subComponent?: any;
  renderRowSubComponent?: (props: any) => void;
  href?: string;
  theme?: keyof typeof themeClasses;
  yToken?: number;
  handleClick?: (props: number) => void;
  isSeparateContent?: boolean;
  className?: string;
};

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
  tertiary: s.tertiary,
};

export const TableCard: FC<TableCardProps> = ({
  data,
  loading,
  subComponent,
  renderRowSubComponent,
  href,
  theme = "primary",
  yToken,
  handleClick,
  isSeparateContent = false,
  className,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const isExpander = !!subComponent && !!renderRowSubComponent;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={cx(
        s.root,
        { [s.subRoot]: isSeparateContent },
        themeClasses[theme],
        className
      )}
      onClick={() => {
        setIsOpened(!isOpened);
        if (yToken !== undefined && handleClick) {
          handleClick(yToken);
        }
      }}
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
