import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import App from "./App";

test("includes our Lord Jesus Christ", async function() {
  try {
    const {getByText} = await render(<App />, {wrapper: MemoryRouter});
    expect(getByText(/our Lord Jesus Christ/i)).toBeInTheDocument();
  } catch {
    throw(Error('bad test?'))
  }
});

test("logo exists", async function() {
  try {
    const {getByAltText} = await render(<App />, {wrapper: MemoryRouter});
    expect(getByAltText(/logo/i)).toBeInTheDocument();
  } catch {
    throw(Error('bad test?'))
  }
})

test("logo source file is crest.png", async function() {
  try {
    const {getByAltText} = await render(<App />, {wrapper: MemoryRouter});
    expect(getByAltText(/logo/i).src.split('/').pop()).toEqual('crest.png')
  } catch {
    throw(Error())
  }
})

