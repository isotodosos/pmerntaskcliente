import React, { useReducer } from 'react';

import authContext from '../autenticacion/authContext';
import authReducer from '../autenticacion/authReducer';


import axios from 'axios';
import tokenAuth from '../../config/token';


import { REGISTRO_EXITOSO, 
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION} from '../../types';


const AuthState = (props) => {

    const initialState = {
        token : localStorage.getItem('token'),
        autenticado : null,
        usuario : null,
        mensaje : null,
        cargando : true
    }

    const [state, dispatch] = useReducer (authReducer, initialState);

    // Funciones

    
    //registrar un usuario
    const registrarUsuario = async datos => {
        try {
            //console.log(datos);
            
            const respuesta = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/usuarios`, datos);
            console.log(respuesta.data);

            dispatch({
                type : REGISTRO_EXITOSO,
                payload : respuesta.data
            })

            //obtener el usuario
            usuarioAutenticado();


        } catch (error) {  // se va por aki pq al existir tiene status 400

            console.log(error.response.data.msg);
            const alerta = {
                msg : error.response.data.msg,
                categoria : 'alerta-error'
            }
            dispatch({
                type : REGISTRO_ERROR,
                payload : alerta
            })

        }
    }


    // autenticar un usuario
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if(token){
            // funcion para enviar el token por headers
            
            tokenAuth(token);
        }

        try {
            const respuesta = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth`);
            //console.log(respuesta.data.usuario);

            dispatch({
                type : OBTENER_USUARIO,
                payload : respuesta.data.usuario
            })
            
        } catch (error) {
            //console.log(error);
            dispatch({
                type : LOGIN_ERROR
            })
        }
    }


    // cuando el usuario inicia sesion
    const iniciarSesion = async datos => {

        try {

            const respuesta = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth`, datos);
            //console.log(respuesta);

            dispatch({
                type : LOGIN_EXITOSO,
                payload : respuesta.data
            })

            //obtener el usuario
            usuarioAutenticado();
            
        } catch (error) {

            console.log(error.response.data.msg);
            const alerta = {
                msg : error.response.data.msg,
                categoria : 'alerta-error'
            }
            dispatch({
                type : LOGIN_ERROR,
                payload : alerta
            })

            
        }
    }


    // cerrar sesion
    const cerrarSesion = () => {

        dispatch({
            type : CERRAR_SESION
        })
    }




    return(
        <authContext.Provider  //importante Provider con mayuscula
            value = {{
                token : state.token,
                autenticado : state.autenticado,
                usuario : state.usuario,
                mensaje : state.mensaje,
                cargando : state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </authContext.Provider>
    )

}

export default AuthState;