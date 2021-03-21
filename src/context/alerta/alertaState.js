import React, { useReducer } from 'react';

import alertaContext from '../alerta/alertaContext';
import alertaReducer from '../alerta/alertaReducer';

import { MOSTRAR_ALERTA, OCULTAR_ALERTA} from '../../types';


const AlertaState = props => {   // AlertaState va la primera en mayuscula

    const initialState = {
        alerta : null
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(alertaReducer, initialState);//primero le pasamos un reducer y despues un state inicial


    //Funciones
    const mostrarAlerta = (msg, categoria) => {
        dispatch({
            type : MOSTRAR_ALERTA,
            payload : {
                msg,
                categoria
            }
        });
        
        // despues de 5 seg limpiar la alerta
        setTimeout(()=>{
            dispatch({
                type : OCULTAR_ALERTA
            })
        }, 5000);
            
        
    }

    return(

        <alertaContext.Provider
            value = {{
                alerta : state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </alertaContext.Provider>
    )
}

export default AlertaState;