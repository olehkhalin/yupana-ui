import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import { ToastProvider } from "hooks/useUpdateToast";
import { GlobalFactorsProvider } from "hooks/useGlobalFactors";
import { DAppProvider } from "utils/dapp";
import { client } from "utils/client";
import App from "pages/App";
import "styles/global.sass";

import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <DAppProvider>
        <ApolloProvider client={client}>
          <ToastProvider>
            <GlobalFactorsProvider>
              <App />
            </GlobalFactorsProvider>
          </ToastProvider>
        </ApolloProvider>
      </DAppProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
