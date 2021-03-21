import React, {useState, useEffect, useContext} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    const proyectosContext = useContext(proyectoContext);//utilizamos useContext y le decimos que context queremos utilizar
    const {proyecto} = proyectosContext;//extraemos formulario y ya lo podemos utilizar en este componente
    
    const tareasContext = useContext(tareaContext);
    const {tareaseleccionada, errortarea, validarTarea, agregarTarea, obtenerTareas, actualizarTarea } = tareasContext;
    

    

    useEffect(() => {
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada)
            
            
        }
        else{
            guardarTarea({
                nombre : ''
            })
        }
    },[tareaseleccionada]);


    


    const [tarea, guardarTarea] = useState({
        nombre: ''
    })
    
    const {nombre} = tarea;


    
    
    
    // la primera vez proyecto viene como null asi que...
    if(proyecto === null) return null;

    //aplicamos array destructuring para acceder de inmediato a la primera posicion
    const [proyectoActual] = proyecto;
    
    
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
        
    }

    const onSubmit = e => {
        e.preventDefault();
        
        if(nombre.trim() ===''){
            validarTarea()
            return;
        }

        // revisamos si es edicion o es creacion de una nueva tarea
        if (tareaseleccionada === null){

            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
            
        }
        else{
            actualizarTarea(tarea);
        }
       
        
        obtenerTareas(proyectoActual._id);
        guardarTarea({
            nombre: ''
        })
        

    }

    return(
        <div className="formulario">
            <form
               onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre de la tarea.."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div> 

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-submit btn-block btn-primario"
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div> 

                {errortarea ? <p className="alerta-error">Tienes que agregar un nombre a la tarea</p> : null}
            </form>

        </div>

    )
}
export default FormTarea;