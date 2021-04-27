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
              review,
              loading: false,
              edits: review.Content,
            });
            console.log(review);
            this.getUser(review.UserID);
            this.getBookData(review.BookID);
            if (localStorage.getItem('currentUser') === review.UserID){
                this.setState({
                    viewerWriter: true,
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
        const n = this.state.user.findIndex(x => x._id === id);
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
            Content: this.state.edits
        }

        editReview(data, this.state.review._id, localStorage.getItem('token'))
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

        deleteReview(this.state.review._id, localStorage.getItem('token')).then(response => {
            if (response.error !== undefined) {
                console.log(response.error);
            } else {
                console.log('deleted ' + JSON.stringify(this.props));
                this.props.history.push(`/user/${localStorage.getItem('currentUser')}`);
            }
        })
    }

    // if editing, review content will be editable through a form
    contentView = () => {
        if (this.state.editing) {
            return <div>
                <form id='editform' onSubmit={this.reviewEdit}>
                    <textarea 
                    form='editform'
                    name='edits'
                    value={this.state.edits}
                    onChange={this.handleChange}></textarea>

                    <button type='submit'>Save</button>
                </form>
            </div>
        } else {
            return <div><p>{this.state.review.Content}</p></div>
        }
    }

    // edit and delete buttons (only visible for the user who wrote the review)
    editRemoveBtn = () => {
        if (this.state.viewerWriter) {
            return <div>
                <button onClick={this.handleEditBtn}>Edit review</button>
                <button onClick={this.handleDelete}>Delete review</button>
                </div>
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
                return <div>
                    <div>
                    <Link to={`/book/${this.state.book.id}`}><h2>{this.state.book.volumeInfo.title}</h2></Link>
                    </div>
                    <div>
                        <h3>{this.state.review.Title}</h3>
                        {this.contentView()}
                        <Link to={`/user/${this.state.user._id}`}>{this.state.user.username}</Link>
                    </div>
                        {this.editRemoveBtn()}
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