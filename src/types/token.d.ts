export interface TokenId {
  address: string
  id?: string
}

type TokenData = {
  name?: string
  symbol?: string
  thumbnailUri?: string | null
  decimals?: number
};

type TokenMetadata = TokenData & TokenId;
type TokenMetadataWithBalance = TokenData & { balance?: BigNumber };

export interface TokenMetadataInterface extends TokenMetadata {}
export interface TokenMetadataWithBalanceInterface extends TokenMetadataWithBalance {}

type TokenLogoType = Pick<TokenData, 'name' | 'thumbnailUri'>;
export interface TokenLogoInterface extends TokenLogoType {}
