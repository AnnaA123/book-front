import React from 'react';
import LoginForm from '../components/LoginForm'

function Login(props) {
    return (
        <div>
            <LoginForm setUser={props.setUser} />
        </div>
    )
}

export default Login;