import React, {useContext, useEffect} from 'react';

import Proyecto from './Proyecto';

import proyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alerta/alertaContext';

const ListadoProyectos = () => {

    const proyectosContext = useContext(proyectoContext);
    const {mensaje, proyectos, obtenerProyectos} = proyectosContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    useEffect(()=>{

        //si hay un error...
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerProyectos();
        //para quitar un error amarillo de la consola cuando sabemos que esta bien se pone la siguiente linea
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mensaje]);
//eslint-disable-next-line 
    if(proyectos.length === 0) return (<p>No hay proyectos, comienza creando uno.</p>);

    return(

        <ul className="listado-proyectos">
            { alerta ? (<div className ={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null }
            {proyectos.map(proyecto=>(
               
               <Proyecto
                   key={proyecto._id}
                   proyecto={proyecto}
               />

            ))}
            
        </ul>

    )
}
export default ListadoProyectos;