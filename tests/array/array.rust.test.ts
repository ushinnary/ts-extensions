import "../../src/array/array.rust";

describe("Array rust", () => {
	describe("#first()", () => {
		it("should return the first element of the array", () => {
			expect([1, 2, 3].first()).toEqual(1);
		});

		it("should return undefined if the array is empty", () => {
			expect([].first()).toBeUndefined();
		});
	});

	describe("#last()", () => {
		it("should return the last element of the array", () => {
			expect([1, 2, 3].last()).toEqual(3);
		});

		it("should return undefined if the array is empty", () => {
			expect([].last()).toBeUndefined();
		});
	});
});
