import React,{Fragment, useContext} from 'react';
import Tarea from './Tarea';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';



const ListadoTareas = () => {

    const tareasContext = useContext(tareaContext);
    const {tareasproyecto} = tareasContext;

    const proyectosContext = useContext(proyectoContext);//utilizamos useContext y le decimos que context queremos utilizar
    const {proyecto, eliminarProyecto} = proyectosContext;//extraemos formulario y ya lo podemos utilizar en este componente
    
        

    // la primera vez proyecto viene como null asi que...
    if(proyecto === null) return(<h2>Selecciona un proyecto</h2>)
   
    //aplicamos array destructuring para acceder de inmediato a la primera posicion
    const [proyectoActual] = proyecto;
    //console.log(proyectoActual);



    
    



    




   
    
    //eliminar proyecto
    const deleteProyecto = () => {
        eliminarProyecto(proyectoActual._id);
    }
    return(

        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">

                {tareasproyecto.length === 0

                ? (<li className="tarea"><p>No hay tareas</p></li>)

                : (tareasproyecto.map(tarea=>(
                       
                    <Tarea
                        key={tarea._id} 
                        tarea={tarea}
                    />
                       
                   )))
                   
                }

            </ul>

            <button
               type="button"
               className="btn btn-eliminar"
               onClick = {deleteProyecto}
            >Eliminar proyecto &times;</button>

        </Fragment>

    )
}
export default ListadoTareas;