import { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import { ToastProvider } from "hooks/useUpdateToast";
import { DAppProvider } from "utils/dapp";
import { client } from "utils/client";

export const BaseProvider: FC = ({ children }) => (
  <Router>
    <DAppProvider>
      <ApolloProvider client={client}>
        <ToastProvider>{children}</ToastProvider>
      </ApolloProvider>
    </DAppProvider>
  </Router>
);
