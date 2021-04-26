import React from 'react'
import { Link } from 'react-router-dom';
import { getAllUserReviews } from '../util/ReviewAPI';

// for /views/Profile.js
 class ListUserReviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            loading: true,
        }
        this.getReviews = this.getReviews.bind(this);
    }

    getUserId = () => {
        const currentLocation = window.location.href;
        const splitLocation = currentLocation.split('/');
        const userId = splitLocation[splitLocation.length -1];
        console.log('USERID ' + userId)
        return userId;
    }

    getReviews = (id) => {
        getAllUserReviews(id).then(reviews => {
            this.setState({
              reviews,
              loading: false,
            });
          });
     }

    componentDidMount() {
        //const userId = localStorage.getItem('currentUser');
        const userId = this.getUserId();
        this.getReviews(userId);
    }

    render (){
        if (this.state.loading) {
            return <div>
                        <p>Loading...</p>
                    </div>
        } else {
            if (this.state.reviews[0] !== undefined) {
                return this.state.reviews.map((review) => {
                    return <div key={review._id}><Link to={`/review/${review._id}`}>
                    <div>
                        <h3>{ review.Title }</h3>
                        <p>{review.BookTitle}</p>
                    </div>
                    </Link></div>
                });
            } else {
                return <div>
                        <p>No reviews</p>
                    </div>
            }
        }
    }
}

export default ListUserReviews;