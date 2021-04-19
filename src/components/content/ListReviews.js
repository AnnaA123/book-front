import React from 'react'
import { Link } from 'react-router-dom';
import { getAllReviews } from '../util/ReviewAPI';

 class ListReviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            loading: true,
        }
        this.getReviews = this.getReviews.bind(this);
    }

    getReviews() {
        getAllReviews().then(reviews => {
            this.setState({
              reviews,
              loading: false,
            });
          });
     }

    componentDidMount() {
        //const userId = localStorage.getItem('currentUser');
        this.getReviews();
    }

    render (){
        if (this.state.loading) {
            return <div>
                        <p>Loading</p>
                    </div>
        } else {
            if (this.state.reviews[0] !== undefined) {
                return this.state.reviews.map((review) => {
                    return <div key={review._id}><Link to={`/review/${review._id}`} key={review._id}> 
                    <div>
                        <p>{ review.title }</p>
                    </div></Link></div>
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