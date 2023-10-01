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
});
