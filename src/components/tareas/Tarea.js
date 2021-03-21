import React, {useContext} from 'react';

import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';



const Tarea = ({tarea}) => {

    const tareasContext = useContext(tareaContext);
    const {eliminarTarea, obtenerTareas, actualizarTarea, seleccionarTarea} = tareasContext;

    const proyectosContext = useContext(proyectoContext);//utilizamos useContext y le decimos que context queremos utilizar
    const {proyecto} = proyectosContext;
    const [proyectoSeleccionado] = proyecto;
    //console.log(proyectoSeleccionado);

    // Funcion cambiar estado completo/incompleto
    const modificarEstado = tarea => {
        (tarea.estado 
        ? tarea.estado = false 
        : tarea.estado = true
        )
        actualizarTarea(tarea)
    }

    //Funcion tarea seleccionada para modificar
    const clickSeleccionada = tarea => {
        
        seleccionarTarea(tarea)
    }
    

    // funcion de boton eliminar
    const clickEliminar = id => {
        eliminarTarea(id, proyectoSeleccionado._id)
        obtenerTareas(proyectoSeleccionado._id)
       
    }

    return(
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">

                {tarea.estado

                ?  
                    (<button
                       type="button"
                       className="completo"
                       onClick={() => {modificarEstado(tarea)}}
                    >Completo</button>
                    )

                :
                    (<button
                        type="button"
                        className="incompleto"
                        onClick={() => {modificarEstado(tarea)}}
                    >Incompleto</button>
                    )

                }
            </div>
            <div className="acciones">
                <button
                   type="button"
                   className="btn btn-primario"
                   onClick={() => {clickSeleccionada(tarea)}}
                >Editar</button>

                <button
                   type="button"
                   className="btn btn-secundario"
                   onClick = {() => {clickEliminar(tarea._id)}}
                >Eliminar</button>
                
            </div>
        </li>
    )
}
export default Tarea;