import React from 'react';
import BookReviews from '../components/content/BookReviews';

function Review(props) {
    return (
        <div>
            <h1>Review</h1>
            <BookReviews {...props}/>
        </div>
    )
}

export default Review;