import React from 'react';
import BookInfo from '../components/BookInfo';
import ListReviews from './../components/ListReviews';

function Review(props) {
    return (
        <div>
            <BookInfo {...props}/>
            <ListReviews {...props} />
        </div>
    )
}

export default Review;