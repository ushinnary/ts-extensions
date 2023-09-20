export {};
declare global {
	interface Array<T> {
		/// Returns the first element of the array.
		first(): T | undefined;
		/// Returns the last element of the array.
		last(): T | undefined;
		/// Appends the elements of the given array to the end of this array. The given array is emptied.
		append(items: T[]): T[];
		/// Removes the elements from the array and return them as a new array.
		drain(fromIdx: number, toIdx: number): T[];
		/// Removes all elements from the array.
		clear(): void;
		/// Returns true if the array is empty.
		is_empty(): boolean;
		/// Removes all but the first n elements from the array.
		split_off(at: number): T[];
		/// Resizes the array in-place so that len is the new length.
		resize_with(len: number, f?: () => T): void;
		/// Resizes the array in-place so that len is the new length.
		resize(len: number, value?: T): void;
		/// Removes consecutive repeated elements in the array.
		dedup(): void;
		remove(index: number): T;
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
if (!Array.prototype.append) {
	Object.defineProperty(Array.prototype, "append", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (others) {
			while (others.length > 0) {
				this.push(others.shift());
			}
		},
	});
}
if (!Array.prototype.drain) {
	Object.defineProperty(Array.prototype, "drain", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (fromIdx, toIdx) {
			return this.splice(fromIdx, toIdx - fromIdx + 1);
		},
	});
}
if (!Array.prototype.clear) {
	Object.defineProperty(Array.prototype, "clear", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function () {
			this.length = 0;
		},
	});
}
if (!Array.prototype.is_empty) {
	Object.defineProperty(Array.prototype, "is_empty", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function () {
			return this.length === 0;
		},
	});
}
if (!Array.prototype.split_off) {
	Object.defineProperty(Array.prototype, "split_off", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (idx) {
			return this.splice(idx, this.length - idx);
		},
	});
}
if (!Array.prototype.resize_with) {
	Object.defineProperty(Array.prototype, "resize_with", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (length, f) {
			if (length < this.length) {
				this.splice(length, this.length - length);
			} else {
				while (this.length < length) {
					this.push(f?.() ?? null);
				}
			}
		},
	});
}
if (!Array.prototype.resize) {
	Object.defineProperty(Array.prototype, "resize", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (length, value) {
			if (length < this.length) {
				this.splice(length, this.length - length);
			} else {
				while (this.length < length) {
					this.push(value ?? null);
				}
			}
		},
	});
}
if (!Array.prototype.dedup) {
	Object.defineProperty(Array.prototype, "dedup", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function () {
			for (let i = 0; i < this.length; i++) {
				if (this[i] === this[i - 1]) {
					this.splice(i, 1);
					i--;
				}
			}

			return this;
		},
	});
}
if (!Array.prototype.remove) {
	Object.defineProperty(Array.prototype, "remove", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (index) {
			return this.splice(index, 1)[0];
		},
	});
}
