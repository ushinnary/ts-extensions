export type {};
declare global {
	interface Number {
		/**  Returns the difference between two numbers. */
		diff(num: number): number;
		/**  Returns the absolute difference between two numbers. */
		abs_diff(num: number): number;
		/**  Returns the floor of the division of two numbers. */
		div_floor(num: number): number;
		/**  Returns the ceiling of the division of two numbers. */
		div_ceil(num: number): number;
		/**  Returns the power of a number. */
		pow(num: number): number;
		/**  Returns the difference between two numbers, but never below 0. */
		saturating_sub(num: number): number;
		/**  Returns an array of numbers from the number to the given number. */
		range_up_to(num: number): number[];
		/**  Returns the minimum of the two numbers. */
		min(num: number): number;
		/**  Returns the maximum of the two numbers. */
		max(num: number): number;
		/**  Returns the number clamped between the two numbers. */
		clamp(min: number, max: number): number;
		/**  Returns an array of numbers from the number to the given number. */
		range_down_to(num: number): number[];
		/**  Returns true if the number is a power of two. */
		is_power_of_two(): boolean;
		/**  Returns the midpoint between two numbers. */
		midpoint(num: number): number;
	}
}
if (!Number.prototype.diff) {
	Number.prototype.diff = function (num) {
		return this.valueOf() - num;
	};
}
if (!Number.prototype.abs_diff) {
	Number.prototype.abs_diff = function (num) {
		return Math.abs(this.valueOf() - num);
	};
}
if (!Number.prototype.div_floor) {
	Number.prototype.div_floor = function (num) {
		return Math.floor(this.valueOf() / num);
	};
}
if (!Number.prototype.pow) {
	Number.prototype.pow = function (num) {
		return this.valueOf() ** num;
	};
}
if (!Number.prototype.saturating_sub) {
	Number.prototype.saturating_sub = function (num) {
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
if (!Number.prototype.range_up_to) {
	Number.prototype.range_up_to = function (num) {
		const nbOfElementsToGenerate = num.saturating_sub(this.valueOf() - 1);
		return [...Array(nbOfElementsToGenerate).keys()].map(
			(i) => i + this.valueOf(),
		);
	};
}
if (!Number.prototype.range_down_to) {
	Number.prototype.range_down_to = function (num) {
		const nbOfElementsToGenerate = this.valueOf().saturating_sub(num - 1);
		return [...Array(nbOfElementsToGenerate).keys()].map(
			(i) => this.valueOf() - i,
		);
	};
}
if (!Number.prototype.is_power_of_two) {
	Number.prototype.is_power_of_two = function () {
		return (this.valueOf() & (this.valueOf() - 1)) === 0;
	};
}
if (!Number.prototype.midpoint) {
	Number.prototype.midpoint = function (higherNumber: number) {
		return Math.floor((this.valueOf() + higherNumber) / 2);
	};
}
if (!Number.prototype.div_ceil) {
	Number.prototype.div_ceil = function (divisor: number) {
		return Math.ceil(this.valueOf() / divisor);
	};
}
