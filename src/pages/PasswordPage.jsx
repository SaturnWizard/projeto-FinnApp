import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PasswordPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", newPassword: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/users?email=${form.email}`);
      const users = await response.json();

      if (users.length === 0) {
        alert("E-mail não encontrado.");
        return;
      }

      const user = users[0];

      const updateResponse = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: form.newPassword }),
      });

      if (updateResponse.ok) {
        alert("Senha atualizada com sucesso!");
        navigate("/dashboard");
      } else {
        alert("Erro ao atualizar a senha.");
      }

    } catch (error) {
      console.error("Erro ao resetar senha:", error);
      alert("Erro de conexão com o servidor.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem", background: "linear-gradient(174deg,rgba(250, 254, 255, 1) 0%, rgba(232, 232, 232, 1) 100%)", height: '30%', maxWidth: '30%', borderRadius: '10px', margin: 'auto', marginTop: '60px' }}>
      <h2>Alterar sua senha</h2>
      <p>Digite o e-mail cadastrado e a nova senha</p>
      <form onSubmit={handlePasswordReset}>
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
            name="newPassword"
            placeholder="Nova Senha"
            value={form.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ paddingTop: "10px" }}>
          <Button onClick={() => navigate("/dashboard")} onMouseEnter={(e) => { e.target.style.backgroundColor = '#e3e3e3'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }} style={{color:'black', border:'none', backgroundColor: 'transparent', marginTop: "10px" }}>
            Voltar para o Dashboard
          </Button>
          <Button type="submit" onMouseEnter={(e) => { e.target.style.backgroundColor = '#bbcae8'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }} style={{color:'black', border:'none', backgroundColor: 'transparent', marginTop: "10px" }}>
            Alterar Senha
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PasswordPage;
