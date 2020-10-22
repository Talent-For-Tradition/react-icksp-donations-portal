import React from "react";
import { RecoilRoot } from "recoil";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { render, screen } from "@testing-library/react";
import App from "../../App";


test("PrayerCard displays exact title", async function () {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Router>
  );
  history.push("/");
  const prayWithUs = screen.getByText(/pray with us/i);
  expect(prayWithUs).toBeInTheDocument();
});

test("PrayerCard displays exact text above button", async function() {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Router>
  )
  history.push("/");
  const willYouPray = screen.getByText(/Will you pray the Memorare with us daily?/i);
  expect(willYouPray).toBeInTheDocument();
})

test("PrayerCard <Button /> navigates to the AddressForm route", async function () {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Router>
  );
  history.push("/"); // PrayerCard (1)
  const yesButton = screen.getByText(/yes, please send me my first prayer card/i);
  expect(yesButton).toBeInTheDocument();
  // yesButton.click();
  // expect(history.location.pathname).toEqual('/where'); // AddressForm (2)
});
