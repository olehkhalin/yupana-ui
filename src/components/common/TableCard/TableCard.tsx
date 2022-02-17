import React, { ReactElement, useState } from "react";
import cx from "classnames";

import { Preloader } from "components/ui/Preloader";
import { Button } from "components/ui/Button";
import { DropdownArrow } from "components/tables/DropdownArrow";

import s from "./TableCard.module.sass";

type FunctionType = () => string;

type DataType = {
  id?: string;
  title: string;
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
  className?: string;
};

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
  tertiary: s.tertiary,
};

export const TableCard: React.FC<TableCardProps> = ({
  data,
  loading,
  subComponent,
  renderRowSubComponent,
  href,
  theme = "primary",
  className,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const isExpander = !!subComponent && !!renderRowSubComponent;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={cx(s.root, themeClasses[theme], className)}
      onClick={() => setIsOpened(!isOpened)}
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
      {data.map(({ id, title, content, isLogo, rowClassName }) => (
        <>
          <div className={cx(s.row, rowClassName)} key={id ?? title}>
            <h4 className={s.title}>{title}</h4>
            <div className={cx({ [s.value]: !isLogo })}>
              {typeof content === "function" ? content() : content}
            </div>
          </div>
        </>
      ))}
      {isExpander && isOpened && renderRowSubComponent(subComponent)}
    </div>
  );
};
