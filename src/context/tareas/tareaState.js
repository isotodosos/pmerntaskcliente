import React, {useReducer} from 'react';

import tareaContext from './tareaContext';
import tareaReducer from './tareaReducer';

import {TAREAS_PROYECTO,
        AGREGAR_TAREA,
        VALIDAR_TAREA,
        ELIMINAR_TAREA,
        SELECCIONAR_TAREA,
        ACTUALIZAR_TAREA} from '../../types';

import axios from 'axios';        

const TareaState = (props) => {

    const initialState = {
        
        tareasproyecto : [],
        errortarea : false,
        tareaseleccionada : null
    }

    const [state, dispatch] = useReducer(tareaReducer, initialState);

    const obtenerTareas = async proyecto => {
        // console.log(proyecto);
        try {
             
            const resultado = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tareas`, {params : { proyecto }});
            
            dispatch({
                type : TAREAS_PROYECTO,
                payload : resultado.data.tareas
            })
            
        } catch (error) {
            console.log(error);
        }
        
    }

    const agregarTarea = async tarea => {
        //console.log(tarea);
        try {
            const resultado = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/tareas`, tarea);
            //console.log(resultado);

            dispatch({
                type : AGREGAR_TAREA,
                payload : resultado.data.tarea 
            })
            
        } catch (error) {
            console.log(error);
        }
        
    }

    const validarTarea = () => {
        dispatch({
            type : VALIDAR_TAREA
        })
    }

    const eliminarTarea = async (id, proyecto) => {

        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/tareas/${id}`, {params : { proyecto }});
            
            dispatch({
                type : ELIMINAR_TAREA,
                payload : id
            })

        } catch (error) {
            console.log(error);
        }
        
    }

    const actualizarTarea = async tarea => {
        //console.log(tarea);
        try {

            const resultado = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/tareas/${tarea._id}`, tarea);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload : resultado.data.tarea
            })

        } catch (error) {
            console.log(error);
        }
        
    }

    const seleccionarTarea = tarea => {
        dispatch({
            type : SELECCIONAR_TAREA,
            payload : tarea
        })
    }

    

    return(
        <tareaContext.Provider
        value={{
            
            tareasproyecto: state.tareasproyecto,
            errortarea : state.errortarea,
            tareaseleccionada: state.tareaseleccionada,
            obtenerTareas,
            agregarTarea,
            validarTarea,
            eliminarTarea,
            seleccionarTarea,
            actualizarTarea
        }}
        >
            {props.children}
        </tareaContext.Provider>
    )
}
export default TareaState;