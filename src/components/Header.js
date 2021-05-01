import React from 'react';
import { Link, withRouter } from 'react-router-dom';

 function Header() {
     if (localStorage.getItem('token') !== null) {
        return (
            <nav className="navbar navbar-expand navbar-dark bg-danger">
                <div className='container-fluid'>
                    <Link className='navbar-brand' to='/'>BookSight</Link>
                        <div>
                            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/' >Search</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link'  to={`/users/${localStorage.getItem('currentUser')}`} >Profile</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/settings'>Settings</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/login' onClick={() => {localStorage.clear()}}>Logout</Link>
                                </li>
                            </ul>
                    </div>
                </div>
            </nav>
        )
        
     } else {
        return (
            <nav className="navbar navbar-expand navbar-dark bg-danger">
                <div className='container-fluid'>
                    <Link className='navbar-brand' to='/'>BookSight</Link>
                        <div>
                            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/' >Search</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/login' >Login</Link>
                                </li>
                            </ul>
                    </div>
                </div>
            </nav>
        )
     }
}

export default withRouter(Header);