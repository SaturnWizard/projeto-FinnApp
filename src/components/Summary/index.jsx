import React, { useContext } from 'react';
import { TransactionsContext } from '../../context/TransactionsContext';

const SummaryCard = ({ title, value, colorClass }) => (
  <div style={{
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    minWidth: "200px",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
  }}>
    <h5>{title}</h5>
    <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }} className={colorClass}>
      {value}
    </p>
  </div>
);

const Summary = () => {
  const { summary } = useContext(TransactionsContext);

  const formatCurrency = (value) => {
    if (typeof value !== 'number') {
      value = 0;
    }
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      gap: "30px",
      marginBottom: "40px",
      flexWrap: "wrap"
    }}>
      <SummaryCard 
        title="Total de Receitas" 
        value={formatCurrency(summary.totalReceitas)} 
        colorClass="text-success" 
      />
      <SummaryCard 
        title="Total de Despesas" 
        value={formatCurrency(summary.totalDespesas)} 
        colorClass="text-danger" 
      />
      <SummaryCard 
        title="Saldo Atual" 
        value={formatCurrency(summary.saldo)} 
      />
    </div>
  );
};

export default Summary;