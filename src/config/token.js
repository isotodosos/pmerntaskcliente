import axios from 'axios';

const tokenAuth = token => {

    
    if(token){

        axios.defaults.headers.common['x-auth-token'] = token;
        
    }else{
        
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default tokenAuth;