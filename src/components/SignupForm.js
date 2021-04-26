import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { register } from '../util/UsersAPI';

//used in Signup.js

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                email: '',
                password: '',
                checkPw: '',
            },
            errorMessage: '',
            userCreated: false,
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
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

    //sends submit info to UsersAPI.js to register, if it doesnt work, adds an error message to the page
    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.user.password === this.state.user.checkPw) {
            const user = {
                username: this.state.user.username,
                email: this.state.user.email,
                password: this.state.user.password,
                description: 'I love reading!',
            }

            register(user).then(user => {
                if (user.error !== undefined) {
                    this.setState({ errorMessage: 'Cannot signup. Username, password or email needs to be changed.' })
                } else {
                    this.setState({ userCreated: true });
                }
            });
        } else {
            this.setState({ errorMessage: 'Passwords do not match.' })
        }
    }

    render () {
        if (this.state.userCreated) {
            return <div>
                <p>User has been successfully created.</p>
                <Link to='/login'>Back to Login page</Link>
            </div>
        } else {
        return <div>
                <h1>Sign Up</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={this.state.username} 
                        onChange={this.handleChange} />
                    <label>Email Address</label>
                    <input 
                        type="email" 
                        name="email"
                        value={this.state.email} 
                        onChange={this.handleChange} />
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={this.state.password} 
                        onChange={this.handleChange} />
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="checkPw"
                        value={this.state.checkPw} 
                        onChange={this.handleChange} />

                    <div>
                        <p>{this.state.errorMessage}</p>
                    </div>

                    <div>
                        <p>Already have an account?</p>
                        <Link to='/login'>Login here!</Link>
                    </div>

                    <button type="submit">Sign Up</button>
                </form>
                </div>
        }
    }
}

export default withRouter(SignUpForm);