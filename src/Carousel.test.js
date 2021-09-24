import React from "react";
import { render, fireEvent, debug } from "@testing-library/react";
import Carousel from "./Carousel";

test("if renders without crashing", () => {
  render(<Carousel />)
})

test("if matches snapshot", () => {
  const {asFragment} = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
})



test("if works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});


test("if works when you click on the left arrow", function() {
  const { queryByTestId, queryByAltText, debug } = render(<Carousel />);

  // move forward in the carousel so you are on the second slide
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  // move backward in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // // expect the first image to show, but not the second or third
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Josh Post on Unsplash")).not.toBeInTheDocument();

});

test("if no left arrow on first card", function() {
  const { queryByTestId, queryByAltText, debug } = render(<Carousel />);

  // expect to be on the first card
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();

  // expect no left arrow
  expect(queryByTestId("left-arrow")).not.toBeInTheDocument();
});

test("if no right arrow on last card", function() {
  const { queryByTestId, queryByAltText, debug } = render(<Carousel />);

  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);
  // expect to be on the third card
  expect(queryByAltText("Photo by Josh Post on Unsplash")).toBeInTheDocument();

  // expect no right arrow
  expect(queryByTestId("right-arrow")).not.toBeInTheDocument();
});