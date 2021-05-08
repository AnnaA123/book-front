import React from 'react'
import { Link } from 'react-router-dom';
import { searchBooksBySubject } from '../util/BookAPI';

// adds random books into the search page when nothing is being searched
 class SuggestBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            subject: this.setSubject(1, 7),
            loading: true,
        }
        this.getBooks = this.getBooks.bind(this);
    }

    setSubject = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        const num = Math.floor(Math.random() * (max - min + 1)) + min;

        console.log(num)

        switch(num) {
            case 1:
                return 'fiction'
            case 2:
                return 'science'
            case 3:
                return 'horror'
            case 4:
                return 'comics'
            case 5:
                return 'fantasy'
            case 6:
                return 'ya'
            case 7:
                return 'diy'
            default:
              return 'fiction';
          } 
    }

    getBooks = () => {
        searchBooksBySubject(this.state.subject).then(books => {
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
                    <p>Loading</p>
                    </div>
            }
        }
    }
}

export default SuggestBooks;