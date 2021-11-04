export interface TokenId {
  address: string
  id?: number
}

type TokenType = {
  thumbnailUri: string | null
  symbol?: string
  name?: string
  id: string
};

export interface TokenTypeInteface extends TokenType {}

type TokenLogoType = Pick<TokenType, 'name' | 'thumbnailUri'>;
export interface TokenLogoInterface extends TokenLogoType {}
