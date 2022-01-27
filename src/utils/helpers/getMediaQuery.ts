import { useMediaQuery } from "react-responsive";

export const useWiderThanSphone = (): boolean =>
  useMediaQuery({
    minWidth: 376,
  });

export const useWiderThanPhone = (): boolean =>
  useMediaQuery({
    minWidth: 426,
  });

export const useWiderThanMphone = (): boolean =>
  useMediaQuery({
    minWidth: 561,
  });

export const useWiderThanLphone = (): boolean =>
  useMediaQuery({
    minWidth: 621,
  });

export const useWiderThanTablet = (): boolean =>
  useMediaQuery({
    minWidth: 769,
  });

export const useWiderThanLtablet = (): boolean =>
  useMediaQuery({
    minWidth: 1025,
  });

export const useWiderThanMdesktop = (): boolean =>
  useMediaQuery({
    minWidth: 1261,
  });

export const useWiderThanCustomWidth = ({
  minWidth,
}: {
  minWidth: number;
}): boolean =>
  useMediaQuery({
    minWidth,
  });
