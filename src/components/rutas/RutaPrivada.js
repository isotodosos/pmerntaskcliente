import React, {useContext, useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';

import AuthContext from '../../context/autenticacion/authContext';

// higher order component
const RutaPrivada = ({ component : Component, ...props}) => {

    const authComponent = useContext(AuthContext);
    const { autenticado, cargando, usuarioAutenticado } = authComponent;

    useEffect(() => {
        usuarioAutenticado();
        //eslint-disable-next-line
    },[])
    
    return(

        <Route {...props} render = { props => !autenticado && !cargando ? (
            <Redirect to="/" />
        ) : (
            <Component {...props} />
        ) }
        
        />

    )
}

export default RutaPrivada;