import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { login } from '../util/LoginAPI';

//used in Login.js

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: '',
            },
            errorMessage: '',
            validUser: true,
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.doLogin = this.doLogin.bind(this);
    }

    //sends the info to LoginAPI.js, which sends and compares it to the database
    doLogin = () => {
        login(this.state.user.username, this.state.user.password).then(response => {
            if (response.user !== undefined) {
                const userIsSet = this.props.setUser(response.user);
                localStorage.setItem('token', response.token);
                localStorage.setItem('currentUser', response.user._id);
                this.props.history.push('/');
                return userIsSet;
            } else {
                this.setState({errorMessage: 'Username or password is incorrect.'});
            }
        })
    };
    
    //input handling
    handleChange(event) {   
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                [name]: value,
            },
        }));
    }

    handleSubmit(event) {
        event.preventDefault();
        this.doLogin();
    }
    
    render () {
        return <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Username</label>
                    <input 
                        type="text" 
                        name="username" id="username" label="Username"
                        value={this.state.user.username}
                        onChange={this.handleChange} />
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password" id="password" label="Password"
                        value={this.state.user.password}
                        onChange={this.handleChange}
                         />
                    <div>
                        <p>{this.state.errorMessage}</p>
                    </div>

                    <div>
                        <p>Don't have an account?</p>
                        <Link to='/signup'>Sign up here!</Link>
                        <p>{"\n"}</p>
                    </div>

                    <button type="submit" >Login</button>
                </form>
                </div>
    }
}

export default withRouter(LoginForm);