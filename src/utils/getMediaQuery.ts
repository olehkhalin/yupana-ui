import { useMediaQuery } from 'react-responsive';

export const useSphoneOrWider = () => useMediaQuery(
  {
    minWidth: 375,
  },
);

export const usePhoneOrWider = () => useMediaQuery(
  {
    minWidth: 425,
  },
);

export const useMphoneOrWider = () => useMediaQuery(
  {
    minWidth: 560,
  },
);

export const useLphoneOrWider = () => useMediaQuery(
  {
    minWidth: 620,
  },
);

export const useTabletOrWider = () => useMediaQuery(
  {
    minWidth: 768,
  },
);

export const useLtabletOrWider = () => useMediaQuery(
  {
    minWidth: 1024,
  },
);

export const useCustomOrWider = ({ minWidth }: { minWidth: number }) => useMediaQuery(
  {
    minWidth,
  },
);
