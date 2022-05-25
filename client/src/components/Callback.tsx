import React, {useEffect} from 'react';
import { withRouter } from './WithRouter';
import auth0Client from '../auth/Auth'
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom"

function Callback() {
    let navigate = useNavigate();
    let location = useLocation();
   

    useEffect( () => {
        (async () => {
            if (/access_token|id_token|error/.test(location.hash)){
                await auth0Client.handleAuthentication();
                navigate('/profile');
            }
            
        })();
    },[])
  
    return (
      <p>Loading profile...</p>
    );
}

export default withRouter(Callback);