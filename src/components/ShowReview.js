import React from 'react'
import { Link } from 'react-router-dom';
import { getSingleReview } from '../util/ReviewAPI';

// TEST
 class ShowReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            review: [],
            loading: true,
        }
        this.getReview = this.getReview.bind(this);
    }

    getBookId = () => {
        const currentLocation = window.location.href;
        const splitLocation = currentLocation.split('/');
        const bookId = splitLocation[splitLocation.length -1];
        console.log('review BOOKID ' + bookId)
        return bookId;
    }

    getReview(id) {
        getSingleReview('608178d513d7983924aaba5e').then(review => {
            this.setState({
              review,
              loading: false,
            });
          });
     }

    componentDidMount() {
        //const userId = localStorage.getItem('currentUser');
        const bookId = this.getBookId();
        this.getReview(bookId);
    }

    render (){
        if (this.state.loading) {
            return <div>
                        <p>Loading...</p>
                    </div>
        } else {
            if (this.state.review[0] !== undefined) {
                return <div><p>{this.state.reviews.Title}</p></div>
            } else {
                return <div>
                        <p>No review</p>
                    </div>
            }
        }
    }
}

export default ShowReview;