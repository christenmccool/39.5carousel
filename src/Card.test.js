import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";

test("if renders without crashing", () => {
  render(<Card />)
})

test("if matches snapshot", () => {
  const {asFragment} = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
})
