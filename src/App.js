import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  onMount(){
    db.Article.create({
    title:"test",
    link: "testing.html",
    game: "Overwatch",
    description: "testing this a lot",
    note:["first note"]

  }).then(alert("article created?"));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
