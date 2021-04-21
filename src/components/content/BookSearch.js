import React from 'react'
import SearchBooks from './SearchBooks';

 class BookSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: null,
        }
    }

    doSearch = () => {
        console.log('searching time');
    }

    handleSearch(event) {
        event.prevetDefault();
        this.doSearch();
    }

    render (){
        return <div>
            <form onSubmit={this.handleSearch} className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>

            <SearchBooks />
        </div>
    }
}

export default BookSearch;