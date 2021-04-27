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
                description: 'Welcome to my profile!',
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
        return <div className="container">
            <div className=" d-inline-flex">
                <form onSubmit={this.handleSubmit}>
                    <h1>Sign Up</h1>
                    <div className="mb-3">
                        <label for="username">Username</label>
                        <input 
                            type="text" 
                            className="form-control"
                            name="username" 
                            value={this.state.username} 
                            onChange={this.handleChange} />
                    </div>
                    <div className="mb-3">
                        <label for="email">Email Address</label>
                        <input 
                            type="email" 
                            className="form-control"
                            name="email"
                            value={this.state.email} 
                            onChange={this.handleChange} />
                    </div>
                    <div className="mb-3">
                        <label for="password">Password</label>
                        <input 
                            type="password" 
                            className="form-control"
                            name="password" 
                            value={this.state.password} 
                            onChange={this.handleChange} />
                    </div>
                    <div for="checkPw" className="mb-3">
                        <label>Password again</label>
                        <input 
                            type="password" 
                            className="form-control"
                            name="checkPw"
                            value={this.state.checkPw} 
                            onChange={this.handleChange} />
                    </div>

                    <div>
                        <p>{this.state.errorMessage}</p>
                    </div>

                    <div>
                        <p>Already have an account? <Link to='/login'>Login here!</Link></p>
                    </div>

                    <button type="submit" className="btn btn-danger">Sign Up</button>
                </form>
                </div></div>
        }
    }
}

export default withRouter(SignUpForm);