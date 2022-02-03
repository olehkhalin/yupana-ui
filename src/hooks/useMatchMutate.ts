import { useSWRConfig, unstable_serialize } from "swr";

export const useMatchMutate = () => {
  const { cache, mutate } = useSWRConfig();
  return (matcher: any, ...args: any) => {
    if (!(cache instanceof Map)) {
      console.error(
        "matchMutate requires the cache provider to be a Map instance"
      );
    }

    const keys = [];
    // @ts-ignore
    for (const key of cache.keys()) {
      if (key.startsWith(unstable_serialize([matcher]))) {
        keys.push(key);
      }
    }

    const mutations = keys.map((key) => mutate(key, ...args));
    return Promise.all(mutations);
  };
};
