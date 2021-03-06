import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import {getSingleUser, editUser} from '../util/UsersAPI.js';

 class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            edits: '',
            editing: false,
            userProfile: false,
            loading: true,
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleEditBtn = this.handleEditBtn.bind(this);
    }

    handleChange(event) {   
        const value = event.target.value;
        const name = event.target.name;

        this.setState((prevState) => ({
            [name]: value
        }));
    }

    getUserId = () => {
        const currentLocation = window.location.href;
        const splitLocation = currentLocation.split('/');
        const userId = splitLocation[splitLocation.length -1];
        return userId;
    }

    getUser = (id) => {
        getSingleUser(id).then((user) => {
            this.setState({
                user: user,
                edits: user.description,
                loading: false,
            })
            if (user.id === localStorage.getItem('currentUser')) {
                this.setState({
                    userProfile: true
                })
            }
        })
    }

    editDescription = (event) => {
        event.preventDefault();

        const edited = {
            username: this.state.user.username,
            email: this.state.user.email,
            description: this.state.edits
        }

        editUser(edited, localStorage.getItem('currentUser')).then(response => {
            if (response.error !== undefined) {
                console.log(response.error);
            } else {
                window.location.reload();
            }
        })
    }

    userDescription = () => {
        if (this.state.editing) {
            return <div className="d-flex flex-column">
            <form id='descform' onSubmit={this.editDescription}>
                <div className="mb-3">
                <textarea 
                form='descform'
                className="form-control"
                name='edits'
                value={this.state.edits}
                onChange={this.handleChange}></textarea>
                </div>

                <button className="btn btn-danger m-3" type='submit'>Save</button>
            </form>
            </div>
        } else {
            return <div><p>{this.state.user.description}</p></div>
        }
    }

    handleEditBtn = (event) => {
        event.preventDefault();
        this.setState({editing: !this.state.editing});
    }

    editBtn = () => {
        if (this.state.userProfile && this.state.editing === false) {
            return <div>
                <button className="btn btn-danger m-3" onClick={this.handleEditBtn}>Edit profile</button>
                </div>
        }
    }

    componentDidMount() {
        const userId = this.getUserId();
        this.getUser(userId);
    }

    render (){
        if (this.state.loading) {
            return <div>
                        <p>Loading...</p>
                    </div>
        } else {
            if (this.state.user !== undefined) {
                return <div  className="p-5 w-100">
                    <h2>{this.state.user.username}</h2>
                    {this.userDescription()}
                    {this.editBtn()}
                    </div>
            } else {
                return <div>
                        <p>This user does not exist</p>
                    </div>
            }
        }
    }
}

export default withRouter(UserProfile);