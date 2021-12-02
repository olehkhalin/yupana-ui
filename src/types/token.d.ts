export interface TokenId {
  address: string
  id?: string
}

type TokenType = {
  thumbnailUri?: string | null
  symbol?: string
  name?: string
};

type TokenMetadataType = TokenType & TokenId;
type TokenFullMetadataType = TokenMetadataType & { decimals?: number };

export interface TokenMetadataInterface extends TokenMetadataType {}
export interface TokenFullMetadataInterface extends TokenFullMetadataType {}

export interface TokenInteface extends TokenType {}

type TokenLogoType = Pick<TokenType, 'name' | 'thumbnailUri'>;
export interface TokenLogoInterface extends TokenLogoType {}
