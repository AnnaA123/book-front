import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Search from './views/Search';

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
            <Switch>
              <Route exact path='/' render={(props) => (
                <Search {...props} state={this.state} setUser={this.setUser} />
              )}></Route>
  
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
