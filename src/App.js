import React from 'react';
import { Switch, Route } from "react-router-dom";
import { PrayerCard } from './components'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/crest.png" className="App-logo" alt="logo" />
      </header>
      <Switch>
        <Route path="/" exact component={PrayerCard} />
      </Switch>
    </div>
  );
}

export default App;
