// const React = require("react");
// const Dashboard = require("../../../components/dashboard/Dashboard");
// const { shalow } = require("enzyme");
import React from "react";
import Dashboard from "../../../components/dashboard/Dashboard";
import { shalow } from "enzyme";

describe("Dashborad component", () => {
  it("first test", () => {
    const wrapper = shallow(<Dashboard />);
    const dashboardState = wrapper.state();
    expect(dashboardState).toEqual();
  });
});
