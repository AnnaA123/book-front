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
        const u = {
            username: this.state.user.username,
            password:  this.state.user.password
        }
        login(u).then(response => {
            if (response !== null) {
                if (response.username !== undefined) {
                    const userIsSet = this.props.setUser(response);
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('currentUser', response.id);
                    this.props.history.push('/');
                    return userIsSet;
                } else {
                    this.setState({errorMessage: 'Username or password is incorrect.'});
                }
            } else {
                this.setState({errorMessage: 'Something went wrong'});
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
        return <div className="container">
            <div className="d-inline-flex">
                <form onSubmit={this.handleSubmit}>
                    <h1>Login</h1>
                    <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input 
                        type="text" 
                        className="form-control height=200px"
                        name="username" 
                        id="username" 
                        label="Username"
                        value={this.state.user.username}
                        onChange={this.handleChange} />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        className="form-control"
                        name="password" 
                        id="password" 
                        label="Password"
                        value={this.state.user.password}
                        onChange={this.handleChange}
                         />
                    </div>
                    <div>
                        <p>{this.state.errorMessage}</p>
                    </div>

                    <div>
                        <p>Don't have an account yet? <Link to='/signup'>Sign up here!</Link></p>
                        
                        <p>{"\n"}</p>
                    </div>

                    <button type="submit" className="btn btn-danger">Login</button>
                </form>
                </div></div>
    }
}

export default withRouter(LoginForm);