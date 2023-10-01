export {};
declare global {
	interface Number {
		// Subtract percentage from number
		removePercentage(percent: number): number;
		// Add percentage to number
		addPercentage(percent: number): number;
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
