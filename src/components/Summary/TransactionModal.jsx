import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const TransactionModal = ({ show, handleClose, type, onAddTransaction }) => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');

  useEffect(() => {
    if (!show) {
      setDescricao('');
      setValor('');
      setCategoria('');
    }
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!descricao || !valor || valor <= 0 || !categoria) {
      alert('Por favor, preencha todos os campos com valores válidos.');
      return;
    }

    onAddTransaction({
      tipo: type === 'income' ? 'receita' : 'despesa',
      descricao,
      valor,
      categoria,
    });

    handleClose();
  };

  const title = type === 'income' ? 'Adicionar Receita' : 'Adicionar Despesa';

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex: Salário, Aluguel"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAmount">
            <Form.Label>Valor</Form.Label>
            <Form.Control
              type="number"
              placeholder="0.00"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
              min="0.01"
              step="0.01"
            />
          </Form.Group>          <Form.Group className="mb-3" controlId="formCategory">
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              type="text"
              placeholder={type === 'income' ? 'Ex: Salário, Freelance, Investimentos...' : 'Ex: Alimentação, Transporte, Lazer...'}
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            />
            <Form.Text className="text-muted">
              Digite a categoria que melhor descreve esta transação
            </Form.Text>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button onMouseEnter={(e) => { e.target.style.backgroundColor = '#f7a7a7'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }} style={{border:'none',backgroundColor: 'transparent', color:"black", marginTop: "10px" }}  onClick={handleClose} className="me-2">
              Cancelar
            </Button>
            <Button onMouseEnter={(e) => { e.target.style.backgroundColor = '#bbcae8'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }} style={{border:'none',backgroundColor: 'transparent', color:"black", marginTop: "10px" }} type="submit">
              Salvar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TransactionModal;