import React from "react";
import { Switch, Route } from "react-router-dom";
import { PrayerCard, AddressForm, MobileTextForm, ThankYou, Donations } from "./components";
import ProtectedRoute from "./auth/protected-route";
import {AuthButton} from "./components/Authority";
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
        <AuthButton />
        </nav>
        <img src="/crest.png" className="App-logo" alt="logo" />
      </header>
      <Switch>
        <Route path="/"  component={PrayerCard} exact={true}/>
        <Route path="/where"  component={AddressForm} exact={true}/>
        <Route path="/mobile"  component={MobileTextForm} exact={true}/>
        <Route path="/thankyou"  component={ThankYou} exact={true}/>
        <Route path="/donate"  component={Donations} exact={true}/>
        <ProtectedRoute path="/profile"  component={Profile} exact={true}/>
      </Switch>
    </div>

  );
}

export default App;
