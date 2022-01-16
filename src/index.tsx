import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import '@formatjs/intl-numberformat/polyfill';
import '@formatjs/intl-numberformat/locale-data/en';
import { ApolloProvider } from '@apollo/client';

import { ToastThemeProvider } from 'providers/ToastThemeProvider';
import { ConnectModalsStateProvider } from 'hooks/useConnectModalsState';
import { DAppProvider } from 'utils/dapp';
import { CurrencyProvider } from 'providers/CurrencyProvider';
import App from 'pages/App';
import { client } from 'utils/client';
import 'styles/global.sass';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <ToastThemeProvider>
          <CurrencyProvider>
            <DAppProvider>
              <ConnectModalsStateProvider>
                <App />
              </ConnectModalsStateProvider>
            </DAppProvider>
          </CurrencyProvider>
        </ToastThemeProvider>
      </ApolloProvider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
