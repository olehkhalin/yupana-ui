export interface TokenId {
  address: string
  id?: string | number | null
}

type TokenType = {
  thumbnailUri?: string | null
  symbol?: string | null
  name?: string | null
  decimals?: number
};

type TokenMetadataType = TokenType & TokenId;

export interface TokenMetadataInterface extends TokenMetadataType {}

export interface TokenInteface extends TokenType {}

type TokenLogoType = Pick<TokenType, 'name' | 'thumbnailUri'>;
export interface TokenLogoInterface extends TokenLogoType {}
