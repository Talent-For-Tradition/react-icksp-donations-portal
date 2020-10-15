import React from "react";
import { RecoilRoot } from "recoil";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { render, screen } from "@testing-library/react";
import App from "../../App";


test("Address form displays exact title", async function () {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Router>
  );
  history.push("/where");
  const whereToSend = screen.getByText(/WHERE SHOULD WE SEND YOUR FREE MEMORARE PRAYER CARDS/i);
  expect(whereToSend).toBeInTheDocument();
});

