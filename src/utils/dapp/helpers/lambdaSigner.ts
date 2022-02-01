import { LV_ACCOUNT_PKH, LV_ACCOUNT_PUBLIC_KEY } from "constants/defaults";

class LambdaViewSigner {
  publicKeyHash = () => Promise.resolve(LV_ACCOUNT_PKH);

  publicKey = () => Promise.resolve(LV_ACCOUNT_PUBLIC_KEY);

  secretKey = (): Promise<string> => {
    throw new Error("Secret key cannot be exposed");
  };

  sign = (): Promise<{
    bytes: string;
    sig: string;
    prefixSig: string;
    sbytes: string;
  }> => {
    throw new Error("Cannot sign");
  };
}

if (!LV_ACCOUNT_PKH || !LV_ACCOUNT_PUBLIC_KEY) {
  throw new Error(
    "Require a 'TEMPLE_WALLET_LV_ACCOUNT_PKH' and 'TEMPLE_WALLET_LV_ACCOUNT_PUBLIC_KEY' environment variable to be set"
  );
}

export const lambdaSigner = new LambdaViewSigner();
