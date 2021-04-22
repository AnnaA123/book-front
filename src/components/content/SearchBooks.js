import React from 'react'
import { Link } from 'react-router-dom';
import { searchBooks } from '../util/BookAPI';

// list books from google books api with props from BookSearch.js
 class SearchBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            searchQuery: props.sQuery,
            loading: true,
        }
        this.getBooks = this.getBooks.bind(this);
    }

    getBooks = (terms) => {
        searchBooks(terms).then(books => {
            this.setState({
              books: books.items,
              loading: false,
            });
          });
     }

    componentDidMount = () => {
        this.getBooks(this.state.searchQuery);
    }

    render (){
        if (this.state.loading) {
            return <div>
                        <p>Loading...</p>
                    </div>
        } else {
            if (this.state.books !== undefined) {
                return this.state.books.map((book) => {
                    return <div key={book.id}><Link to={`/review/${book.id}`} key={book.id}> 
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