import React from 'react';
import {getBook} from '../util/BookAPI';
import { Link, withRouter } from 'react-router-dom';

// fetch info about a specific book from google books
// at /views/Book.js
 class BookInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookInfo: [],
            loading: true,
            authorKey: 0,
        }
        this.handleClick = this.handleClick.bind(this);
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

    showBookAuthors = (book) => {
        if (book.volumeInfo.authors !== undefined) {
            return <div>{book.volumeInfo.authors.map((author) => {
                return <p>{author}</p>
            })}</div>
        }
    }

    showCover = (book) => {
        if (book.volumeInfo.imageLinks !== undefined){
           return <img className="mt-3" src={ book.volumeInfo.imageLinks.thumbnail } alt={book.volumeInfo.title}/>
        } else {
            return <p className="mt-3 mb-3">No image available</p>
        }
    }

    writeReview = () => {
        if (localStorage.getItem('token') !== null) {
            return <div>
                <Link className="link-danger text-decoration-none" to={`/write/${this.state.bookInfo.id}`}>Write review</Link>
                </div>
        }
    }

    handleClick(event) {
        event.preventDefault();

        this.props.history.push('/write');
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
        if(this.state.loading) {
            return <div>
                    <p>Loading...</p>
                </div>
        } else {
            if (this.state.bookInfo.volumeInfo === undefined){
                return <div><p>error</p></div>
            } else {
                return <div className="p-2 m-3">
                <div>
                    {this.showCover(this.state.bookInfo)}
                    <h3>{this.state.bookInfo.volumeInfo.title}</h3>
                    {this.showBookAuthors(this.state.bookInfo)}
                    {this.writeReview()}
                </div>
                </div>
            }
        }
    }
}

export default withRouter(BookInfo);