export type {};
declare global {
	interface Number {
		/** Subtract percentage from number
		 * Ex: 100 - 20% = 80
		 * @param percent Percentage to remove
		 */
		removePercentage(percent: number): number;
		/** Add percentage to number */
		addPercentage(percent: number): number;
		/** Check if number is between two numbers */
		inBetween(min: number, max: number): boolean;
		/** Shows new price with taxes calculated. Ex: 4€ with 20% = 5€ */
		calculatePriceForTaxes(percent: number): number;
		/** Check if number is less than another number
		 * Usable for cases when number is probably null
		 * and we want to check if it's less than another number
		 * @param num Number to compare with
		 */
		lessThan(num: number): boolean;
		/** Check if number is greater than another number */
		moreThan(num: number): boolean;
		/** Check if number is different from zero and less than another number */
		notZeroAndLessThan(num: number): boolean;
		/** Check if number is different from zero and more than another number */
		notZeroAndMoreThan(num: number): boolean;
		/**
		 * Creates a new range from the number
		 * Ex: 2048.toOffsetRange(-10, 10) // [2038, 2058];
		 * */
		toOffsetRange(from: number, to: number): [number, number];
		/** Includes all entries from the range */
		toOffsetRangeInclusive(from: number, to: number): number[];
	}
}

if (!Number.prototype.removePercentage) {
	Number.prototype.removePercentage = function (percent) {
		return this - (this * percent) / 100;
	};
}

if (!Number.prototype.addPercentage) {
	Number.prototype.addPercentage = function (percent) {
		return this + (this * percent) / 100;
	};
}

if (!Number.prototype.inBetween) {
	Number.prototype.inBetween = function (min, max) {
		return this >= min && this <= max;
	};
}

if (!Number.prototype.calculatePriceForTaxes) {
	Number.prototype.calculatePriceForTaxes = function (percent) {
		return this / (1 - percent * 0.01);
	};
}

if (!Number.prototype.lessThan) {
	Number.prototype.lessThan = function (num) {
		return this < num;
	};
}

if (!Number.prototype.moreThan) {
	Number.prototype.moreThan = function (num) {
		return this > num;
	};
}

if (!Number.prototype.notZeroAndLessThan) {
	Number.prototype.notZeroAndLessThan = function (num) {
		return this !== 0 && this < num;
	};
}

if (!Number.prototype.notZeroAndMoreThan) {
	Number.prototype.notZeroAndMoreThan = function (num) {
		return this !== 0 && this > num;
	};
}

if (!Number.prototype.toOffsetRange) {
	Number.prototype.toOffsetRange = function (from, to) {
		if (from > to) return [this, this];

		return [this + from, this + to];
	};
}

if (!Number.prototype.toOffsetRangeInclusive) {
	Number.prototype.toOffsetRangeInclusive = function (from, to) {
		const arr = [];

		for (let i = this + from; i <= this + to; i++) {
			arr.push(i);
		}

		return arr;
	};
}
