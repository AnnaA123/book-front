import React from 'react';
import BookReviews from '../components/BookReviews';
import ListReviews from './../components/ListReviews';

function Review(props) {
    return (
        <div>
            <BookReviews {...props}/>
            <ListReviews {...props} />
        </div>
    )
}

export default Review;