import React from "react";
import { Switch, Route } from "react-router-dom";
import { PrayerCard, AddressForm, MobileTextForm, ThankYou, Donations } from "./components";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/crest.png" className="App-logo" alt="logo" />
      </header>
      <Switch>
        <Route path="/" exact component={PrayerCard} />
        <Route path="/where" exact component={AddressForm} />
        <Route path="/mobile" exact component={MobileTextForm} />
        <Route path="/thankyou" exact component={ThankYou} />
        <Route path="/donate" exact component={Donations} />
      </Switch>
    </div>
  );
}

export default App;
