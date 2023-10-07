export {};
declare global {
	interface Number {
		/** Subtract percentage from number */
		removePercentage(percent: number): number;
		/** Add percentage to number */
		addPercentage(percent: number): number;
		/** Check if number is between two numbers */
		inBetween(min: number, max: number): boolean;
		/** Shows new price with taxes calculated. Ex: 4€ with 20% = 5€ */
		calculatePriceForTaxes(percent: number): number;
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
