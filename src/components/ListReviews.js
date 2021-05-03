import React from 'react'
import { Link } from 'react-router-dom';
import { getAllBookReviews } from '../util/ReviewAPI';
import { getSingleUser } from '../util/UsersAPI';

// for /views/Book.js
 class ListReviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            users: [],
            loading: true,
        }
        this.getReviews = this.getReviews.bind(this);
    }

    getBookId = () => {
        const currentLocation = window.location.href;
        const splitLocation = currentLocation.split('/');
        const bookId = splitLocation[splitLocation.length -1];
        return bookId;
    }

    getReviews(id) {
        getAllBookReviews(id).then(reviews => {
            this.setState({
              reviews,
              loading: false,
            });
          });
        
     }

    componentDidMount() {
        const bookId = this.getBookId();
        this.getReviews(bookId);
    }

    render (){
        if (this.state.loading) {
            return <div>
                        <p>Loading...</p>
                    </div>
        } else {
            if (this.state.reviews[0] !== undefined) {
                return <div className="p-5 w-100 flex-column">{this.state.reviews.map((review) => {
                    return <div className="mb-3 border-bottom border-dark" key={review.id}>
                    <div className="mb-3 ">
                        <Link className="link-danger text-decoration-none" to={`/review/${review.id}`}><h3>{ review.Title }</h3></Link>
                        <p>{review.Rating}/5</p>
                        <p>{ review.Content }</p>
                        <Link className="link-dark fw-bold" to={`/users/${review.UserID.id}`}>{ review.UserID.username }</Link>
                    </div></div>
                })}</div>
            } else {
                return <div>
                        <p>No reviews</p>
                    </div>
            }
        }
    }
}

export default ListReviews;