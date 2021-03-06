import React from "react";
import { RecoilRoot } from "recoil";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { render, screen } from "@testing-library/react";
import App from "../../App";

// import the Auth0 hook
import { useAuth0 } from "@auth0/auth0-react";
// intercept the useAuth0 function and mock it
jest.mock("@auth0/auth0-react");
// create a dummy user profile
const user = {
  email: "johndoe@me.com",
  email_verified: true,
  sub: "google-oauth2|2147627834623744883746"
};
describe("AddressForm tests", () => {
  beforeEach(() => {
    // Mock the Auth0 hook and make it return a logged in state
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
  });

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
    const whereToSend = screen.getByText(
      /WHERE SHOULD WE SEND YOUR FREE MEMORARE PRAYER CARDS/i
    );
    expect(whereToSend).toBeInTheDocument();
  });

  test("AddressForm input validation, empty field test : fullname", async function () {
    const history = createMemoryHistory();
    const { getAllByPlaceholderText } = render(
      <Router history={history}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </Router>
    );
    history.push("/where");
    // const submitButton = screen.getByRole("button");
    const fullname = getAllByPlaceholderText(/john smith/i)[0];
    expect(fullname.name).toEqual("fullname"); // make sure we have the right element
    expect(fullname.style.border).toEqual(""); // no border exists at this time
    // submitButton.click(); // click the submit button while the field is empty
    // expect(fullname.style.border).toEqual('2px solid red') // a red border appears
  });

  test("AddressForm input validation, empty field test : fullname", async function () {
    const history = createMemoryHistory();
    const { getByPlaceholderText } = render(
      <Router history={history}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </Router>
    );
    history.push("/where");
    // fullname.value = 'john smith'
    // const fullname = getByPlaceholderText(/john smith/i);
    // const fullname = await screen.findByText('#fullname');
    // console.log(fullname)
    // const country = getByDisplayValue(/select country/i);
    // const submitButton = screen.getByRole("button");

    // const submitButton = screen.getByText("SUBMIT");
    const addr1 = getByPlaceholderText(/address line 1/i);
    expect(addr1.name).toEqual("addr1"); // make sure we have the right element
    expect(addr1.style.border).toEqual(""); // no border exists at this time
    // test error
    // submitButton.click(); // click the submit button while the field is empty
    // expect(addr1.style.border).toEqual('2px solid red') // a red border appears
  });
});
