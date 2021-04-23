import React from 'react'
import { Link } from 'react-router-dom';
import { getAllBookReviews } from '../util/ReviewAPI';
import { getSingleUser } from '../util/UsersAPI';

// for /views/Book.js
 class ListReviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            users: [],
            loading: true,
        }
        this.getReviews = this.getReviews.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    getBookId = () => {
        const currentLocation = window.location.href;
        const splitLocation = currentLocation.split('/');
        const bookId = splitLocation[splitLocation.length -1];
        console.log('review BOOKID ' + bookId)
        return bookId;
    }

    getReviews(id) {
        getAllBookReviews(id).then(reviews => {
            this.setState({
              reviews,
              loading: false,
            });
            // userinfo abt reviews
            reviews.map((review) => {
                return this.getUser(review.UserID);
            })
          });
        
     }

     // get username 
     getUser = (id) => {
         if (this.state.reviews[0] !== undefined) {
            getSingleUser(id).then(user => {
                this.setState((prev) => ({
                    users: [...prev.users, user]
                }))
            })
         } else {
             console.log('oops')
             setTimeout(this.getUser(id), 1000);
         }
     }

     findUser = (id) => {
         const n = this.state.users.findIndex(x => x._id === id);
         const u = this.state.users[n];

         if(u === undefined) {
             return '';
         } else {
            return u.username;
         }
     }

     handleClick(event) {
        event.preventDefault();

        console.log('!!!!!!!!!!!!!!!!! ' + JSON.stringify(this.state.users));
    }

    componentDidMount() {
        const bookId = this.getBookId();
        this.getReviews(bookId);
    }

    render (){
        if (this.state.loading) {
            return <div>
                        <p>Loading...</p>
                    </div>
        } else {
            if (this.state.reviews[0] !== undefined) {
                return this.state.reviews.map((review) => {
                    return <div key={review._id}>
                    <div>
                        <h3>{ review.Title }</h3>
                        <p>{ review.Content }</p>
                        <Link to={`/user/${review.UserID}`}>{ this.findUser(review.UserID) }</Link>
                    </div>
                    <button onClick={this.handleClick}>test</button></div>
                });
            } else {
                return <div>
                        <p>No reviews</p>
                    </div>
            }
        }
    }
}

export default ListReviews;