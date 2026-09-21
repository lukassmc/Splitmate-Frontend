import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [Username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate= useNavigate();

    let isUsernameValid = Username.length >= 3;
    let isPasswordValid = password.length >= 3;

    let validFlag = isUsernameValid && isPasswordValid;
    
    const  handleSubmit= async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validFlag) {

            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    username: Username, 
                    password: password
                })
                
            })

            if (response.ok){alert('Usuario registrado con éxito')
              
              const token = await response.text();
              if (token) {
                localStorage.setItem('JWTtoken', token);}
                navigate('/dashboard');
              } 


            
            } else {
            alert('Formulario inválido');
        }
    };
            

    return (  
        <div>
      <h1>SplitMate</h1>

      <h2>Iniciar sesión</h2>

      <form onSubmit= {handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="username"
            placeholder="Username"
            
            value = {Username}
            onChange = {(e) => setUsername(e.target.value)}
          />
    
        </div>
        {Username.length < 3 ? <p>El Username debe tener al menos 3 caracteres</p> : <p>El Username es válido</p>}   

        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="********"
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
          />
        </div>
        {password.length < 3 ? <p>La password debe tener al menos 3 caracteres</p> : <p>La password es válido</p>}   

        <button type="submit">
          Iniciar sesión
        </button>
        {validFlag ? <p>Formulario válido</p> : <p>Formulario inválido</p>}
      </form>

      <p>
        ¿No tenés una cuenta? <a href="#">Registrate</a>
      </p>
    </div>
    )
};

export default Login;