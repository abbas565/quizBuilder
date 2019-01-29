import functions from "../../components/functions";

test("2+2 have to be 4", () => {
  expect(functions.add(2, 2)).toBe(4);
});
