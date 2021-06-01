import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { fireBaseJWT, GoogleLogin } from './LoginManager';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const googleSignInHandler = () => {
        GoogleLogin()
        .then(res => {
            setLoggedInUser(res);
            fireBaseJWT()
            .then(token => sessionStorage.setItem('token', token));
            history.replace(from);
        })
    }

    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={googleSignInHandler}>Login with Google</button>
        </div>
    );
};

export default Login;