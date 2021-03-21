
import {TAREAS_PROYECTO,
        AGREGAR_TAREA,
        VALIDAR_TAREA,
        ELIMINAR_TAREA,        
        SELECCIONAR_TAREA,
        ACTUALIZAR_TAREA} from '../../types';

export default (state, action) =>{
    switch(action.type){

        case TAREAS_PROYECTO:
            return({
                ...state,
                tareasproyecto : action.payload
            })
        case AGREGAR_TAREA:
            return({
                ...state,
                tareasproyecto : [action.payload, ...state.tareasproyecto],//asi colocamos la nueva tarea antes de la copia del state 
                errortarea:false
            })
        case VALIDAR_TAREA:
            return({
                ...state,
                errortarea : true
            }) 
        case ELIMINAR_TAREA:
            return({
                ...state,
                tareasproyecto : state.tareasproyecto.filter(tarea => tarea._id !== action.payload)
            })
        case ACTUALIZAR_TAREA: 
            return({
                ...state,
                tareasproyecto: state.tareasproyecto.map(tarea => tarea._id === action.payload._id
                ? action.payload
                : tarea
                ),
                tareaseleccionada : null

            })
        case SELECCIONAR_TAREA:
            return({
                ...state,
                tareaseleccionada : action.payload
            })
        
            
            


        default :
            return state;
    }
}