import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { deleteUser } from '../util/UsersAPI.js';

 class DeleteUser extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
    }

    removeUser = (id) => {
        deleteUser(id).then(response => {
            if (response.error !== undefined){
                console.log('what ' + response.error);
            } else {
                localStorage.clear();
                this.props.history.push('/login');
            }
        })
    }

    handleClick = (event) => {
        event.preventDefault();
        this.removeUser(localStorage.getItem('currentUser'));
    }

    render (){
        return <div>
            <button className="btn btn-danger m-3" onClick={this.handleClick}>Delete user</button>
        </div>
    }
}

export default withRouter(DeleteUser);