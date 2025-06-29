import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

const LoginPage = () => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setShow(false); 

    try {
      const response = await fetch(`http://localhost:3001/users?email=${form.email}&password=${form.password}`);
      const users = await response.json();

      if (users.length > 0) {
        const user = users[0];
        
        login('fake-jwt-token'); 
        
        localStorage.setItem('userId', user.id); 
        
        navigate('/dashboard');
      } else {
        setShow(true);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem", background: "linear-gradient(174deg,rgba(250, 254, 255, 1) 0%, rgba(232, 232, 232, 1) 100%)", height: '30%', maxWidth: '30%', borderRadius: '10px', margin: 'auto', marginTop: '60px' }}>
      <h2>Bem vindo!</h2>
      <p>Digite suas credenciais para começarmos</p>
      <form onSubmit={handleLogin}>
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
        <div >
          <Button href='/register' onMouseEnter={(e) => { e.target.style.backgroundColor = '#e3e3e3'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }} style={{color:'black', border:'none', backgroundColor: 'transparent'}}>
            Cadastre-se aqui
          </Button><br />
          <Button ref={target} type='submit' onMouseEnter={(e) => { e.target.style.backgroundColor = '#bbcae8'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }} style={{color:'black', border:'none', backgroundColor: 'transparent', marginTop: "10px" }}>
            Entrar
          </Button>
        </div>
      </form>
      <Overlay target={target.current} show={show} placement="bottom">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            E-mail ou senha inválidos.
          </Tooltip>
        )}
      </Overlay>
    </div>
  );
};

export default LoginPage;