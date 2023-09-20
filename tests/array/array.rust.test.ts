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

	describe("#append()", () => {
		it("should append the elements of the given array to the end of this array", () => {
			const array = [1, 2, 3];
			const toEmptyArr = [4, 5, 6];
			array.append(toEmptyArr);
			expect(array).toEqual([1, 2, 3, 4, 5, 6]);
			expect(toEmptyArr).toEqual([]);
		});
	});

	describe("#drain()", () => {
		it("should remove the elements from the array and return them as a new array", () => {
			const array = [1, 2, 3, 4, 5, 6];
			const drained = array.drain(1, 4);
			expect(array).toEqual([1, 6]);
			expect(drained).toEqual([2, 3, 4, 5]);
		});
	});

	describe("#clear()", () => {
		it("should remove all elements from the array", () => {
			const array = [1, 2, 3, 4, 5, 6];
			array.clear();
			expect(array).toEqual([]);
		});
	});

	describe("#is_empty()", () => {
		it("should return true if the array is empty", () => {
			expect([].is_empty()).toBe(true);
		});

		it("should return false if the array is not empty", () => {
			expect([1, 2, 3].is_empty()).toBe(false);
		});
	});

	describe("#split_off()", () => {
		it("should remove all elements after the given index and return them as a new array", () => {
			const array = [1, 2, 3, 4, 5, 6];
			const split = array.split_off(3);
			expect(array).toEqual([1, 2, 3]);
			expect(split).toEqual([4, 5, 6]);
		});
	});

	describe("#resize_with()", () => {
		it("should resize the array to the given length", () => {
			const array = [1, 2, 3, 4, 5, 6];
			array.resize_with(3);
			expect(array).toEqual([1, 2, 3]);
		});

		it("should fill the array with the result of the given function", () => {
			const array = [1, 2, 3, 4, 5, 6];
			array.resize_with(8, () => 0);
			expect(array).toEqual([1, 2, 3, 4, 5, 6, 0, 0]);
		});
	});

	describe("#resize()", () => {
		it("should resize the array to the given length", () => {
			const array = [1, 2, 3, 4, 5, 6];
			array.resize(3);
			expect(array).toEqual([1, 2, 3]);
		});

		it("should fill the array with the given value", () => {
			const array = [1, 2, 3, 4, 5, 6];
			array.resize(8, 0);
			expect(array).toEqual([1, 2, 3, 4, 5, 6, 0, 0]);
		});
	});

	describe("#dedup()", () => {
		it("should remove consecutive duplicate elements from the array", () => {
			const array = [1, 1, 2, 3, 3, 3, 4, 5, 5, 2];
			array.dedup();
			expect(array).toEqual([1, 2, 3, 4, 5, 2]);
		});
	});

	describe("#remove()", () => {
		it("should remove the element at the given index and return it", () => {
			const array = [1, 2, 3, 4, 5, 6];
			const removed = array.remove(3);
			expect(array).toEqual([1, 2, 3, 5, 6]);
			expect(removed).toEqual(4);
		});
	});
});
