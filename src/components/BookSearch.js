import React from 'react'
import SearchBooks from './SearchBooks';
import SuggestBooks from './SuggestBooks';

// search bar at /views/Search.js for searching books from google api
 class BookSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTitle: '',
            byAuthor: false,
            toggle: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleTitleSearch = this.handleTitleSearch.bind(this);
    }

    // update the search results
    toggler = () => {
        this.setState(prevState => ({ toggle: !prevState.toggle }));
    }

    searchResults = () => {
        if (this.state.toggle) {
            return <div><SearchBooks sTitle={this.state.searchTitle}/></div>
        } else {
            return <SuggestBooks/>
        }
    }

    handleTitleSearch = (event) => {
        event.preventDefault();
        this.setState(prevState => ({ byAuthor: false }));
        this.toggler();
    }

    handleChange = (event) => {
        event.preventDefault();
        const val = event.target.value;

        this.setState(() => ({
            toggle: false,
            searchTitle: val,
        }));
    }

    render (){
        return <div className="container">
            <div className="d-inline-flex">
            <form onSubmit={this.handleTitleSearch}>
            <div className="row g-3 align-items-center mt-1">
                <div className="col-auto">
                    <label for="searchTitle" className="col-form-label">Search for books</label>
                    </div>
                    <div className="col-auto">
                    <input 
                        className="form-control" 
                        type="search" 
                        placeholder="Search" 
                        name='searchTitle'
                        value={this.state.searchTitle} 
                        onChange={this.handleChange}/>
                </div>
                <div className="col-auto">
                <button className="btn btn-outline-danger" type="submit">Search</button>
                </div></div>
            </form>
            </div>
            <div className="mt-3">
                {this.searchResults()}
            </div>
        </div>
    }
}

export default BookSearch;