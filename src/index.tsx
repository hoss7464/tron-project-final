import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import { LoadingProvider } from "./contexts/LoaderContext";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { TronWalletProvider } from "./contexts/TronWalletContext";
import "../node_modules/flag-icon-css/css/flag-icons.min.css";
import { FetchDataProvider } from "./contexts/FetchDataContext";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <LoadingProvider>
      <Provider store={store}>
        <Router>
          <TronWalletProvider>
            <FetchDataProvider>
              <I18nextProvider i18n={i18n}>
                <App />
              </I18nextProvider>
            </FetchDataProvider>
          </TronWalletProvider>
        </Router>
      </Provider>
    </LoadingProvider>
  </React.StrictMode>
);

reportWebVitals();
