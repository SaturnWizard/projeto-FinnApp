import { BrowserRouter, useNavigate } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import Button from "react-bootstrap/Button";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Logo from './assets/logo.png';
import Background from './assets/background.jpg';
import { RiHome2Fill } from "react-icons/ri";
import { TbLockPassword } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import React from 'react';
import Chat from './Chat';



function AppContent() {
  const [show, setShow] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      setShow(false);
    }
  }, [isAuthenticated]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };
  const handlePasswordRecovery = () => {
    navigate("/password");
  };

  const handleTransactions = () => {
    navigate("/transactions");
  };
  
  return (

    <div style={{minHeight: '100vh', backgroundImage: `url(${Background})`, backgroundSize: 'cover', position: 'relative'}}>
      <header style={{
        padding: "0.01rem", color: 'white', background: 'linear-gradient(174deg,rgba(250, 254, 255, 1) 0%, rgba(232, 232, 232, 1) 100%)',
        display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: "5px"
      }}>
        <h1 style={{fontFamily:"serif", margin: 5 }}><img style={{ height: '60px'}} src={Logo} alt="FinAdm Logo" /></h1>
        {isAuthenticated && (
          <>
            <Button onClick={handleShow} onMouseEnter={(e) => { e.target.style.backgroundColor = '#e3e3e3'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }} style={{color:'black', border:'none', backgroundColor: 'transparent', marginRight: "10px" }}>
              Opções
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement="end" style={{ backgroundColor: '#f0f0f0', border:'none', borderRadius: '10px', color: 'black', padding: '2px', width: '250px' }}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Opções</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body >
                <Button onMouseEnter={(e) => { e.target.style.backgroundColor = '#e3e3e3'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }} onClick={() => { handleDashboard(); handleClose(); }}style={{border:'none',backgroundColor: 'transparent', color:"black", marginTop: "10px" }}>
                  <RiHome2Fill /> Tela Inicial
                </Button><br />
                <Button onMouseEnter={(e) => { e.target.style.backgroundColor = '#e3e3e3'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }} onClick={() => { handlePasswordRecovery(); handleClose(); }} style={{border:'none',backgroundColor: 'transparent', color:"black", marginTop: "10px" }}>
                  <TbLockPassword /> Recuperar Senha
                </Button><br />
                <Button onMouseEnter={(e) => { e.target.style.backgroundColor = '#e3e3e3'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }} onClick={() => { handleTransactions(); handleClose(); }} style={{border:'none',backgroundColor: 'transparent', color:"black", marginTop: "10px" }}>
                  <GrTransaction /> Lançamentos
                </Button><br/>
                <Button onMouseEnter={(e) => { e.target.style.backgroundColor = '#f7a7a7'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }} onClick={handleLogout} style={{border:'none', backgroundColor: 'transparent', color:"black", marginTop: "10px" }}>
                  <MdLogout /> Sair
                </Button>
              </Offcanvas.Body>
            </Offcanvas>
          </>
        )}
      </header>
      <main>
        <AppRoutes />
      </main>
      
      {isAuthenticated && <Chat />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;