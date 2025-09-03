import React from "react";
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


//in index.tsx I deleted React.StrictMode so that to have one log for each state in debug mode not twice
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
    <LoadingProvider>
      <Provider store={store}>  {/* ← Redux Provider first */}
        <TronWalletProvider>  {/* ← Now TronWalletProvider can use useDispatch */}
          <FetchDataProvider>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </FetchDataProvider>
        </TronWalletProvider>
      </Provider>
    </LoadingProvider>
   </React.StrictMode>
);

reportWebVitals();
