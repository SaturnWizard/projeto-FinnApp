import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
  const [summary, setSummary] = useState({ saldo: 0, totalReceitas: 0, totalDespesas: 0 });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);
  const API_URL = 'http://localhost:3001';

  const fetchFinancialData = useCallback(async () => {
    setLoading(true);
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError("Usuário não identificado.");
      setLoading(false);
      return;
    }

    try {
      // Buscar dados do usuário
      const userResponse = await fetch(`${API_URL}/users/${userId}`);
      if (!userResponse.ok) {
        throw new Error('Falha ao buscar dados do usuário.');
      }
      const userData = await userResponse.json();
      setSummary({
        saldo: userData.saldo,
        totalReceitas: userData.totalReceitas,
        totalDespesas: userData.totalDespesas,
      });

      // Buscar transações do usuário
      const transactionsResponse = await fetch(`${API_URL}/transactions?userId=${userId}`);
      if (!transactionsResponse.ok) {
        throw new Error('Falha ao buscar transações.');
      }
      const transactionsData = await transactionsResponse.json();
      setTransactions(transactionsData);

      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchFinancialData();
    } else {
      setSummary({ saldo: 0, totalReceitas: 0, totalDespesas: 0 });
      setTransactions([]);
      setLoading(false);
    }
  }, [isAuthenticated, fetchFinancialData]);

  const addTransaction = async ({ tipo, descricao, valor, categoria }) => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const newTransaction = {
      userId,
      tipo,
      descricao,
      valor: parseFloat(valor),
      categoria,
      data: new Date().toISOString(),
    };

    const response = await fetch(`${API_URL}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTransaction),
    });

    if (response.ok) {
      const savedTransaction = await response.json();
      setTransactions(prev => [...prev, savedTransaction]);
    }
    
    const newSummary = { ...summary };
    if (tipo === 'receita') {
      newSummary.totalReceitas += parseFloat(valor);
    } else {
      newSummary.totalDespesas += parseFloat(valor);
    }
    newSummary.saldo = newSummary.totalReceitas - newSummary.totalDespesas;

    await fetch(`${API_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            saldo: newSummary.saldo,
            totalReceitas: newSummary.totalReceitas,
            totalDespesas: newSummary.totalDespesas,
        }),
    });

    setSummary(newSummary);
  };

  return (
    <TransactionsContext.Provider value={{ summary, transactions, loading, error, addTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};