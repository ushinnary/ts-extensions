import "../../src/number/number.custom";

describe("Number", () => {
	describe("removePercentage", () => {
		it("should remove percentage", () => {
			const num = 100;

			expect(num.removePercentage(10)).toBe(90);
			expect(num.removePercentage(50)).toBe(50);
			expect(num.removePercentage(100)).toBe(0);
			expect(num.removePercentage(0)).toBe(100);
		});
	});

	describe("addPercentage", () => {
		it("should add percentage", () => {
			const num = 100;

			expect(num.addPercentage(10)).toBe(110);
			expect(num.addPercentage(50)).toBe(150);
			expect(num.addPercentage(100)).toBe(200);
			expect(num.addPercentage(0)).toBe(100);
		});
	});

	describe("inBetween", () => {
		it("should return true if number is between min and max", () => {
			const num = 5;
			expect(num.inBetween(0, 10)).toBe(true);
			expect(num.inBetween(5, 10)).toBe(true);
			expect(num.inBetween(0, 5)).toBe(true);
		});

		it("should return false if number is not between min and max", () => {
			const num = 5;
			expect(num.inBetween(6, 10)).toBe(false);
			expect(num.inBetween(0, 4)).toBe(false);
		});
	});

	describe("calculatePriceForTaxes", () => {
		it("should calculate price for taxes", () => {
			const num = 4;
			expect(num.calculatePriceForTaxes(20)).toBe(5);
		});
	});

	describe("lessThan", () => {
		it("should return true if number is less than another number", () => {
			const num = 5;
			expect(num.lessThan(10)).toBe(true);
		});

		it("should return false if number is not less than another number", () => {
			const num = 5;
			expect(num.lessThan(4)).toBe(false);
		});
	});

	describe("moreThan", () => {
		it("should return true if number is greater than another number", () => {
			const num = 5;
			expect(num.moreThan(4)).toBe(true);
		});

		it("should return false if number is not greater than another number", () => {
			const num = 5;
			expect(num.moreThan(10)).toBe(false);
		});
	});

	describe("notZeroAndLessThan", () => {
		const positiveNumber = 5;
		it("should return true if number is different from zero and less than another number", () => {
			expect(positiveNumber.notZeroAndLessThan(10)).toBe(true);
		});

		it("should return false if number is not different from zero and less than another number", () => {
			expect(positiveNumber.notZeroAndLessThan(4)).toBe(false);
		});

		const zero = 0;
		it("should return false if number is zero", () => {
			expect(zero.notZeroAndLessThan(10)).toBe(false);
		});

		it("should return false if number is zero and less than another number", () => {
			expect(zero.notZeroAndLessThan(-1)).toBe(false);
		});
	});

	describe("notZeroAndMoreThan", () => {
		const positiveNumber = 5;
		it("should return true if number is different from zero and more than another number", () => {
			expect(positiveNumber.notZeroAndMoreThan(4)).toBe(true);
		});

		it("should return false if number is not different from zero and more than another number", () => {
			expect(positiveNumber.notZeroAndMoreThan(10)).toBe(false);
		});

		const zero = 0;
		it("should return false if number is zero", () => {
			expect(zero.notZeroAndMoreThan(10)).toBe(false);
		});

		it("should return false if number is zero and less than another number", () => {
			expect(zero.notZeroAndMoreThan(-1)).toBe(false);
		});
	});
});
