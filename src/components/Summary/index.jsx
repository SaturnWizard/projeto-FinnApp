import React, { useContext } from 'react';
import { TransactionsContext } from '../../context/TransactionsContext';

const SummaryCard = ({ title, value, colorClass }) => (
  <div style={{
    border: "2px solid #ccc",
    borderRadius: "15px",
    padding: "35px 25px",
    minWidth: "280px",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
    transition: "transform 0.2s ease",
    cursor: "pointer"
  }}
  onMouseEnter={(e) => e.target.style.transform = "translateY(-3px)"}
  onMouseLeave={(e) => e.target.style.transform = "translateY(0px)"}
  >
    <h4 style={{ 
      marginBottom: "20px", 
      fontSize: "1.4rem", 
      fontWeight: "600",
      color: "#2c3e50"
    }}>
      {title}
    </h4>
    <p style={{ 
      fontSize: '2.2rem', 
      fontWeight: 'bold', 
      margin: 0,
      letterSpacing: "1px"
    }} className={colorClass}>
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
      gap: "40px",
      marginBottom: "50px",
      flexWrap: "wrap",
      padding: "20px 0"
    }}>
      <SummaryCard 
        title="💰 Total de Receitas" 
        value={formatCurrency(summary.totalReceitas)} 
        colorClass="text-success" 
      />
      <SummaryCard 
        title="💸 Total de Despesas" 
        value={formatCurrency(summary.totalDespesas)} 
        colorClass="text-danger" 
      />
      <SummaryCard 
        title="💎 Saldo Atual" 
        value={formatCurrency(summary.saldo)} 
        colorClass={summary.saldo >= 0 ? "text-primary" : "text-danger"}
      />
    </div>
  );
};

export default Summary;