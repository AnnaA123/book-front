import React from 'react'
import SearchBooks from './SearchBooks';

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
        }
    }

    handleTitleSearch = (event) => {
        event.preventDefault();
        console.log('searching ' + this.state.searchTitle);

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
        return <div>
            <form onSubmit={this.handleTitleSearch} className="d-flex">
                <input 
                    className="form-control me-2" 
                    type="search" 
                    placeholder="Search by Title" 
                    name='searchTitle'
                    value={this.state.searchTitle} 
                    onChange={this.handleChange}/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>

            {this.searchResults()}
            
        </div>
    }
}

export default BookSearch;