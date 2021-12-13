import { useEffect, useState } from 'react';
import { LOADING_TIME } from 'constants/default';

export const useLoading = (loadingTime: number | undefined = LOADING_TIME) => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, loadingTime);
  }, [loadingTime]);

  return {
    loading,
  };
};
