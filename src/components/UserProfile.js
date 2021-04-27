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
        console.log('USERID ' + userId)
        return userId;
    }

    getUser = (id) => {
        getSingleUser(id).then((user) => {
            this.setState({
                user: user,
                edits: user.description,
                loading: false,
            })
            if (user._id === localStorage.getItem('currentUser')) {
                this.setState({
                    userProfile: true
                })
            }
        })
    }

    editDescription = (event) => {
        event.preventDefault();

        const edited = {
            description: this.state.edits
        }

        editUser(edited, localStorage.getItem('currentUser'), localStorage.getItem('token')).then(response => {
            if (response.error !== undefined) {
                console.log(response.error);
            } else {
                console.log('success');
                window.location.reload();
            }
        })
    }

    userDescription = () => {
        if (this.state.editing) {
            return <div>
                <form id='descForm' onSubmit={this.editDescription}>
                    <textarea
                    form='descform'
                    name='edits'
                    value={this.state.edits}
                    onChange={this.handleChange}></textarea>

                    <button type='submit'>Save</button>
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
                <button onClick={this.handleEditBtn}>Edit profile</button>
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
                return <div>
                    <p>{this.state.user.username}</p>
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