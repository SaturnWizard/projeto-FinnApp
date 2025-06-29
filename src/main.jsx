import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { TransactionsProvider } from "./context/TransactionsContext.jsx"; // 1. Importe o novo provider
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <TransactionsProvider>
        <App />
      </TransactionsProvider>
    </AuthProvider>
  </React.StrictMode>
);