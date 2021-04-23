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

    handleClick(event) {
        event.preventDefault();

        console.log('no :)');
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
                return <div>
                <div>
                    <h3>{this.state.bookInfo.volumeInfo.title}</h3>
                    <div>{this.state.bookInfo.volumeInfo.authors.map((author) => {
                        return <p>{author}</p>
                    })}</div>
                    <Link to={`/write/${this.state.bookInfo.id}`}>Write review</Link>
                </div>
                </div>
            }
        }
    }
}

export default withRouter(BookInfo);