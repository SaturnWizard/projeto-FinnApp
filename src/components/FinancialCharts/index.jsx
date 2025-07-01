import React, { useContext } from 'react';
import { TransactionsContext } from '../../context/TransactionsContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const FinancialCharts = () => {
  const { transactions, summary } = useContext(TransactionsContext);

  // Dados para gráfico de pizza (receitas vs despesas)
  const pieData = {
    labels: ['Receitas', 'Despesas'],
    datasets: [
      {
        data: [summary.totalReceitas, summary.totalDespesas],
        backgroundColor: [
          '#28a745',
          '#dc3545',
        ],
        borderColor: [
          '#1e7e34',
          '#c82333',
        ],
        borderWidth: 2,
      },
    ],
  };

  // Processar dados por categoria para estatísticas
  const categoryData = transactions.reduce((acc, transaction) => {
    const category = transaction.categoria || 'Outros';
    if (!acc[category]) {
      acc[category] = { receitas: 0, despesas: 0 };
    }
    
    if (transaction.tipo === 'receita') {
      acc[category].receitas += parseFloat(transaction.valor);
    } else {
      acc[category].despesas += parseFloat(transaction.valor);
    }
    
    return acc;
  }, {});

  const categories = Object.keys(categoryData);

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribuição Financeira',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: R$ ${value.toLocaleString('pt-BR')} (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <div style={{ marginTop: '3rem' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2c3e50' }}>
        Análises Financeiras
      </h3>
      
      {/* Container principal com dois painéis lado a lado */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '30px',
        marginBottom: '30px'
      }}>
        {/* Gráfico de Pizza - Aumentado */}
        <div style={{
          backgroundColor: 'white',
          padding: '35px',
          borderRadius: '15px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          border: '1px solid #e9ecef',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{ height: '400px', width: '100%' }}>
            <Doughnut data={pieData} options={pieOptions} />
          </div>
        </div>

        {/* Insights e Análise Financeira - Ajustado */}
        <div style={{
          backgroundColor: 'white',
          padding: '35px',
          borderRadius: '15px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          border: '1px solid #e9ecef',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h4 style={{ textAlign: 'center', marginBottom: '35px', color: '#2c3e50', fontSize: '1.8rem' }}>
            Insights Financeiros
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            {/* Status Financeiro */}
            <div style={{
              padding: '20px 25px',
              backgroundColor: summary.saldo >= 0 ? '#d4edda' : '#f8d7da',
              borderRadius: '12px',
              border: `3px solid ${summary.saldo >= 0 ? '#c3e6cb' : '#f5c6cb'}`,
              textAlign: 'center'
            }}>
              <h5 style={{ 
                color: summary.saldo >= 0 ? '#155724' : '#721c24', 
                marginBottom: '10px',
                fontSize: '1.3rem' 
              }}>
                {summary.saldo >= 0 ? 'Situação Financeira Positiva!' : 'Atenção às Finanças!'}
              </h5>
              <p style={{ 
                color: summary.saldo >= 0 ? '#155724' : '#721c24',
                fontSize: '1.1rem',
                margin: 0
              }}>
                {summary.saldo >= 0 
                  ? 'Parabéns! Suas receitas estão superando as despesas.'
                  : 'Suas despesas estão maiores que as receitas. Considere revisar seus gastos.'
                }
              </p>
            </div>

            {/* Análise de Gastos */}
            <div style={{
              padding: '20px 25px',
              backgroundColor: '#e7f3ff',
              borderRadius: '12px',
              border: '2px solid #007bff'
            }}>
              <h6 style={{ color: '#007bff', marginBottom: '15px', fontSize: '1.2rem' }}>
                Categoria que Mais Gasta
              </h6>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.1rem', color: '#495057' }}>
                  {categories.length > 0 ? 
                    categories.reduce((max, cat) => 
                      categoryData[cat].despesas > categoryData[max].despesas ? cat : max
                    ) : 'Nenhuma categoria'
                  }
                </span>
                <span style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 'bold', 
                  color: '#dc3545' 
                }}>
                  {categories.length > 0 ? 
                    `R$ ${Math.max(...categories.map(cat => categoryData[cat].despesas)).toLocaleString('pt-BR')}` 
                    : 'R$ 0,00'
                  }
                </span>
              </div>
            </div>

            {/* Dicas Personalizadas */}
            <div style={{
              padding: '20px 25px',
              backgroundColor: '#fff3cd',
              borderRadius: '12px',
              border: '2px solid #ffc107'
            }}>
              <h6 style={{ color: '#856404', marginBottom: '15px', fontSize: '1.2rem' }}>
                Dica Personalizada
              </h6>
              <p style={{ color: '#856404', fontSize: '1rem', margin: 0, lineHeight: '1.5' }}>
                {summary.saldo < 0 
                  ? "Considere reduzir gastos na categoria que mais consome seu orçamento. Pequenas economias diárias fazem grande diferença!"
                  : summary.totalReceitas > 0 && (summary.saldo / summary.totalReceitas) > 0.2
                  ? "Excelente! Você está poupando mais de 20% da sua renda. Considere investir essa economia!"
                  : "Tente poupar pelo menos 10% das suas receitas mensais para criar uma reserva de emergência."
                }
              </p>
            </div>

            {/* Resumo Rápido */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '15px'
            }}>
              <div style={{
                textAlign: 'center',
                padding: '15px',
                backgroundColor: '#e8f5e8',
                borderRadius: '10px',
                border: '2px solid #28a745'
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>📈</div>
                <div style={{ fontSize: '0.9rem', color: '#28a745', fontWeight: 'bold' }}>
                  {transactions.filter(t => t.tipo === 'receita').length} Receitas
                </div>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '15px',
                backgroundColor: '#f8d7da',
                borderRadius: '10px',
                border: '2px solid #dc3545'
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>📉</div>
                <div style={{ fontSize: '0.9rem', color: '#dc3545', fontWeight: 'bold' }}>
                  {transactions.filter(t => t.tipo === 'despesa').length} Despesas
                </div>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '15px',
                backgroundColor: '#d1ecf1',
                borderRadius: '10px',
                border: '2px solid #17a2b8'
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>📊</div>
                <div style={{ fontSize: '0.9rem', color: '#17a2b8', fontWeight: 'bold' }}>
                  {categories.length} Categorias
                </div>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '15px',
                backgroundColor: '#e2e3e5',
                borderRadius: '10px',
                border: '2px solid #6c757d'
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>💰</div>
                <div style={{ fontSize: '0.9rem', color: '#6c757d', fontWeight: 'bold' }}>
                  R$ {transactions.length > 0 ? 
                    (transactions.reduce((sum, t) => sum + Math.abs(parseFloat(t.valor)), 0) / transactions.length).toLocaleString('pt-BR', {maximumFractionDigits: 0}) 
                    : '0'
                  } Média
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialCharts;
