import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { TransactionsContext } from '../context/TransactionsContext';
import Summary from '../components/Summary';
import TransactionModal from '../components/Summary/TransactionModal';
import FinancialCharts from '../components/FinancialCharts';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { loading, error, addTransaction } = useContext(TransactionsContext);

  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState('income');

  const handleOpenModal = (type) => {
    setModalType(type);
    setModalShow(true);
  };

  const handleCloseModal = () => setModalShow(false);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '5rem' }}><h2>Carregando...</h2></div>;
  }
  if (error) {
    return <div style={{ textAlign: 'center', padding: '5rem', color: 'red' }}><h2>Erro: {error}</h2></div>;
  }

  return (
    <div style={{ textAlign: "center", padding: "2rem", background: "linear-gradient(174deg,rgba(250, 254, 255, 1) 0%, rgba(232, 232, 232, 1) 100%)", height: '90%', maxWidth: '98%', borderRadius: '10px', margin: 'auto', marginTop: '20px' }}>
      <h2 style={{ marginBottom: "30px", textAlign: 'center' }}>Painel Financeiro</h2>
      <Summary />
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        <Button 
          onClick={() => handleOpenModal('income')}
          style={{
            background: 'linear-gradient(135deg, #28a745, #20c997)',
            border: 'none',
            borderRadius: '25px',
            padding: '12px 25px',
            fontSize: '1.1rem',
            fontWeight: '600',
            color: 'white',
            boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)',
            transition: 'all 0.3s ease',
            minWidth: '180px'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 6px 20px rgba(40, 167, 69, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0px)';
            e.target.style.boxShadow = '0 4px 15px rgba(40, 167, 69, 0.3)';
          }}
        >
          💰 Adicionar Receita
        </Button>

        <Button 
          onClick={() => handleOpenModal('expense')}
          style={{
            background: 'linear-gradient(135deg, #dc3545, #e74c3c)',
            border: 'none',
            borderRadius: '25px',
            padding: '12px 25px',
            fontSize: '1.1rem',
            fontWeight: '600',
            color: 'white',
            boxShadow: '0 4px 15px rgba(220, 53, 69, 0.3)',
            transition: 'all 0.3s ease',
            minWidth: '180px'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 6px 20px rgba(220, 53, 69, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0px)';
            e.target.style.boxShadow = '0 4px 15px rgba(220, 53, 69, 0.3)';
          }}
        >
          💸 Adicionar Despesa
        </Button>

        <Button 
          onClick={() => navigate('/transactions')}
          style={{
            background: 'linear-gradient(135deg, #007bff, #0056b3)',
            border: 'none',
            borderRadius: '25px',
            padding: '12px 25px',
            fontSize: '1.1rem',
            fontWeight: '600',
            color: 'white',
            boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)',
            transition: 'all 0.3s ease',
            minWidth: '180px'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 6px 20px rgba(0, 123, 255, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0px)';
            e.target.style.boxShadow = '0 4px 15px rgba(0, 123, 255, 0.3)';
          }}
        >
          📋 Ver Lançamentos
        </Button>
      </div>
      
      {/* Seção de Gráficos */}
      <FinancialCharts />
      
      <TransactionModal
        show={modalShow}
        handleClose={handleCloseModal}
        type={modalType}
        onAddTransaction={addTransaction}
      />
    </div>
  );
};

export default DashboardPage;