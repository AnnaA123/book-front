import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { getSingleReview, editReview, deleteReview } from '../util/ReviewAPI';
import { getSingleUser} from '../util/UsersAPI';
import { getBook } from '../util/BookAPI';

// TEST
 class ShowReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            review: [],
            edits: '',
            Rating: 0,
            user: [],
            book: [],
            viewerWriter: false,
            editing: false,
            loading: true,
        }
        this.handleChange = this.handleChange.bind(this);
        this.getReview = this.getReview.bind(this);
        this.reviewEdit = this.reviewEdit.bind(this);
        this.handleEditBtn = this.handleEditBtn.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleChange(event) {   
        const value = event.target.value;
        const name = event.target.name;

        this.setState((prevState) => ({
            [name]: value
        }));
    }

    getReviewId = () => {
        const currentLocation = window.location.href;
        const splitLocation = currentLocation.split('/');
        const reviewId = splitLocation[splitLocation.length -1];
        return reviewId;
    }

    getReview(id) {
        getSingleReview(id).then(review => {
            this.setState({
              review: review,
              loading: false,
            });
            this.getUser(review.UserID.id);
            this.getBookData(review.BookID);
            if (localStorage.getItem('currentUser') === review.UserID.id){
                this.setState({
                    viewerWriter: true,
                    edits: review.Content,
                })
            }
          });
     }

     // userinfo
     getUser = (id) => {
        if (this.state.review !== undefined) {
           getSingleUser(id).then(user => {
               this.setState((prev) => ({
                   user
               }))
           })
        } else {
            setTimeout(this.getUser(id), 1000);
        }
    }

    findUser = (id) => {
        const n = this.state.user.findIndex(x => x.id === id);
        const u = this.state.user[n];

        if(u === undefined) {
            return '';
        } else {
           return u.username;
        }
    }

    getBookData = (id) => {
        getBook(id).then(book => {
            if (book !== undefined) {
                this.setState({
                    book
                })
            } else {
                console.log('Error retrieving book.')
            }
        })
    }

    //  edit review (with token)
    reviewEdit = (event) => {
        event.preventDefault();

        const data = {
            Title: this.state.review.Title,
            Content: this.state.edits,
            Rating: this.state.Rating
        }

        editReview(data, this.state.review.id)
        .then((response) => {
            if(response.error !== undefined) {
                console.log(response.error);
            } else {
                window.location.reload();
            }
        })
    }

    handleEditBtn = (event) => {
        event.preventDefault();
        this.setState({editing: !this.state.editing});
    }
    
    //  delete review (with token)
    handleDelete = (event) => {
        event.preventDefault();

        deleteReview(this.state.review.id, localStorage.getItem('token')).then(response => {
            if (response.error !== undefined) {
                console.log(response.error);
            } else {
                this.props.history.push(`/users/${localStorage.getItem('currentUser')}`);
            }
        })
    }

    // if editing, review content will be editable through a form
    contentView = () => {
        if (this.state.editing) {
            return <div className="d-flex flex-column">
                <form id='editform' onSubmit={this.reviewEdit}>
                    <div className="col-auto">
                        <input className="me-1" type="radio" id="rate1" name="Rating" value="1" onChange={this.handleChange}/>
                        <label className="me-3" for="rate1">1</label>
                        <input className="me-1" type="radio" id="rate2" name="Rating" value="2" onChange={this.handleChange}/>
                        <label className="me-3" for="rate2">2</label>
                        <input className="me-1" type="radio" id="rate3" name="Rating" value="3" onChange={this.handleChange}/>
                        <label className="me-3" for="rate3">3</label>
                        <input className="me-1" type="radio" id="rate4" name="Rating" value="4" onChange={this.handleChange}/>
                        <label className="me-3" for="rate4">4</label>
                        <input className="me-1" type="radio" id="rate5" name="Rating" value="5" onChange={this.handleChange}/>
                        <label className="me-3" for="rate5">5</label><br/>
                    </div>
                    <div className="input-group mb-3">
                    <textarea 
                    id='reviewediting'
                    form='editform'
                    className="form-control mt-3"
                    name='edits'
                    value={this.state.edits}
                    onChange={this.handleChange}></textarea>
                    </div>

                    <button className="btn btn-danger m-3" type='submit'>Save</button>
                </form>
            </div>
        } else {
            return <div>
                <p>{this.state.review.Rating}/5</p>
                <p>{this.state.review.Content}</p>
                <Link className="link-dark fw-bold" to={`/users/${this.state.review.UserID.id}`}>{this.state.review.UserID.username}</Link>
                </div>
        }
    }

    // edit and delete buttons (only visible for the user who wrote the review)
    editBtn = () => {
        if (this.state.viewerWriter && this.state.editing === false) {
            return <div>
                <button className="btn btn-danger m-3" onClick={this.handleEditBtn}>Edit review</button>
                </div>
        }
    }

    deleteBtn = () => {
        if (this.state.viewerWriter) {
            return <div><button className="btn btn-danger mt-5 m-3" onClick={this.handleDelete}>Delete review</button></div>
    }}

    showCover = (book) => {
        if (book.volumeInfo.imageLinks !== undefined){
           return <img className="mt-3" src={ book.volumeInfo.imageLinks.thumbnail } alt={book.volumeInfo.title}/>
        } else {
            return <p className="mt-3 mb-3">No image available</p>
        }
    }

    showBookAuthors = (book) => {
        if (book.volumeInfo.authors !== undefined) {
            return <div>{book.volumeInfo.authors.map((author) => {
                return <p>{author}</p>
            })}</div>
        }
    }

    componentDidMount() {
        const reviewId = this.getReviewId();
        this.getReview(reviewId);
    }

    render (){
        if (this.state.loading) {
            return <div>
                        <p>Loading...</p>
                    </div>
        } else {
            if (this.state.review.Title !== undefined && this.state.book.volumeInfo !== undefined) {
                return <div className="d-flex flex-row">
                    <div>
                    <div className="p-2 m-3">
                        {this.showCover(this.state.book)}
                        <Link className="link-danger text-decoration-none" to={`/book/${this.state.book.id}`}><h2>{this.state.book.volumeInfo.title}</h2></Link>
                        {this.showBookAuthors(this.state.book)}
                        {this.deleteBtn()}
                    </div>
                </div>
                    <div className="p-5 w-100">
                        <h3>{this.state.review.Title}</h3>
                        {this.contentView()}
                        
                        {this.editBtn()}
                    </div>
                        
                    </div>
            } else {
                return <div>
                        <p>Loading...</p>
                    </div>
            }
        }
    }
}

export default withRouter(ShowReview);