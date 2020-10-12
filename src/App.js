import React, {useState} from "react";
import { Switch, Route } from "react-router-dom";
import { PrayerCard, AddressForm, MobileTextForm, ThankYou } from "./components";

import "./App.less";

function App() {
  const [state, setState] = useState({
    fullname: "",
    country: "",
    addr1: "",
    addr2: "",
    city: "",
    zip: "",
    state: "",
    email: ""
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src="/crest.png" className="App-logo" alt="logo" />
      </header>
      <Switch>
        <Route path="/" exact component={PrayerCard} />
        <Route path="/where" exact component={() => <AddressForm appState={[state, setState]}/>} />
        <Route path="/mobile" exact component={() => <MobileTextForm appState={[state, setState]}/>} />
        <Route path="/thankyou" exact component={() => <ThankYou appState={[state, setState]} />} />
      </Switch>
    </div>
  );
}

export default App;
