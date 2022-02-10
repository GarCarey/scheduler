import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";

afterEach(cleanup);

describe("Appointment", () => {
  xit("renders without crashing", () => {
    render(<Appointment />);
  });

  xit("does something it is supposed to do", () => {});

  test.skip("does something it is supposed to do", () => {});
});
