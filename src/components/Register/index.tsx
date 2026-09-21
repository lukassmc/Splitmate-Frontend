import {useForm} from 'react-hook-form';



const Register = () => {

    const { register, handleSubmit, reset } = useForm();

    const passwordFlag = (data: any) => {return data.password === data.repeatPassword;}
    const validFlag = (data: any) => { return data.username.length > 2 && data.password.length > 2 && data.repeatPassword.length >> 2  && passwordFlag(data);}

    const handleClearClick = () => {reset();}    

    const  handleSubmitForm = async (data: any) => {

        if (validFlag(data) == false) {
          alert('Formulario inválido')
        }         
      const response = await fetch('http://localhost:8080/api/register', {
              method: 'POST',
              headers: {
                  'Content-Type' : 'application/json',
              },    
              body: JSON.stringify({
                  username: data.username, 
                  password: data.password
              })    
          })

          if (response.ok) {
              alert('Usuario registrado con éxito')
              
              const token = await response.text();
              if (token) {
                localStorage.setItem('JWTtoken', token);
          } 
          }
                  

    };

  return (
    <div>
      <h1>SplitMate</h1>

      <h2>Crear cuenta</h2>

      <form onSubmit= {handleSubmit(handleSubmitForm)}>
        <div>
          <label htmlFor="username">Usuario</label>
          <input
            {...register('username', {required: true, minLength: 3})}
            placeholder="Elegí un nombre de usuario"
            required
            />
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            {...register('password', {required: true, minLength: 3})}
            type="password"
            placeholder="********"
            required
            />
        </div>

        <div>
          <label htmlFor="repeatPassword">
            Confirmar contraseña
          </label>
          <input
            {...register('repeatPassword', {required: true, minLength: 3})}
            type="password"
            placeholder="********"
            required
          />
        </div>

        <button type="submit">
          Registrarme
        </button>
        <button onClick = {handleClearClick}>
            Limpiar
        </button>
      </form>

      <p>
        ¿Ya tenés una cuenta? <a href="#">Iniciá sesión</a>
      </p>
    </div>
  );
};


export default Register;