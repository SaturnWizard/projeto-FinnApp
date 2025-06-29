import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { TransactionsContext } from '../context/TransactionsContext';
import Summary from '../components/Summary';
import TransactionModal from '../components/Summary/TransactionModal';

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
<div style={{ textAlign: "center", padding: "2rem", background: "linear-gradient(174deg,rgba(250, 254, 255, 1) 0%, rgba(232, 232, 232, 1) 100%)", height: '90%', maxWidth: '98%', borderRadius: '10px', margin: 'auto', marginTop: '20px' }}>      <h2 style={{ marginBottom: "30px", textAlign: 'center' }}>Painel Financeiro</h2>
      <Summary />      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Button variant="success" onMouseEnter={(e) => { e.target.style.backgroundColor = '#bbcae8'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }} style={{border:'none',backgroundColor: 'transparent', color:"black", marginTop: "10px" }}  onClick={() => handleOpenModal('income')}>
          Adicionar Receita
        </Button>
        <Button variant="danger" onMouseEnter={(e) => { e.target.style.backgroundColor = '#f7a7a7'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }} style={{border:'none',backgroundColor: 'transparent', color:"black", marginTop: "10px" }} onClick={() => handleOpenModal('expense')}>
          Adicionar Despesa
        </Button><br/>
        <Button onMouseEnter={(e) => { e.target.style.backgroundColor = '#bbe8db'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }} style={{border:'none',backgroundColor: 'transparent', color:"black", marginTop: "10px" }} onClick={() => navigate('/transactions')}>
          📋 Ver Lançamentos
        </Button>
      </div>      <TransactionModal 
        show={modalShow}
        handleClose={handleCloseModal}
        type={modalType}
        onAddTransaction={addTransaction}
      />
    </div>
  );
};

export default DashboardPage;