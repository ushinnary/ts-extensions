export {};
declare global {
	interface Array<T> {
		/// Returns the first element of the array.
		first(): T | undefined;
		/// Returns the last element of the array.
		last(): T | undefined;
	}
}

if (!Array.prototype.first) {
	Object.defineProperty(Array.prototype, "first", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function () {
			return this.length > 0 ? this[0] : undefined;
		},
	});
}

if (!Array.prototype.last) {
	Object.defineProperty(Array.prototype, "last", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function () {
			return this.length > 0 ? this[this.length - 1] : undefined;
		},
	});
}
