import { useCallback, useMemo } from "react";
import constate from "constate";
import useSWR from "swr";

import { REACT_APP_TOKENS_METADATA_API_URL } from "constants/defaults";
import { UseAssetsMetadataResponse } from "types/asset";
import { useAllAssetsQuery } from "generated/graphql";

export const [AssetsMetadataProvider, useAssetsMetadata] = constate(() => {
  const {
    data: assets,
    loading: assetsLoading,
    error: assetsError,
  } = useAllAssetsQuery();

  const assetsString = useMemo(
    () =>
      assets
        ? JSON.stringify(
            assets.asset.map(
              (ass) =>
                `${ass.contractAddress}${ass.isFa2 ? `_${ass.tokenId}` : "_0"}`
            )
          )
        : null,
    [assets]
  );

  const fetchAssetsMetadata = useCallback(async () => {
    if (assetsString) {
      const response = await fetch(REACT_APP_TOKENS_METADATA_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: assetsString,
      });

      const res = await response.json();

      return assets?.asset.map((asset, i) => ({
        contractAddress: asset.contractAddress,
        isFa2: asset.isFa2,
        tokenId: asset.isFa2 ? asset.tokenId : undefined,
        decimals: res[i] ? res[i].decimals : asset.tokens[0].decimals,
        name: res[i] ? res[i].name : asset.tokens[0].name,
        symbol: res[i] ? res[i].symbol : asset.tokens[0].symbol,
        thumbnail: res[i] ? res[i].thumbnailUri : asset.tokens[0].thumbnail,
      }));
    }

    return undefined;
  }, [assets, assetsString]);

  const { data: allAssetsMetadata, error: allAssetsMetadataError } = useSWR(
    ["all-assets-metadata-2", assetsString],
    fetchAssetsMetadata
  );

  if (!allAssetsMetadata) {
    return {
      data: null,
      loading: assetsLoading || (!allAssetsMetadata && !allAssetsMetadataError),
      error: assetsError || allAssetsMetadataError,
    };
  }

  return {
    data: allAssetsMetadata,
    loading: assetsLoading,
    error: assetsError || allAssetsMetadataError,
  } as UseAssetsMetadataResponse;
});
