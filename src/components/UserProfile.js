import React from 'react'
import { Link } from 'react-router-dom';
import {getSingleUser} from '../util/UsersAPI.js';

 class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            editing: false,
            userProfile: false,
            loading: true,
        }
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
                loading: false,
            })
            if (user._id === localStorage.getItem('currentUser')) {
                this.setState({
                    userProfile: true
                })
            }
        })
    }

    //      TODO
    userDescription = () => {
        if (this.state.editing) {
            return <div>TODO</div>
        } else {
            return <div><p>{this.state.user.description}</p></div>
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
                    </div>
            } else {
                return <div>
                        <p>This user does not exist</p>
                    </div>
            }
        }
    }
}

export default UserProfile;