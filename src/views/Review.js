import React from 'react';
import BookReviews from '../components/BookReviews';
import ListReviews from './../components/ListReviews';

function Review(props) {
    return (
        <div>
            <h1>Review</h1>
            <BookReviews {...props}/>
            <ListReviews {...props} />
        </div>
    )
}

export default Review;