import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import "@formatjs/intl-numberformat/polyfill";
import "@formatjs/intl-numberformat/locale-data/en";

import App from "pages/App";
import { BaseProvider } from "components/common/BaseProvider";
import "styles/global.sass";

import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <StrictMode>
    <BaseProvider>
      <App />
    </BaseProvider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
