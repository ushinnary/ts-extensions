import "../../src/number/number.rust";

describe("Number", () => {
	describe("#diff()", () => {
		it("should return the difference between two numbers", () => {
			expect((5).diff(3)).toEqual(2);
			expect((5).diff(13)).toEqual(-8);
		});
	});

	describe("#absDiff()", () => {
		it("should return the absolute difference between two numbers", () => {
			expect((5).abs_diff(3)).toEqual(2);
			expect((3).abs_diff(5)).toEqual(2);
		});
	});

	describe("#divFloor()", () => {
		it("should return the floor of the division of two numbers", () => {
			expect((5).div_floor(3)).toEqual(1);
			expect((5).div_floor(13)).toEqual(0);
		});
	});

	describe("#pow()", () => {
		it("should return the power of a number", () => {
			expect((5).pow(3)).toEqual(125);
			expect((5).pow(0)).toEqual(1);
		});
	});

	describe("#saturatingSub()", () => {
		it("should return the difference between two numbers, but never below 0", () => {
			expect((5).saturating_sub(3)).toEqual(2);
			expect((5).saturating_sub(13)).toEqual(0);
		});
	});

	describe("#min()", () => {
		it("should return the minimum of the two numbers", () => {
			expect((5).min(3)).toEqual(3);
			expect((5).min(13)).toEqual(5);
		});
	});

	describe("#max()", () => {
		it("should return the maximum of the two numbers", () => {
			expect((5).max(3)).toEqual(5);
			expect((5).max(13)).toEqual(13);
		});
	});

	describe("#clamp()", () => {
		it("should return the number clamped between the two numbers", () => {
			expect((5).clamp(3, 7)).toEqual(5);
			expect((5).clamp(7, 13)).toEqual(7);
			expect((5).clamp(0, 3)).toEqual(3);
		});
	});

	describe("#rangeUpTo()", () => {
		it("should return an array of numbers from the number to the given number", () => {
			expect((5).range_up_to(3)).toEqual([]);
			expect((5).range_up_to(5)).toEqual([5]);
			expect((5).range_up_to(13)).toEqual([5, 6, 7, 8, 9, 10, 11, 12, 13]);
		});
	});

	describe("#rangeDownTo()", () => {
		it("should return an array of numbers from the number to the given number", () => {
			expect((5).range_down_to(3)).toEqual([5, 4, 3]);
			expect((5).range_down_to(5)).toEqual([5]);
			expect((5).range_down_to(13)).toEqual([]);
		});
	});
});
