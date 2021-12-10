export interface TokenId {
  address: string
  id?: string | number | null
}

type TokenData = {
  thumbnailUri?: string | null
  symbol?: string | null
  name?: string | null
  decimals?: number
};

type TokenMetadata = TokenData & TokenId;
export interface TokenMetadataInterface extends TokenMetadata {}

type TokenLogoType = Pick<TokenData, 'name' | 'thumbnailUri'>;
export interface TokenLogoInterface extends TokenLogoType {}
