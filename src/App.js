import React, { Component } from 'react';
import './App.css';
import {Route , Switch} from 'react-router-dom';
import Principal from './Principal';
import Morpion from './Morpion';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/MorpionEleveEdenSchool' component={Morpion}></Route>
          <Route exact path='/' component={Principal}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
