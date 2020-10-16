import React, { useContext } from 'react';
import NavBar from '../SharedItem/NavBar/NavBar';
import logo from '../../images/logos/logo.png';
import './LoginPage.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import google from '../../images/icons/google.png';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import { UserContext } from '../../App';

firebase.initializeApp(firebaseConfig);

const LoginPage = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    const provider = new firebase.auth.GoogleAuthProvider();

    const handleLogin = () => {
        firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            const {displayName, email, photoURL} = result.user;
            const newUser = {...loggedInUser};
            newUser.isLoggedIn = true;
            newUser.name = displayName;
            newUser.email = email;
            newUser.img = photoURL;
            newUser.error = '';

            setLoggedInUser(newUser);
            console.log(result);
            console.log(loggedInUser);
            history.replace(from);
        })
        .catch(function(error) {

            const newUser = {...loggedInUser};
            newUser.isLoggedIn = false;
            newUser.name = "";
            newUser.email = "";
            newUser.img = "";
            newUser.error = error.message;

            setLoggedInUser(newUser);
            console.log(error.message);
        });
    }

    return (
        <div className="container">
            <NavBar></NavBar>
            <div className="text-center mt-5">
                <img src={logo} className="company-logo" alt="" srcset=""/>
            </div>
            <div className="my-5 d-flex justify-content-center">
                <div className="login-card text-center p-5">
                    <h3 className="">Login</h3><br/>
                    <button onClick={handleLogin} className="btn btn-light pr-5 login-button font-weight-normal">
                        <img src={google} style={{width: '20px'}} className="mr-5" alt=""/>
                        Continue With Google
                        </button><br/>
                    <small className="font-weight-normal">Don't have an account? <Link onClick={handleLogin}>Create an account</Link></small>
                    <br/>

                    {
                        loggedInUser.error && <small className="font-weight-normal text-center text-danger">{loggedInUser.error}</small>
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default LoginPage;