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
            showContent: true,
            loading: true,
        }
        this.handleChange = this.handleChange.bind(this);
        this.getReviews = this.getReviews.bind(this);
    }

    handleChange(event) {   
        
        this.setState((prev) => ({
            showContent: !prev.showContent
        }));
    }

    getBookId = () => {
        const currentLocation = window.location.href;
        const splitLocation = currentLocation.split('/');
        const bookId = splitLocation[splitLocation.length -1];
        return bookId;
    }

    getReviews(id) {
        getAllBookReviews(id).then(reviews => {
            this.setState({
              reviews,
              loading: false,
            });
          });
     }

     getContent(review) {
         if (this.state.showContent) {
             return <p>{ review.Content }</p>
         }
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
                return <div>
                    <div className="mt-3">
                        <input className="me-1" type="checkbox" id="sc" name="showContent" value={this.state.value} onClick={this.handleChange}/>
                        <label for="sc">Hide full reviews</label><br/>
                    </div>
                    <div className="p-5 w-100 flex-column">{this.state.reviews.map((review) => {
                    return <div className="mb-3 border-bottom border-dark" key={review.id}>
                    <div className="mb-3 ">
                        <div className="row">
                            <Link className="link-danger text-decoration-none" to={`/review/${review.id}`}><h3>{ review.Title } <small class="text-muted">{review.Rating}/5</small></h3></Link>
                        </div>
                        { this.getContent(review) }
                        <Link className="link-dark fw-bold" to={`/users/${review.UserID.id}`}>{ review.UserID.username }</Link>
                    </div></div>
                })}</div></div>
            } else {
                return <div>
                        <p>No reviews</p>
                    </div>
            }
        }
    }
}

export default ListReviews;