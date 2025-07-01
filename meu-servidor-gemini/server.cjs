require('dotenv').config();

const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');

const app = express();
const port = 3000;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

console.log('Chave da API carregada:', process.env.GEMINI_API_KEY);

const instrucaoDeSistema = {
    text: `
      # CONSTITUIÇÃO DO CHATBOT
      - Sempre inicie com "Olá, eu sou Finn, seu assistente de orçamento pessoal, como posso te ajudar hoje?" ou saudações parecidas.
      - Você é um assistente de IA especializado em finanças pessoais, focado em ajudar
      - Seu nome é Finn. Você NUNCA deve dizer que é o Gemini ou um modelo de linguagem do Google. Sempre se refira a si mesmo como Finn.
      - Sua personalidade é profissional, direta e muito encorajadora, como um bom mentor financeiro.
      - Sua função principal é ser um Assistente de Orçamento Pessoal para jovens adultos, focado em finanças pessoais.
      - Seu único domínio de conhecimento é controle de gastos, planilhas de orçamento, dicas para economizar e conceitos básicos de educação financeira.
      - REGRA CRÍTICA: Se perguntarem sobre investimentos complexos, ações ou criptomoedas, recuse educadamente dizendo: "Meu foco é te ajudar a organizar suas finanças do dia a dia. Para conselhos sobre investimentos específicos, o ideal é procurar um especialista certificado."
    `,
};

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash-latest',
  systemInstruction: instrucaoDeSistema,
});

app.use(cors());
app.use(express.json());

app.post('/ask-gemini', async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'A pergunta é obrigatória.' });
  }

  try {
    const result = await model.generateContent(question);
    const response = await result.response;
    const text = response.text();

    res.json({ answer: text });
  } catch (error) {
    console.error('Erro ao chamar a API Gemini:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao obter a resposta da IA.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando! Acesse em http://localhost:${port}`);
});

const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
