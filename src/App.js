import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Header from './components/Header';
import Search from './views/Search';
import Login from './views/Login';
import Signup from './views/Signup';
import Profile from './views/Profile';
import Book from './views/Book';
import NewReview from './views/NewReview';
import Review from './views/Review';
import Settings from './views/Settings';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }

  // set the user in the state
  setUser = (user) => {
    this.setState({ user });
  }
  
  render () {
    return (
      <div className="App">
        <div className='container'>

          <Router basename=''>
            <Header />
            <Switch>
              <Route exact path='/' render={(props) => (
                <Search {...props}   />
              )}></Route>
              <Route exact path='/login' render={(props) => (
                <Login {...props} state={this.state} setUser={this.setUser}/>
              )}></Route>
              <Route exact path='/signup' render={(props) => (
                <Signup {...props} />
              )}></Route>
              <Route exact path='/users/:id' render={(props) => (
                <Profile {...props} />
              )}></Route>
              <Route exact path='/book/:id' render={(props) => (
                <Book {...props} />
              )}></Route>
              <Route exact path='/write/:id' render={(props) => (
                <NewReview {...props} />
              )}></Route>
              <Route exact path='/review/:id' render={(props) => (
                <Review {...props} />
              )}></Route>
              <Route exact path='/settings' render={(props) => (
                <Settings {...props} />
              )}></Route>
  
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
