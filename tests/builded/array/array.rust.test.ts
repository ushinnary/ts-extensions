import "../../../dist/array/array.rust";

describe("Array", () => {
	it("Trying to use array.rust.ts from build", () => {
		expect([1, 2, 3].first()).toEqual(1);
	});
});
