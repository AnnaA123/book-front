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
                return <div className="p-2 w-100">
                    <h4 className="mt-3">Reviews by this user:</h4>
                {this.state.reviews.map((review) => {
                    return <div className="mb-3 border-top border-dark" key={review.id}>
                        <Link className="link-danger text-decoration-none" to={`/review/${review.id}`}>
                            <div>
                                <h5 className="mt-2">
                                    { review.Title }
                                </h5>
                                <p className="small">{review.BookTitle}</p>
                            </div>
                        </Link></div>
                })} </div>
            } else {
                return <div>
                        <p>No reviews</p>
                    </div>
            }
        }
    }
}

export default ListUserReviews;