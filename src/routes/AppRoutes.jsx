import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import TransactionsPage from "../pages/TransactionsPage";
import PasswordPage from "../pages/PasswordPage";
import PrivateRoute from "./PrivateRoute";
import { TransactionsProvider } from "../context/TransactionsContext.jsx";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/password" element={<PasswordPage />} />
      <Route
        path="/dashboard"
        element={
          <TransactionsProvider>
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          </TransactionsProvider>
        }
      />
      <Route
        path="/transactions"
        element={
          <TransactionsProvider>
            <PrivateRoute>
              <TransactionsPage />
            </PrivateRoute>
          </TransactionsProvider>
        }
      />
    </Routes>
  );
}