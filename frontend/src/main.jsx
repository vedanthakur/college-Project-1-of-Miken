import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import StoreContextProvider from "./context/StoreContext";
import ErrorBoundary from "./ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ErrorBoundary>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </ErrorBoundary>
  </BrowserRouter>
);
