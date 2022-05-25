import React,{useEffect} from 'react'
import './Header.css'
import { Link } from "react-router-dom";
import auth0Client from '../auth/Auth';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    let navigate = useNavigate();
    let auth = auth0Client.isAuthenticated();
        
    
    const signIn = ():void => {
        auth0Client.signIn()
        // navigate('/profile')
    }
    const signOut = ():void => {
        auth0Client.signOut();
        // navigate('/')
    }

  

  return (
    <div >
        <header>
            <div className="logo">
               <p> BILLPAY</p>
            </div>
            {
                auth ? 
                    <div>
                    <ul className="links">
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/transactions">Transactions</Link></li>
                        <li><Link to="/wallet">Wallet</Link></li>
                    </ul>
                </div> : ''
            }
            <button className="sign-up" onClick={() => {auth ? signOut() : signIn()}}>
                {auth ? 'Log Out':'Log In'}
            </button>
        </header>
    </div>
  )
}

export default Header