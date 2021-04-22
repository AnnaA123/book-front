import React from 'react'
import { Link } from 'react-router-dom';
import { getAllBookReviews } from '../util/ReviewAPI';

// for /views/Review.js
 class ListReviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            loading: true,
        }
        this.getReviews = this.getReviews.bind(this);
    }

    getBookId = () => {
        const currentLocation = window.location.href;
        const splitLocation = currentLocation.split('/');
        const bookId = splitLocation[splitLocation.length -1];
        console.log('review BOOKID ' + bookId)
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
        //const userId = localStorage.getItem('currentUser');
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
                return this.state.reviews.map((review) => {
                    return <div key={review._id}>
                    <div>
                        <h3>{ review.Title }</h3>
                        <p>{ review.Content }</p>
                    </div></div>
                });
            } else {
                return <div>
                        <p>No reviews</p>
                    </div>
            }
        }
    }
}

export default ListReviews;