import React from 'react'
import { Link } from 'react-router-dom';
import { searchBooks } from '../util/BookAPI';

 class SearchBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            loading: true,
        }
        this.getBooks = this.getBooks.bind(this);
    }

    getBooks(terms) {
        searchBooks(terms).then(books => {
            this.setState({
              books: books.items,
              loading: false,
            });
            console.log(this.state.books);
          });
     }

    componentDidMount() {
        this.getBooks();
    }

    render (){
        if (this.state.loading) {
            return <div>
                        <p>Loading...</p>
                    </div>
        } else {
            if (this.state.books[0] !== undefined) {
                return this.state.books.map((book) => {
                    return <div key={book.id}><Link to={`/review/${book.id}`} key={book.id}> 
                    <div>
                        <p>{ book.volumeInfo.title }</p>
                    </div></Link></div>
                });
            } else {
                return <div>
                    <p>...</p>
                    </div>
            }
        }
    }
}

export default SearchBooks;