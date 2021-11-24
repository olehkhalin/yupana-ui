import { useMediaQuery } from 'react-responsive';

export const useWiderThanSphone = () => useMediaQuery(
  {
    minWidth: 376,
  },
);

export const useWiderThanPhone = () => useMediaQuery(
  {
    minWidth: 426,
  },
);

export const useWiderThanMphone = () => useMediaQuery(
  {
    minWidth: 561,
  },
);

export const useWiderThanLphone = () => useMediaQuery(
  {
    minWidth: 621,
  },
);

export const useWiderThanTablet = () => useMediaQuery(
  {
    minWidth: 769,
  },
);

export const useWiderThanLtablet = () => useMediaQuery(
  {
    minWidth: 1025,
  },
);

export const useWiderThanMdesktop = () => useMediaQuery(
  {
    minWidth: 1261,
  },
);

export const useWiderThanCustomWidth = ({ minWidth }: { minWidth: number }) => useMediaQuery(
  {
    minWidth,
  },
);
