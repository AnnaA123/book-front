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

     showThumbnail = (book) => {
         if (book.volumeInfo.imageLinks !== undefined){
            return <img className="mt-3" src={ book.volumeInfo.imageLinks.thumbnail } alt={book.volumeInfo.title}/>
         } else {
             return <p className="mt-3">(No image available)</p>
         }
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
                return <div className="row row-cols-3">{this.state.books.map((book) => {
                    return <div className="col col-sm-4 border border-white" key={book.id}>
                        <Link className="link-danger text-decoration-none" to={`/book/${book.id}`} key={book.id}> 
                            <div>
                                {this.showThumbnail(book)}
                                <p>{ book.volumeInfo.title }</p>
                            </div>
                    </Link></div>
                })}</div>
            } else {
                return <div>
                    <p>No search results</p>
                    </div>
            }
        }
    }
}

export default SearchBooks;