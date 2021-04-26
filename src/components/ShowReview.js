import React from 'react'
import { Link } from 'react-router-dom';
import { getSingleReview } from '../util/ReviewAPI';
import { getSingleUser} from '../util/UsersAPI';

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

    componentDidMount() {
        //const userId = localStorage.getItem('currentUser');
        const reviewId = this.getReviewId();
        this.getReview(reviewId);
    }

    render (){
        if (this.state.loading) {
            return <div>
                        <p>Loading...</p>
                    </div>
        } else {
            if (this.state.review !== null || this.state.review === undefined) {
                return <div>
                    <h3>{this.state.review.Title}</h3>
                    <p>{this.state.review.Content}</p>
                    <Link to={`/user/${this.state.user._id}`}>{this.state.user.username}</Link>
                    </div>
            } else {
                return <div>
                        <p>No review</p>
                    </div>
            }
        }
    }
}

export default ShowReview;