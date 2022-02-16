import React, { ReactElement, useState } from "react";
import cx from "classnames";

import { Preloader } from "components/ui/Preloader";
import { DropdownArrow } from "components/tables/DropdownArrow";

import s from "./TableCard.module.sass";

type FunctionType = () => string;

type DataType = {
  id?: string;
  title: string;
  content: ReactElement | string | FunctionType;
  isLogo?: boolean;
}[];

type TableCardProps = {
  data: DataType;
  loading?: boolean;
  subComponent?: any;
  renderRowSubComponent?: (props: any) => void;
  theme?: keyof typeof themeClasses;
  className?: string;
};

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const TableCard: React.FC<TableCardProps> = ({
  data,
  loading,
  subComponent,
  renderRowSubComponent,
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
      {isExpander && (
        <DropdownArrow
          theme={theme}
          active={isOpened}
          loading={loading}
          disabled={loading}
          className={s.arrow}
        />
      )}
      {loading && <Preloader theme={theme} className={s.preloader} />}
      {data.map(({ id, title, content, isLogo }) => (
        <div className={s.row} key={id ?? title}>
          <div className={s.title}>{title}</div>
          <div className={cx({ [s.value]: !isLogo })}>
            {typeof content === "function" ? content() : content}
          </div>
        </div>
      ))}
      {isExpander && isOpened && renderRowSubComponent(subComponent)}
    </div>
  );
};
