import React from 'react';
import { Link, withRouter } from 'react-router-dom';

 function Header() {
     if (localStorage.getItem('token') !== null) {
        return (
            <header>
                <h1>Header</h1>
            </header>
        )
        
     } else {
        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class='container-fluid'>
                    <a class='navbar-brand' href='/'>Book-Nav</a>
                        <div>
                            <ul class='navbar-nav me-auto mb-2 mb-lg-0'>
                                <li class='nav-item'>
                                    <Link class='nav-link' to='/' >Search</Link>
                                </li>
                                <li class='nav-item'>
                                    <Link class='nav-link' to='/profile' >Profile</Link>
                                </li>
                                <li class='nav-item'>
                                    <Link class='nav-link' to='/login' >Login</Link>
                                </li>
                            </ul>
                    </div>
                </div>
            </nav>
        )
     }
}

export default withRouter(Header);