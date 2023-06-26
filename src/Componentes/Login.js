import React, { useState } from 'react';
import Logo from '../Assets/Logo.png';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost/trello-tech-login/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }) // Aquí se convierte el objeto JSON a una cadena
      });

    const data = await response.json();
    console.log(data.message)
    setMessage(data.message);

    if (data.success == true) {
        navigate('/Inicio');
    }

     } catch (error) {
      console.error(error);
    }

  };
  

    return (
        <div className='container-login'>
            <div className='grid-login'>
                <div className='lado1'>
                    <img src={Logo} className='logo1' alt='logo lista de tareas techmaniatic' />
                    <p className='titulo1'>To-do List</p>
                </div>
                <div className='lado2'>
                    <p className='titulo2'>Sistema de autenticacion</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            value={email}
                            className='form-control'
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Correo electrónico"
                        />
                        <input
                            type="password"
                            className='form-control'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                        />
                        <button type="submit" className='btn-iniciar-sesion'>Iniciar sesión</button>
                      
                    </form>
                    <p>{message}</p>
                </div>
            </div>
        </div>
    )
}

export default Login