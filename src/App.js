import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Header from './components/content/Header';
import Search from './views/Search';
import Login from './views/Login';
import Signup from './views/Signup';
import Profile from './views/Profile';

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
                <Search {...props} state={this.state} setUser={this.setUser} />
              )}></Route>
              <Route exact path='/login' render={(props) => (
                <Login {...props} />
              )}></Route>
              <Route exact path='/signup' render={(props) => (
                <Signup {...props} />
              )}></Route>
              <Route exact path='/profile' render={(props) => (
                <Profile {...props} />
              )}></Route>
  
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
