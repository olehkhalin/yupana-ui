import { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import { DAppProvider } from "utils/dapp";
import { client } from "utils/client";
import { ToastProvider } from "hooks/useUpdateToast";
import { CurrencyProvider } from "hooks/useCurrency";
import { AssetsProvider } from "hooks/useAssets";

export const BaseProvider: FC = ({ children }) => (
  <Router>
    <DAppProvider>
      <ApolloProvider client={client}>
        <CurrencyProvider>
          <AssetsProvider>
            <ToastProvider>{children}</ToastProvider>
          </AssetsProvider>
        </CurrencyProvider>
      </ApolloProvider>
    </DAppProvider>
  </Router>
);