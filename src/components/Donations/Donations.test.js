import React from "react";
import { RecoilRoot } from "recoil";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { render, screen } from "@testing-library/react";
import App from "../../App";


test("Donations displays exact title", async function () {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Router>
  );
  history.push("/donate");
  const joinOurFamily = screen.getByText(/JOIN OUR FAMILY OF MONTHLY DONORS SPREADING THE REIGN OF OUR LORD JESUS CHRIST IN ALL SPHERES OF HUMAN LIFE./i);
  expect(joinOurFamily).toBeInTheDocument();
});

test("Donate displays exact text above buttons", async function() {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Router>
  )
  history.push("/donate");
  const chooseAmount = screen.getByText(/Choose an amount to give per month/i);
  expect(chooseAmount).toBeInTheDocument();
})

test("Donate displays exact text below buttons", async function() {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Router>
  )
  history.push("/donate");
  const chooseAmount = screen.getByText(/You can adjust or cancel your recurring donation at anytime/i);
  expect(chooseAmount).toBeInTheDocument();
})

test("<Button />(s) exist for 20, 40, 60, 80, & other amount", async function () {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Router>
  );
  history.push("/donate"); // ThankYou (5)
  const twenty = screen.getByText(/20 USD/i);
  const forty = screen.getByText(/40 USD/i);
  const sixty = screen.getByText(/60 USD/i);
  const eighty = screen.getByText(/80 USD/i);
  const otherAmt = screen.getByText(/Other Amount/i);

  expect(twenty).toBeInTheDocument();
  expect(forty).toBeInTheDocument();
  expect(sixty).toBeInTheDocument();
  expect(eighty).toBeInTheDocument();
  expect(otherAmt).toBeInTheDocument();
});
