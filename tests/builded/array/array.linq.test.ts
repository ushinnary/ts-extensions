import "../../../dist/array/array.linq";

describe("Array", () => {
  it("Trying to use array.linq.ts from build", () => {
    expect([1, 2, 3].Average()).toEqual(2);
  });
});
