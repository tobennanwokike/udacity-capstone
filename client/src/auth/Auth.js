import auth0 from 'auth0-js';
import { authConfig } from '../config';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";


class Auth {
  accessToken;
    idToken;
    expiresAt;
  constructor() {
    this.auth0 = new auth0.WebAuth({
          domain: authConfig.domain,
          clientID: authConfig.clientId,
          redirectUri: authConfig.callbackUrl,
          responseType: 'token id_token',
          scope: 'openid',
          // cacheLocation:"localstorage"
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);

  }

  getAccessToken() {
        return this.accessToken;
      }
  getProfile() {
    return this.profile;
  }

  getIdToken() {
    // localStorage.setItem('isLoggedIn', 'true');
    return this.idToken;
  }

  setSession(authResult) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('LoggedIn', 'true');

    // Set the time that the access token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;
    localStorage.setItem("token", authResult.idToken)
    // navigate to the home route
    // this.history.replace('/');
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.signOut();
        console.log(err);
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
      }
    });
  }

  isAuthenticated() {
    var token = localStorage.getItem('token');
    if(!token) return false
    var decoded = jwt_decode(token);
    let expiresAt = (decoded.exp * 1000) + new Date().getTime();
    return new Date().getTime() < expiresAt;
  }

  signIn() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;
        // set the time that the id token will expire at
        // this.expiresAt = authResult.idTokenPayload.exp * 1000;
        resolve();
      });
    })
  }

 
  
  signOut() {
    // clear id token, profile, and expiration
    console.log('sign out is called')
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;
    localStorage.clear();
    this.auth0.logout({
      return_to: window.location.origin
      // return_to: 'http://localhost:3000/'
    });
    window.location.href = "http://localhost:3000/";
  }
}

const auth0Client = new Auth();

export default auth0Client;