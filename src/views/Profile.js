import React from 'react';
import UserProfile from '../components/UserProfile';
import ListUserReviews from './../components/ListUserReviews';

function Profile(props) {
    return (
        <div className="d-flex flex-row">
            <UserProfile />
            <ListUserReviews />
        </div>
    )
}

export default Profile;