import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';

import AlertaContext from '../../context/alerta/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = (props) => {
    
    //nos traemos el context para poder usar el state y las funciones
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta} = alertaContext;

    //nos traemos el context para poder usar el state y las funciones
    const authContext = useContext(AuthContext);
    const { autenticado, mensaje, iniciarSesion } = authContext;
    
    // si el usuario o el password no existen...
    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');
        }

        if (mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
             
        }
       

    }, [mensaje,autenticado, props.history]);

    //state para iniciar sesion
    const [usuario, guardarUsuario] = useState({
        email : '',
        password : ''
    });
    const { email, password } = usuario;


    const onChange = e => (
        guardarUsuario ({
        ...usuario,
        [e.target.name] : e.target.value })
    );


    const onSubmit = e => {
        e.preventDefault();

        //validar los campos
        if( email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Ambos campos son obligatorios', 'alerta-error');
            return;
        }

        
        //pasarlo al action
        iniciarSesion({email, password});
    }

    return(
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar sesión</h1>
                <form
                   onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={usuario.email}
                            placeholder="Tu email"
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={usuario.password}
                            placeholder="Tu password"
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input
                           type="submit"
                           className="btn btn-block btn-primario"
                           value="Iniciar Sesión"
                        />
                    </div>
                </form>

                <Link to={"/nueva-cuenta"} className="enlace-cuenta">Obtener cuenta</Link>
            </div>
        </div>
    );
}
export default Login;