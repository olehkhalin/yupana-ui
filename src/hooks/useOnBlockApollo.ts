import { useCallback, useEffect } from "react";
import { TezosToolkit } from "@taquito/taquito";

import { useOnBlock } from "utils/dapp";

export const useOnBlockApollo = (
  tezos: TezosToolkit | null,
  useQuery: any, // TODO: Replace with type
  fetchParams?: any
) => {
  const [fetchQuery] = useQuery();

  useEffect(() => {
    fetchQuery(fetchParams);
  }, [fetchParams, fetchQuery]);

  const updateData = useCallback(() => {
    fetchQuery(fetchParams);
  }, [fetchParams, fetchQuery]);

  useOnBlock(tezos, [updateData]);
};

export const useOnBlockApolloWithData = (
  tezos: TezosToolkit | null,
  useQuery: any, // TODO: Replace with type
  withAccount = false,
  account?: string | null
) => {
  const [fetchQuery, { data }] = useQuery();

  useEffect(() => {
    if (withAccount) {
      if (account) {
        fetchQuery({
          variables: {
            account,
          },
        });
      }
    } else {
      fetchQuery();
    }
  }, [account, fetchQuery, withAccount]);

  const updateData = useCallback(() => {
    if (withAccount) {
      if (account) {
        fetchQuery({
          variables: {
            account,
          },
        });
      }
    } else {
      fetchQuery();
    }
  }, [account, fetchQuery, withAccount]);

  useOnBlock(tezos, [updateData]);

  return data;
};
