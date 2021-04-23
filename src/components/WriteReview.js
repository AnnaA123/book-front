import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import {getBook} from '../util/BookAPI';
import {addNewReview} from '../util/ReviewAPI';

class WriteReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book: {
                id: 'XbxwDQAAQBAJ',
                volumeInfo: {title: "Muumit ja suuri tuhotulva"}
            },
            review: {
                title: '',
                content: '',
            },
            errorMessage: '',
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getBookId = () => {
        const currentLocation = window.location.href;
        const splitLocation = currentLocation.split('/');
        const bookId = splitLocation[splitLocation.length -1];
        return bookId;
    }

    getBookInfo = (id) => {
        getBook(id).then(info => {
            if (info !== undefined) {
                this.setState({
                    book: info,
                })
            } else {
                console.log('Error retrieving book.')
            }
        })
    }
    
    handleChange(event) {   
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState((prevState) => ({
            review: {
                ...prevState.review,
                [name]: value,
            },
        }));
    }

    handleSubmit = (event) => {
        event.preventDefault();

        console.log('state rn: ' + JSON.stringify(this.state));

        const review = {
            BookID: this.state.book.id,
            UserID: localStorage.getItem('currentUser'),
            BookTitle: this.state.book.volumeInfo.title,
            Title: this.state.review.title,
            Content: this.state.review.content
        }

        addNewReview(review, localStorage.getItem('token')).then(sentReview => {
            if (sentReview.error !== undefined) {
                console.log('ERROR ' + sentReview.error);
            } else {
                this.props.history.push(`/book/${this.state.book.id}`);
            }
        })
    }

    componentDidMount = () => {
        const bookid = this.getBookId();
        this.getBookInfo(bookid);
    }

    render () {
        return <div>
                <h2>Write review</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={this.state.username} 
                        onChange={this.handleChange} />
                    <label>Your review</label>
                    <input 
                        type="text" 
                        name="content"
                        value={this.state.email} 
                        onChange={this.handleChange} />

                    <div>
                        <p>{this.state.errorMessage}</p>
                    </div>

                    <button type="submit">Submit review</button>
                </form>
                </div>
    }
}

export default withRouter(WriteReview);