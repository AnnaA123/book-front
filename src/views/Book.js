import React from 'react';
import BookInfo from '../components/BookInfo';
import ListReviews from '../components/ListReviews';

function Book(props) {
    console.log('BOOKJSprops: ' + JSON.stringify(props));
    return (
        <div className="d-flex flex-row">
            <BookInfo {...props}/>
            <ListReviews {...props} />
        </div>
    )
}

export default Book;