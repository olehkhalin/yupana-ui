import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "pages/App";
import "styles/global.sass";

import reportWebVitals from "./reportWebVitals";
import { DAppProvider } from "utils/dapp";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <DAppProvider>
        <App />
      </DAppProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
