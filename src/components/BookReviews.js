import React from 'react';
import {getBook} from '../util/BookAPI';
import ListReviews from './ListReviews';

// at /views/Reviews.js
 class BookReviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookInfo: [],
            loading: true,
            authorKey: 0,
        }
    }

    getBookId = () => {
        const currentLocation = window.location.href;
        const splitLocation = currentLocation.split('/');
        const bookId = splitLocation[splitLocation.length -1];
        return bookId;
    }

    getBookInfo = (id) => {
        getBook(id).then(info => {
            if (info !== undefined) {
                this.setState({
                    bookInfo: info,
                    loading: false
                })
            } else {
                console.log('Error retrieving data.')
            }
        })
    }

    componentDidMount = () => {
        const bookid = this.getBookId();
        this.getBookInfo(bookid);
    }

    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
            return;
        };
    }
    

    render (){
        if(this.state.loading || this.state.loading) {
            return <div>
                    <p>Loading...</p>
                </div>
        } else {
            return <div>
                <div>
                    <h3>{this.state.bookInfo.volumeInfo.title}</h3>
                    <div>{this.state.bookInfo.volumeInfo.authors.map((author) => {
                        return <p>{author}</p>
                    })}</div>
                </div>
            </div>
        }
    }
}

export default BookReviews;