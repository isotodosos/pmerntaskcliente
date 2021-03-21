import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';

import AlertaContext from '../../context/alerta/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';



const NuevaCuenta = (props) => {

   //nos traemos el context para poder usar el state y las funciones
   const alertaContext = useContext(AlertaContext);
   const { alerta, mostrarAlerta} = alertaContext;

   //nos traemos el context para poder usar el state y las funciones
   const authContext = useContext(AuthContext);
   const { autenticado, mensaje, registrarUsuario } = authContext;

   // si un usuario ya esta registrado anteriormente....
    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');
        }

        if (mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mensaje,autenticado, props.history]);


    //state para iniciar sesion
    const [usuario, guardarUsuario] = useState({
        nombre : '',
        email : '',
        password : '',
        confirmar : ''
    });
    const {nombre, email, password, confirmar} = usuario;

    const onChange = e => (
        guardarUsuario ({
        ...usuario,
        [e.target.name] : e.target.value })
    );


    const onSubmit = e => {
        e.preventDefault();

        //validar los campos
        if( nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        //password mínimo de 6 caracteres
        if( password.length < 6){
            mostrarAlerta('El password debe de tener al menos 6 caracteres', 'alerta-error');
            return;
        }

        //password y confirmar password son iguales
        if( password !== confirmar){
            mostrarAlerta('Los password no son iguales', 'alerta-error');
            return;
        }

        //pasarlo al action

        registrarUsuario({
            nombre,
            email,
            password
        })
    }

    return(
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una cuenta</h1>
                <form
                   onSubmit={onSubmit}
                >

                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={usuario.nombre}
                            placeholder="Tu nombre"
                            onChange={onChange}
                        />
                    </div>
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
                        <label htmlFor="confirmar">Confirmar password</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            value={usuario.confirmar}
                            placeholder="Repite tu password"
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input
                           type="submit"
                           className="btn btn-block btn-primario"
                           value="Registrarme"
                        />
                    </div>
                </form>

                <Link to={"/"} className="enlace-cuenta">Volver a Iniciar sesión</Link> 
            </div>
        </div>
    );
}
export default NuevaCuenta;