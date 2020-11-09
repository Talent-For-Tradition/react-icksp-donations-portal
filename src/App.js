import React from "react";
import { Switch, Route } from "react-router-dom";
import { PrayerCard, AddressForm, MobileTextForm, ThankYou, Donations, Checkout } from "./components";
import ProtectedRoute from "./auth/protected-route";

import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/crest.png" className="App-logo" alt="logo" />
      </header>
      <Switch>
        <ProtectedRoute path="/where"  component={AddressForm} exact={true}/>
        <ProtectedRoute path="/mobile"  component={MobileTextForm} exact={true}/>
        <ProtectedRoute path="/thankyou"  component={ThankYou} exact={true}/>
        <ProtectedRoute path="/donate"  component={Donations} exact={true}/>
        <ProtectedRoute path="/checkout" component={() => <Checkout open={true} close={()=>console.log('todo')}/>} exact={true}/>
        <ProtectedRoute path="/profile"  component={Profile} exact={true}/>
        <Route path="/"  component={PrayerCard} exact={true}/>
      </Switch>
    </div>
  );
}

export default App;
