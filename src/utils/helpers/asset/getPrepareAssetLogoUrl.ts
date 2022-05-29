import { CLOUDFLARE_IPFS, IPFS_IO, PROXY_IMG } from "constants/defaults";

export const getPrepareAssetLogoUrl = (url: string | null | undefined) => {
  if (!url?.trim()) {
    return undefined;
  }

  const trimUrl = url.trim();

  const splitLink = trimUrl.split("://");
  const getProtocol: string = splitLink && splitLink.length ? splitLink[0] : "";
  const isIpfs = getProtocol === "ipfs";

  if (isIpfs) {
    return `${PROXY_IMG}/${IPFS_IO}${splitLink[1]}`;
  }

  if (
    trimUrl.match(/\.(jpeg|jpg|gif|png|svg)$/) !== null ||
    trimUrl.includes(CLOUDFLARE_IPFS) ||
    trimUrl.includes(IPFS_IO)
  ) {
    return `${PROXY_IMG}/${trimUrl}`;
  }

  return undefined;
};
