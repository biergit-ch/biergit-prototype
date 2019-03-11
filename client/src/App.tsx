import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import GroupList from './GroupList';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Biergit</h1>
        </header>
        <p className="App-intro">
          Hello fellow biergitter
        </p>
        <GroupList />
      </div>
    );
  }
}

export default App;
