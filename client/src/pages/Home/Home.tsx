import React,{ useEffect } from 'react'
import './home.css'
import { Link } from "react-router-dom";
import auth0Client from '../../auth/Auth';
import { useNavigate } from 'react-router-dom';
const logo =  require("../../assets/images/mnos.png")

const Home = () => {
  let navigate = useNavigate();
  
  useEffect(() => {
    if (auth0Client.isAuthenticated()) {
         auth0Client.signIn();
          navigate('/profile')
    // } else{
    //     //  auth0Client.signIn();
    //      navigate('/')
    }
  },[])



  return (
    <div >
          <section className='showcase'>
            <div className="showcase_text">
                <h3>Pay for your airtime 
                  <br />
                   On any Nigerian mobile phone network
                   </h3>
                <p>
                    We support MTN, Glo, Airtel and 9mobile
                </p>
                    <div className="btns">
                        <button className='btn_started' >Get Started</button>
                    </div>
            </div>
            <div className="image">
                <img className='image' alt='logo' src={logo} />
            </div>
        </section>  
    </div>
  )
}

export default Home;



