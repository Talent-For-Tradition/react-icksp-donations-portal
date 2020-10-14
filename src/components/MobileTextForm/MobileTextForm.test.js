import React from "react";
import { RecoilRoot } from "recoil";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { render, screen } from "@testing-library/react";
import App from "../../App";


test("MobileTextForm displays exact text", async function () {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Router>
  );
  history.push("/mobile");
  const mobileReminders = screen.getByText(/send my daily reminder at/i);
  expect(mobileReminders).toBeInTheDocument();
});

// todo: test submit button.