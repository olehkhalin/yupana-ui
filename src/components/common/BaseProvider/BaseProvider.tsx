import { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import { DAppProvider } from "utils/dapp";
import { client } from "utils/client";
import { TransactionsProvider } from "hooks/useTransactions";
import { ToastProvider } from "hooks/useUpdateToast";
import { CurrencyProvider } from "hooks/useCurrency";
import { AssetsProvider } from "hooks/useAssets";
import { RedirectProvider } from "hooks/useRedirect";
import { ConnectWalletModalProvider } from "hooks/useConnectModal";
import { AssetsBalanceProvider } from "hooks/useAssetsBalance";

export const BaseProvider: FC = ({ children }) => (
  <Router>
    <DAppProvider>
      <TransactionsProvider>
        <ApolloProvider client={client}>
          <CurrencyProvider>
            <AssetsProvider>
              <AssetsBalanceProvider>
                <ConnectWalletModalProvider>
                  <RedirectProvider>
                    <ToastProvider>{children}</ToastProvider>
                  </RedirectProvider>
                </ConnectWalletModalProvider>
              </AssetsBalanceProvider>
            </AssetsProvider>
          </CurrencyProvider>
        </ApolloProvider>
      </TransactionsProvider>
    </DAppProvider>
  </Router>
);
