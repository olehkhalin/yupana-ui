import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import '@formatjs/intl-numberformat/polyfill';
import '@formatjs/intl-numberformat/locale-data/en';
import { ApolloProvider } from '@apollo/client';

import { DAppProvider } from 'utils/dapp';
import { UserStatsProvider } from 'providers/UserStatsProvider';
import { CreditProcessProvider } from 'providers/CreditProcessProvider';
import { CurrencyProvider } from 'providers/CurrencyProvider';
import App from 'pages/App';
import { client } from 'utils/client';
import 'styles/global.sass';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <CreditProcessProvider>
          <CurrencyProvider>
            <UserStatsProvider>
              <DAppProvider>
                <App />
              </DAppProvider>
            </UserStatsProvider>
          </CurrencyProvider>
        </CreditProcessProvider>
      </ApolloProvider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
