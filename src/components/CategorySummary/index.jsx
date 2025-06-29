import React, { useContext, useMemo } from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { TransactionsContext } from '../../context/TransactionsContext';

const CategorySummary = () => {
  const { transactions } = useContext(TransactionsContext);

  const categoryTotals = useMemo(() => {
    const receitas = {};
    const despesas = {};

    transactions.forEach(transaction => {
      const { tipo, categoria, valor } = transaction;
      const amount = parseFloat(valor);

      if (tipo === 'receita') {
        receitas[categoria] = (receitas[categoria] || 0) + amount;
      } else {
        despesas[categoria] = (despesas[categoria] || 0) + amount;
      }
    });

    return { receitas, despesas };
  }, [transactions]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  const getCategoryIcon = (categoria) => {
    const lowerCategoria = categoria?.toLowerCase();
    const icons = {
      // Receitas comuns
      'salario': '💼',
      'salário': '💼',
      'freelance': '💻',
      'investimentos': '📈',
      'bonus': '🎁',
      'bônus': '🎁',
      'renda extra': '💰',
      'trabalho': '💼',
      'emprego': '�',
      
      // Despesas comuns
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
      'contas': '📄',
      'luz': '💡',
      'agua': '💧',
      'água': '💧',
      'internet': '🌐',
      'telefone': '📱',
      'gasolina': '⛽',
      'combustivel': '⛽',
      'combustível': '⛽'
    };
    return icons[lowerCategoria] || '📊';
  };
  const getCategoryLabel = (categoria) => {
    // Simplesmente capitalizar a primeira letra de cada palavra
    return categoria
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const renderCategoryCards = (categories, type) => {
    const entries = Object.entries(categories);
    
    if (entries.length === 0) {
      return (
        <Col xs={12}>
          <Card className="text-center" style={{ minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card.Body>
              <p className="text-muted mb-0">Nenhuma transação encontrada</p>
            </Card.Body>
          </Card>
        </Col>
      );
    }

    return entries.map(([categoria, total]) => (
      <Col xs={12} sm={6} md={4} lg={3} key={categoria} className="mb-3">
        <Card className="h-100 shadow-sm" style={{ borderLeft: `4px solid ${type === 'receitas' ? '#28a745' : '#dc3545'}` }}>
          <Card.Body className="text-center">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
              {getCategoryIcon(categoria)}
            </div>
            <Card.Title style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              {getCategoryLabel(categoria)}
            </Card.Title>
            <Badge 
              bg={type === 'receitas' ? 'success' : 'danger'} 
              style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
            >
              {formatCurrency(total)}
            </Badge>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  return (    <div style={{ marginTop: '2rem' }}>
      <h3 style={{ 
        textAlign: 'center', 
        marginBottom: '1.5rem', 
        color: 'black',
        fontSize: '1.8rem'
      }}>
        📊 Classificação por Categoria
      </h3>
        {/* Receitas */}
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ 
          color: '#28a745', 
          marginBottom: '1rem', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          fontWeight: 'bold'
        }}>
          📈 Receitas por Categoria
        </h4>
        <Row>
          {renderCategoryCards(categoryTotals.receitas, 'receitas')}
        </Row>
      </div>      {/* Despesas */}
      <div>
        <h4 style={{ 
          color: '#dc3545', 
          marginBottom: '1rem', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          fontWeight: 'bold'
        }}>
          📉 Despesas por Categoria
        </h4>
        <Row>
          {renderCategoryCards(categoryTotals.despesas, 'despesas')}
        </Row>
      </div>
    </div>
  );
};

export default CategorySummary;
