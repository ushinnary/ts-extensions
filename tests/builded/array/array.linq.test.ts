import { initArrayLinqExtension } from "../../../dist/index";
initArrayLinqExtension();

describe("Array", () => {
	it("Trying to use array.linq.ts from build", () => {
		expect([1, 2, 3].average()).toEqual(2);
	});
});
