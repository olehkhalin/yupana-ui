import { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import { ToastProvider } from "hooks/useUpdateToast";
import { CurrencyProvider } from "hooks/useCurrency";
import { DAppProvider } from "utils/dapp";
import { client } from "utils/client";

export const BaseProvider: FC = ({ children }) => (
  <Router>
    <DAppProvider>
      <ApolloProvider client={client}>
        <CurrencyProvider>
          <ToastProvider>{children}</ToastProvider>
        </CurrencyProvider>
      </ApolloProvider>
    </DAppProvider>
  </Router>
);
