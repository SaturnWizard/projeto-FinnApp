import React, { useState } from 'react';
import './Chat.css'; 
import { BsRobot, BsX, BsChatDotsFill } from "react-icons/bs"; 

function Chat() {
  const [isOpen, setIsOpen] = useState(false); 
  
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      author: 'gemini',
      text: 'Olá! Como posso te ajudar hoje?',
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = { author: 'user', text: message };
    setChatHistory(prev => [...prev, userMessage]);
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/ask-gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: message }),
      });

      if (!response.ok) throw new Error('A resposta da rede não foi OK');

      const data = await response.json();
      const geminiMessage = { author: 'gemini', text: data.answer };
      setChatHistory(prev => [...prev, geminiMessage]);

    } catch (error) {
      console.error('Erro ao buscar resposta:', error);
      const errorMessage = { author: 'gemini', text: 'Desculpe, não consegui obter uma resposta.' };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="chat-bubble" onClick={toggleChat}>
        <BsChatDotsFill size={28} />
      </div>
    );
  }

  return (
    <div className="chat-widget">
      <div className="chat-header">
        <h3>
          <BsRobot style={{ marginRight: '8px' }} />
          Assistente FinAdm
        </h3>
        <button onClick={toggleChat} className="close-btn"><BsX size={24} /></button>
      </div>
      <div className="chat-history">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.author}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        {isLoading && (
          <div className="chat-message gemini">
            <p className="loading-dots"><span>.</span><span>.</span><span>.</span></p>
          </div>
        )}
      </div>
      <form className="chat-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>Enviar</button>
      </form>
    </div>
  );
}

export default Chat;