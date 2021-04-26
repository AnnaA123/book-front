import React from 'react'
import { Link } from 'react-router-dom';
import { searchBooksByTitle, searchBooksByAuthor } from '../util/BookAPI';

// list books from google books api with props from BookSearch.js
 class SearchBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            searchTitle: props.sTitle,
            loading: true,
        }
        this.getBooks = this.getBooks.bind(this);
    }

    getBooks = () => {
        searchBooksByTitle(this.state.searchTitle).then(books => {
            this.setState({
                books: books.items,
                loading: false,
            });
            });
     }

    componentDidMount = () => {
        this.getBooks();
    }

    render (){
        if (this.state.loading) {
            return <div>
                        <p>Loading...</p>
                    </div>
        } else {
            if (this.state.books !== undefined) {
                return this.state.books.map((book) => {
                    return <div key={book.id}><Link to={`/book/${book.id}`} key={book.id}> 
                    <div>
                        <p>{ book.volumeInfo.title }</p>
                    </div></Link></div>
                });
            } else {
                return <div>
                    <p>No search results</p>
                    </div>
            }
        }
    }
}

export default SearchBooks;