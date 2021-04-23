import React from 'react';
import BookInfo from '../components/BookInfo';
import ListReviews from '../components/ListReviews';

function Book(props) {
    console.log('BOOKJSprops: ' + JSON.stringify(props));
    return (
        <div>
            <BookInfo {...props}/>
            <ListReviews {...props} />
        </div>
    )
}

export default Book;