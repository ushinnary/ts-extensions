import type { Pair } from "../shared/types.js";
import { mergeRanges } from "../shared/array.js";

declare global {
	interface Array<T> {
		/** Only non overlapping ranges will left */
		mergeRanges<R = string | number | Date>(this: Pair<R>[]): Pair<R>[];

		/** A better way to do .filter(true) & .filter(false) for two variables */
		splitFilter(condition: (_el: T) => boolean): [T[], T[]];
	}
}

if (!Array.prototype.mergeRanges) {
	Object.defineProperty(Array.prototype, "mergeRanges", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function () {
			return mergeRanges(this);
		},
	});
}

if (!Array.prototype.splitFilter) {
	Object.defineProperty(Array.prototype, "splitFilter", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (condition) {
			const passingValues = [];
			const negativeValues = [];

			for (const el of this) {
				if (condition(el)) {
					passingValues.push(el as never);
				} else {
					negativeValues.push(el as never);
				}
			}

			return [passingValues, negativeValues];
		},
	});
}
