export {};
declare global {
	interface Number {
		/// Returns the difference between two numbers.
		diff(num: number): number;
		/// Returns the absolute difference between two numbers.
		absDiff(num: number): number;
		/// Returns the floor of the division of two numbers.
		divFloor(num: number): number;
		/// Returns the power of a number.
		pow(num: number): number;
		/// Returns the difference between two numbers, but never below 0.
		saturatingSub(num: number): number;
		/// Returns an array of numbers from the number to the given number.
		rangeUpTo(num: number): number[];
		/// Returns the minimum of the two numbers.
		min(num: number): number;
		/// Returns the maximum of the two numbers.
		max(num: number): number;
		/// Returns the number clamped between the two numbers.
		clamp(min: number, max: number): number;
		/// Returns an array of numbers from the number to the given number.
		rangeDownTo(num: number): number[];
	}
}
if (!Number.prototype.diff) {
	Number.prototype.diff = function (num) {
		return this.valueOf() - num;
	};
}
if (!Number.prototype.absDiff) {
	Number.prototype.absDiff = function (num) {
		return Math.abs(this.valueOf() - num);
	};
}
if (!Number.prototype.divFloor) {
	Number.prototype.divFloor = function (num) {
		return Math.floor(this.valueOf() / num);
	};
}
if (!Number.prototype.pow) {
	Number.prototype.pow = function (num) {
		return this.valueOf() ** num;
	};
}
if (!Number.prototype.saturatingSub) {
	Number.prototype.saturatingSub = function (num) {
		return Math.max(this.valueOf() - Math.abs(num), 0);
	};
}
if (!Number.prototype.min) {
	Number.prototype.min = function (num) {
		return Math.min(this.valueOf(), num);
	};
}
if (!Number.prototype.max) {
	Number.prototype.max = function (num) {
		return Math.max(this.valueOf(), num);
	};
}
if (!Number.prototype.clamp) {
	Number.prototype.clamp = function (min, max) {
		return Math.min(Math.max(this.valueOf(), min), max);
	};
}
if (!Number.prototype.rangeUpTo) {
	Number.prototype.rangeUpTo = function (num) {
		const nbOfElementsToGenerate = num.saturatingSub(this.valueOf() - 1);
		return [...Array(nbOfElementsToGenerate).keys()].map(
			(i) => i + this.valueOf(),
		);
	};
}
if (!Number.prototype.rangeDownTo) {
	Number.prototype.rangeDownTo = function (num) {
		const nbOfElementsToGenerate = this.valueOf().saturatingSub(num - 1);
		return [...Array(nbOfElementsToGenerate).keys()].map(
			(i) => this.valueOf() - i,
		);
	};
}
