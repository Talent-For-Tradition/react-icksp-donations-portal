import React from "react";
import { RecoilRoot } from "recoil";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { render, screen } from "@testing-library/react";
import App from "../../App";


test("ThankYou displays exact title", async function () {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Router>
  );
  history.push("/thankyou");
  const thanks = screen.getByText(/thank you/i);
  expect(thanks).toBeInTheDocument();
});

test("ThankYou displays exact text above button", async function() {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Router>
  )
  history.push("/thankyou");
  const wouldYouLike = screen.getByText(/Would you like to see the most common levels of recurring monthly support offered by members of the Restoration?/i);
  expect(wouldYouLike).toBeInTheDocument();
})

test("PrayerCard <Button /> navigates to the Donation route", async function () {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Router>
  );
  history.push("/thankyou"); // ThankYou (5)
  const yesButton = screen.getByText(/yes, please show me!/i);
  expect(yesButton).toBeInTheDocument();
  yesButton.click();
  expect(history.location.pathname).toEqual('/donate'); // Donation (6)
});
