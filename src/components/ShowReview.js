import React from 'react'
import { Link } from 'react-router-dom';
import { getSingleReview } from '../util/ReviewAPI';
import { getSingleUser} from '../util/UsersAPI';
import { getBook } from '../util/BookAPI';

// TEST
 class ShowReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            review: [],
            user: [],
            book: [],
            loading: true,
        }
        this.getReview = this.getReview.bind(this);
    }

    getReviewId = () => {
        const currentLocation = window.location.href;
        const splitLocation = currentLocation.split('/');
        const reviewId = splitLocation[splitLocation.length -1];
        console.log('review REVIEWDÌD ' + reviewId)
        return reviewId;
    }

    getReview(id) {
        getSingleReview(id).then(review => {
            this.setState({
              review,
              loading: false,
            });
            console.log(review);
            this.getUser(review.UserID);
            this.getBookData(review.BookID);
          });
     }

     // userinfo
     getUser = (id) => {
        if (this.state.review !== undefined) {
           getSingleUser(id).then(user => {
               this.setState((prev) => ({
                   user
               }))
               console.log('USER SET')
           })
        } else {
            console.log('oops')
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

    componentDidMount() {
        //const userId = localStorage.getItem('currentUser');
        const reviewId = this.getReviewId();
        this.getReview(reviewId);
    }

    //   <Link to={`/book/${this.state.book.id}`}>  {this.state.book.volumeInfo.title}

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
                        <p>{this.state.review.Content}</p>
                        <Link to={`/user/${this.state.user._id}`}>{this.state.user.username}</Link>
                    </div></div>
            } else {
                return <div>
                        <p>Loading...</p>
                    </div>
            }
        }
    }
}

export default ShowReview;