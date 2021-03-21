import React, {Fragment, useState, useContext} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {


    // obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);//utilizamos useContext y le decimos que context queremos utilizar
    const {formulario, errorformulario, mostrarFormulario, mostrarError, agregarProyectos} = proyectosContext;//extraemos formulario y ya lo podemos utilizar en este componente

    const [ proyecto, guardarProyecto ] = useState({//será un objeto pq le generaremos un id a cada proyecto para evitar que tenga el mismo nombre y se confunda para borrar en la bbdd
        nombre: ''
    });
    

    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    const onSubmitProyecto = e => {
        e.preventDefault();

        //validamos
        if(proyecto.nombre === ''){
            mostrarError();
            return;//importante 
        }
        //agregar al state
        agregarProyectos(proyecto);
        //Resetear el form
        guardarProyecto('');
    }

    //funcion onClick
    const onClick = () => {
        mostrarFormulario();
    }

    return(

        <Fragment>

            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick= {onClick}
            >Nuevo Proyecto</button>

            {formulario
            
            ?  (<form
                className="formulario-nuevo-proyecto"
                onSubmit={onSubmitProyecto}
                >
                 <input
                    type="text"
                    className="input-text"
                    placeholder="Nombre del proyecto"
                    name="nombre"
                    value={proyecto.nombre}
                    onChange={onChangeProyecto}
                 />
 
                 <input
                    type="submit"
                    className="btn btn-primario btn-block"
                    value="Agregar Proyecto"
                 />
                 
                </form>)
             
            : null
            }

            {errorformulario
            ? <p className="alerta-error">El nombre del proyecto es obligatorio</p>
            : null
            }

        </Fragment>
    )
}
export default NuevoProyecto;