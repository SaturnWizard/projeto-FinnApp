# 💰 Sistema de Controle Financeiro Pessoal

Este é um sistema de controle financeiro pessoal desenvolvido em React, utilizando Bootstrap para estilização e JSON Server para simulação de backend. O objetivo é permitir que usuários façam login, cadastro e controlem suas receitas e despesas.

---

## 🚀 Funcionalidades

- Autenticação de usuários (login e cadastro)
- Navegação entre páginas usando React Router
- Layout responsivo com Bootstrap
- Estilização inline (sem uso de arquivos CSS)
- Simulação de backend com JSON Server (porta 3001)
- Componentes reutilizáveis com React e React Bootstrap

---

## 🧰 Tecnologias Utilizadas

- React 18+
- React Router DOM
- React Bootstrap
- Bootstrap 5
- JSON Server
- Vite
- JavaScript (ES6+)
- Express
- Google Generative AI (Gemini)
- dotenv
- CORS

---

## ⚙️ Instalação e Execução

### 🔽 1. Instalar as dependências principais do projeto

```bash
npm install
npm install react-icons --save


2. Instalar e executar o JSON Server (simulando backend)
npm install -g json-server
json-server --watch db.json --port 3001

🤖 3. Configurar e rodar o servidor Gemini
cd meu-servidor-gemini
npm init -y
npm install express @google/generative-ai dotenv cors
node server.cjs


💻 4. Executar a aplicação React (front-end)
npm run dev


👥 Autores
Santiago Rodrigues
Pedro Abrantes

📂 Estrutura do Projeto
src/pages/: Telas do sistema (Login, Registro, Dashboard, etc.)

src/context/: Gerenciamento de estado global (ex: autenticação)

src/routes/: Definição das rotas públicas e privadas

db.json: Arquivo de dados simulado pelo JSON Server

meu-servidor-gemini/: Backend auxiliar que se comunica com a API Gemini

✅ Requisitos para Rodar
Node.js 18+

Navegador moderno (Chrome, Firefox, Edge)

Terminal com suporte a comandos npm

📌 Observações
O sistema utiliza uma autenticação simples baseada em token falso salvo no localStorage.

O controle de sessão e rotas privadas é feito com Context API e componentes protegidos (PrivateRoute).

Recomenda-se manter o JSON Server e o servidor Gemini rodando em paralelo com o front-end.

