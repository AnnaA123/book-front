import React from 'react'
import { Link } from 'react-router-dom';

 class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
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

    componentDidMount() {
        //const userId = localStorage.getItem('currentUser');
        const bookId = this.getUserId();
    }

    render (){
        if (this.state.loading) {
            return <div>
                        <p>Loading...</p>
                    </div>
        } else {
            if (this.state.user[0] !== undefined) {
                return <div><p>User</p></div>
            } else {
                return <div>
                        <p>This user does not exist</p>
                    </div>
            }
        }
    }
}

export default UserProfile;