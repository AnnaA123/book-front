import React from 'react'
import SearchBooks from './SearchBooks';

 class BookSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            toggle: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    // toggler for updating the search results
    toggler() {
        this.setState(prevState => ({ toggle: !prevState.toggle }));
    }

    searchResults = () => {
        if (this.state.toggle) {
            return <div><SearchBooks sQuery={this.state.searchQuery}/></div>
        }
    }

    handleSearch(event) {
        event.preventDefault();
        console.log('searching ' + this.state.searchQuery);

        this.toggler();
        
    }

    handleChange = (event) => {
        event.preventDefault();
        const val = event.target.value;

        this.setState(() => ({
            toggle: false,
            searchQuery: val
        }));
    }

    render (){
        return <div>
            <form onSubmit={this.handleSearch} className="d-flex">
                <input 
                    className="form-control me-2" 
                    type="search" 
                    placeholder="Search by Title" 
                    value={this.state.searchQuery} 
                    onChange={this.handleChange}/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>

            {this.searchResults()}
            
        </div>
    }
}

export default BookSearch;