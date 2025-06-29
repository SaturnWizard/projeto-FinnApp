import React, { useContext } from 'react';
import { Container, Card, Table, Badge, Button } from 'react-bootstrap';
import { TransactionsContext } from '../context/TransactionsContext';
import { useNavigate } from 'react-router-dom';
import CategorySummary from '../components/CategorySummary';

const TransactionsPage = () => {
  const { transactions, loading, error } = useContext(TransactionsContext);
  const navigate = useNavigate();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryIcon = (categoria) => {
    const lowerCategoria = categoria?.toLowerCase();
    const icons = {
      // Receitas 
      'salario': '💼',
      'salário': '💼',
      'freelance': '💻',
      'investimentos': '📈',
      'bonus': '🎁',
      'bônus': '🎁',
      'renda extra': '💰',
      
      // Despesas 
      'saude': '🏥',
      'saúde': '🏥',
      'lazer': '🎯',
      'educacao': '📚',
      'educação': '📚',
      'alimentacao': '🍽️',
      'alimentação': '🍽️',
      'comida': '🍽️',
      'transporte': '🚗',
      'moradia': '🏠',
      'aluguel': '🏠',
      'vestuario': '👕',
      'vestuário': '👕',
      'roupa': '👕',
      'compras': '🛍️',
      'casa': '🏠',
      'conta': '📄',
      'contas': '📄'
    };
    return icons[lowerCategoria] || '📊';
  };

  if (loading) {
    return (
      <Container className="mt-4">
        <div style={{ textAlign: 'center', padding: '5rem' }}>
          <h2>Carregando...</h2>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <div style={{ textAlign: 'center', padding: '5rem', color: 'red' }}>
          <h2>Erro: {error}</h2>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-4" style={{ maxWidth: '1200px', textAlign: "center", padding: "2rem", background: "linear-gradient(174deg,rgba(250, 254, 255, 1) 0%, rgba(232, 232, 232, 1) 100%)", height: '30%', borderRadius: '10px', margin: 'auto', marginTop: '60px'  }}>
      <div className="d-flex justify-content-between align-items-center mb-4" style={{ justifyContent: 'center' }}>
        <h2
          style={{
            textAlign: 'center',
            color: 'black',
            margin: 0,
            fontSize: '2rem',
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          📋 Histórico de Lançamentos
        </h2>
      </div>

      <Card className="shadow-sm">
        <Card.Header className="bg-light">
          <h5 className="mb-0">Todas as Transações</h5>
        </Card.Header>
        <Card.Body style={{ padding: 0 }}>
          {transactions.length === 0 ? (
            <div className="text-center py-5">
              <h4 className="text-muted">Nenhuma transação encontrada</h4>
              <p className="text-muted">Adicione sua primeira transação no dashboard!</p>
              <Button
                variant="primary"
                onClick={() => navigate('/dashboard')}
              >
                Ir para Dashboard
              </Button>
            </div>
          ) : (
            <Table responsive hover className="mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ width: '120px' }}>Data</th>
                  <th style={{ width: '100px' }}>Tipo</th>
                  <th>Descrição</th>
                  <th style={{ width: '150px' }}>Categoria</th>
                  <th style={{ width: '120px', textAlign: 'right' }}>Valor</th>
                </tr>
              </thead>
              <tbody>
                {transactions
                  .sort((a, b) => new Date(b.data) - new Date(a.data))
                  .map((transaction, index) => (
                    <tr key={transaction.id || index}>
                      <td style={{ fontSize: '0.9rem' }}>
                        {formatDate(transaction.data)}
                      </td>
                      <td>
                        <Badge
                          bg={transaction.tipo === 'receita' ? 'success' : 'danger'}
                          style={{ fontSize: '0.8rem' }}
                        >
                          {transaction.tipo === 'receita' ? '📈 Receita' : '📉 Despesa'}
                        </Badge>
                      </td>
                      <td style={{ fontWeight: '500' }}>
                        {transaction.descricao}
                      </td>
                      <td>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '1.2rem' }}>
                            {getCategoryIcon(transaction.categoria)}
                          </span>
                          <span style={{
                            fontSize: '0.9rem',
                            textTransform: 'capitalize'
                          }}>
                            {transaction.categoria}
                          </span>
                        </span>
                      </td>
                      <td style={{
                        textAlign: 'right',
                        fontWeight: 'bold',
                        color: transaction.tipo === 'receita' ? '#28a745' : '#dc3545'
                      }}>
                        {transaction.tipo === 'receita' ? '+' : '-'} {formatCurrency(Math.abs(transaction.valor))}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {transactions.length > 0 && (
        <div className="mt-4">
          <Card className="shadow-sm">
            <Card.Body>
              <div className="row text-center">
                <div className="col-md-4">
                  <h5 className="text-primary">Total de Transações</h5>
                  <h3>{transactions.length}</h3>
                </div>
                <div className="col-md-4">
                  <h5 className="text-success">Total de Receitas</h5>
                  <h3>{transactions.filter(t => t.tipo === 'receita').length}</h3>
                </div>
                <div className="col-md-4">
                  <h5 className="text-danger">Total de Despesas</h5>
                  <h3>{transactions.filter(t => t.tipo === 'despesa').length}</h3>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}

      <div className="mt-4">
        <CategorySummary />
      </div>
    </Container>
  );
};

export default TransactionsPage;
