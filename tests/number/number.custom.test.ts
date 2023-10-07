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
});