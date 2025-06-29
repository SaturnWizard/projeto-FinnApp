import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({nome:"", email: "", password: "", saldo: 0, totalReceitas: 0, totalDespesas: 0 });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        setForm({ email: "", password: "", saldo: 0, totalReceitas: 0, totalDespesas: 0, nome:"" });
        navigate("/");
      } else {
        const errorData = await response.json();
        alert(`Erro ao cadastrar: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Falha ao registrar:", error);
      alert("Não foi possível conectar ao servidor. Verifique se o servidor está rodando na porta 3001 e tente novamente.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem", background: "linear-gradient(174deg,rgba(250, 254, 255, 1) 0%, rgba(232, 232, 232, 1) 100%)", height: '30%', maxWidth: '30%', borderRadius: '10px', margin: 'auto', marginTop: '60px' }}>
      <h2>Criar uma conta</h2>
      <p>Insira seus dados para começarmos</p>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: "10px" }}>
          <input
            style={{ borderRadius: "71px", borderWidth: "1px", height: "35px", padding: "0 10px" }}
            type="text"
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            style={{ borderRadius: "71px", borderWidth: "1px", height: "35px", padding: "0 10px" }}
            type="email"
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <input
            style={{ borderRadius: "71px", borderWidth: "1px", height: "35px", padding: "0 10px" }}
            type="password"
            name="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ paddingTop: "10px" }}>
          <Button onClick={() => navigate("/")} onMouseEnter={(e) => { e.target.style.backgroundColor = '#e3e3e3'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }} style={{color:'black', border:'none', backgroundColor: 'transparent', marginTop: "10px" }}>
            Voltar ao Login
          </Button>
          <Button type="submit" onMouseEnter={(e) => { e.target.style.backgroundColor = '#bbcae8'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }} style={{color:'black', border:'none', backgroundColor: 'transparent', marginTop: "10px" }}>
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;