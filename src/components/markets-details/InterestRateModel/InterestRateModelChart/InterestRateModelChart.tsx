import { FC, memo, useCallback, useMemo } from "react";
import { AxisOptions, Chart, Series as SeriesProps } from "react-charts";
import { TooltipRendererProps } from "react-charts/types/components/TooltipRenderer";
import cx from "classnames";

import { getPrettyPercent } from "utils/helpers/amount";
import { InterestRateModelBase } from "components/markets-details/InterestRateModel";

import { borrow, supply, utilizationRate } from "./temp-data";
import s from "./InterestRateModelChart.module.sass";

type ApyStats = {
  x: number;
  y: number;
};

type Series = {
  label: string;
  data: ApyStats[];
};

const data: Series[] = [
  {
    label: "Borrow APY",
    data: borrow,
  },
  {
    label: "Supply APY",
    data: supply,
  },
  {
    label: "Utilization rate",
    data: utilizationRate,
  },
];

const MAIN_COLORS = ["#FFB800", "#00CDEE", "#FFFFFF"];
const colors = [MAIN_COLORS[0], MAIN_COLORS[1], "rgba(255, 255, 255, 0.5)"];
const tooltipColors = [MAIN_COLORS[2], MAIN_COLORS[0], MAIN_COLORS[1]];

type InterestRateModelChartProps = InterestRateModelBase & {
  className?: string;
};

export const InterestRateModelChart: FC<InterestRateModelChartProps> = ({
  currentUtilizationRate,
  baseRatePerYear,
  multiplierPerYear,
  jumpMultiplierPerYear,
  kink,
  reserveFactor,
  className,
}) => {
  const staticChartValues = useMemo(
    () => [
      {
        label: "Kink",
        value: kink,
      },
      {
        label: "Current",
        value: currentUtilizationRate,
        offset: true,
      },
    ],
    [currentUtilizationRate, kink]
  );

  const primaryAxis = useMemo(
    (): AxisOptions<ApyStats> => ({
      getValue: (datum) => datum.x,
      showGrid: false,
      show: false,
      formatters: {
        tooltip: () => "",
      },
    }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<ApyStats>[] => [
      {
        getValue: (datum) => datum.y,
        showGrid: false,
        show: false,
        formatters: {
          tooltip: () => "",
        },
      },
    ],
    []
  );

  const seriesStyles = useCallback(
    (series: SeriesProps<ApyStats>) => ({
      color: colors[series.index],
    }),
    []
  );

  const renderTooltip = (props: TooltipProps) => <Tooltip props={props} />;

  return (
    <div className={s.root}>
      <div className={cx(s.container, className)}>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
            getSeriesStyle: seriesStyles,
            tooltip: {
              render: renderTooltip,
            },
            dark: true,
          }}
        />

        <div className={s.staticWrapper}>
          {staticChartValues.map(({ label, value, offset }, i) => {
            const isRightOffset = value.gte(90);
            const isLeftOffset = value.lte(10);
            return (
              <div
                key={`${label}-${i}`}
                style={{ left: getPrettyPercent(value) }}
                className={cx(s.rate, { [s.topSize]: offset })}
              >
                <span
                  className={cx(
                    s.ratePercent,
                    { [s.rightOffset]: isRightOffset },
                    { [s.leftOffset]: isLeftOffset }
                  )}
                >
                  {getPrettyPercent(value)}
                  <span className={s.label}>{label}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

type TooltipProps = TooltipRendererProps<ApyStats>;

const Tooltip: FC<{ props: TooltipProps }> = memo(({ props }) => {
  const focusedDatum = props.focusedDatum;
  const data = focusedDatum?.tooltipGroup;
  if (!focusedDatum || !data || data.length < 1) {
    return <></>;
  }

  const focusedSeriesLabel = focusedDatum.originalSeries.label;

  return (
    <div className={s.tooltip}>
      {data.map(({ originalSeries, originalDatum }, i) => {
        const label = originalSeries.label;
        const value =
          label === "Utilization rate"
            ? originalDatum.x.toFixed(2)
            : originalDatum.y.toFixed(2);

        return (
          <div
            key={`${label}-${i}`}
            className={cx(s.tooltipRow, {
              [s.active]: focusedSeriesLabel === label,
            })}
          >
            <span
              className={s.tooltipLabel}
              style={{ color: `${tooltipColors[i]}` }}
            >
              {`${label}:`}
            </span>
            <span
              className={s.tooltipValue}
              style={{ color: `${tooltipColors[i]}` }}
            >
              {`${value}%`}
            </span>
          </div>
        );
      })}
    </div>
  );
});
