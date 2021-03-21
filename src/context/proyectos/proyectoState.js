import React, { useReducer } from 'react';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';

import {FORMULARIO_PROYECTO, 
        OBTENER_PROYECTOS,
        AGREGAR_PROYECTOS,
        PROYECTO_ERROR,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO} from '../../types';

import axios from 'axios';        




const ProyectoState = props => {

    
    const initialState = {
        proyectos : [],
        formulario : false,
        errorformulario : false,
        proyecto: null,
        mensaje : null
    }


    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);//primero le pasamos un reducer y despues un state inicial

    // Serie de funciones para el CRUD

    const mostrarFormulario = () => {
        dispatch({
            type : FORMULARIO_PROYECTO
        })
    }

    const obtenerProyectos = async () => {

        try {

            const resultado = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/proyectos`);
            

            dispatch({
                type : OBTENER_PROYECTOS,
                payload : resultado.data.proyectos
            })
            
        } catch (error) {
            
            const alerta = {
                msg : 'Hubo un error',
                categoria : 'alerta-error'
            }

            dispatch({
                type : PROYECTO_ERROR,
                payload : alerta
            })
        }
        
    }

    const agregarProyectos = async proyecto => {
        
        try {

            const resultado = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/proyectos`, proyecto);
            //console.log(resultado.data);

            dispatch({
                type: AGREGAR_PROYECTOS,
                payload : resultado.data
            })
            
        } catch (error) {
            
            const alerta = {
                msg : 'Hubo un error',
                categoria : 'alerta-error'
            }

            dispatch({
                type : PROYECTO_ERROR,
                payload : alerta
            })
        }
        
    }

    const mostrarError = () => {
        dispatch({
            type : VALIDAR_FORMULARIO
        })
    }

    const proyectoActual = idProyecto => {
        dispatch({
            type : PROYECTO_ACTUAL,
            payload : idProyecto
        })
    }

    const eliminarProyecto = async idProyecto => {

        try {
            //console.log(idProyecto);
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/proyectos/${idProyecto}`);

            dispatch({
                type : ELIMINAR_PROYECTO,
                payload : idProyecto
            })

        } catch (error) {
            
            const alerta = {
                msg : 'Hubo un error',
                categoria : 'alerta-error'
            }

            dispatch({
                type : PROYECTO_ERROR,
                payload : alerta
            })
        }
        
    }

    

    return(
        <proyectoContext.Provider
            value = {{
                proyectos : state.proyectos,
                formulario : state.formulario,
                errorformulario: state.errorformulario,
                proyecto : state.proyecto,
                mensaje : state.mensaje,
                mostrarFormulario,
                mostrarError,
                obtenerProyectos,
                agregarProyectos,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}
export default ProyectoState;