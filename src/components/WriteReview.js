import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import {getBook} from '../util/BookAPI';
import {addNewReview} from '../util/ReviewAPI';

class WriteReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book: [],
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
        return <div className="container">
            <div className="d-inline-flex">
                <form id='writeform' onSubmit={this.handleSubmit}>
                    <h2>Write review</h2>
                    <div className="mb-3">
                        <label for="reviewtitle" className="form-label">Title</label>
                        <input 
                            id="reviewtitle"
                            type="text" 
                            className="form-control"
                            name="title" 
                            label="Title"
                            value={this.state.review.title} 
                            onChange={this.handleChange} />
                    </div>

                    <div className="mb-3">
                        <label for="contenttext" className="form-label">Your review</label>
                        <textarea 
                        id="contenttext"
                        form='writeform'
                        className="form-control"
                        name='content'
                        value={this.state.review.content}
                        onChange={this.handleChange}></textarea>
                    </div>

                    <div>
                        <p>{this.state.errorMessage}</p>
                    </div>

                    <button className="btn btn-danger m-3" type="submit">Submit review</button>
                </form>
                </div>
                </div>
    }
}

export default withRouter(WriteReview);