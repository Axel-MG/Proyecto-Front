import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router";
import { ClienteProvider } from "./context/ClienteContext";
import { CarritoProvider } from "./context/CarritoContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <ClienteProvider>
    <CarritoProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CarritoProvider>
  </ClienteProvider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
