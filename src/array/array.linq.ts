export {};
declare global {
	interface Array<T> {
		/// Returns mapped array.
		select<U>(selector?: (item: T) => U): U[];
		/// Returns filtered array.
		where(predicate?: (item: T) => boolean): T[];
		aggregate<R, U = T>(
			seed: U,
			accumulator: (acc: U, item: T) => U,
			mapper: (item: U) => R,
		): R;
		aggregate<U = T>(seed: U, accumulator: (acc: U, item: T) => U): U;
		aggregate<R, U = T>(
			accumulator: (acc: U, item: T) => U,
			mapper: (item: U) => R,
		): R;
		aggregate<U = T>(accumulator: (acc: U, item: T) => U): U;
		append(...items: T[]): T[];
		average(this: number[]): number;
		min(this: number[]): number;
		max(this: number[]): number;
		chunk(size: number): T[][];
		distinct(this: (number | string)[]): T[];
		distinctBy(this: object[], key: keyof T): T[];
		except<U extends number | string>(this: U[], items: U[]): U[];
		exceptBy(this: object[], items: Partial<T>[], key: keyof T): T[];
		groupBy<U, R, V>(
			this: object[],
			groupingBy: (item: T) => U,
			groupRes: (item: T) => R,
			finalMap: (groupKey: U, groupValues: R[]) => V,
		): V[];
	}
}

if (!Array.prototype.select) {
	Object.defineProperty(Array.prototype, "select", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (selector) {
			return selector ? this.map(selector) : this;
		},
	});
}

if (!Array.prototype.where) {
	Object.defineProperty(Array.prototype, "where", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (predicate) {
			return predicate ? this.filter(predicate) : this;
		},
	});
}

if (!Array.prototype.aggregate) {
	Object.defineProperty(Array.prototype, "aggregate", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (...params) {
			if (params.length === 1) {
				return this.reduce(params[0]);
			}
			if (params.length === 2) {
				if (typeof params[0] === "function") {
					return params[1](this.reduce(params[0]));
				} else {
					return this.reduce(params[1], params[0]);
				}
			}
			if (params.length === 3) {
				return params[2](this.reduce(params[1], params[0]));
			}
			return this;
		},
	});
}

if (!Array.prototype.append) {
	Object.defineProperty(Array.prototype, "append", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (...params) {
			return [...this, ...params];
		},
	});
}

if (!Array.prototype.average) {
	Object.defineProperty(Array.prototype, "average", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function () {
			if (this.length === 0) {
				return 0;
			}

			return this.reduce((acc, item) => acc + item) / this.length;
		},
	});
}

if (!Array.prototype.chunk) {
	Object.defineProperty(Array.prototype, "chunk", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (size) {
			return Array.from({ length: Math.ceil(this.length / size) }, (_, i) =>
				this.slice(i * size, i * size + size),
			);
		},
	});
}
if (!Array.prototype.distinct) {
	Object.defineProperty(Array.prototype, "distinct", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function () {
			return [...new Set(this)];
		},
	});
}
if (!Array.prototype.distinctBy) {
	Object.defineProperty(Array.prototype, "distinctBy", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (key) {
			return this.filter(
				(item, index, self) =>
					self.findIndex((i) => i[key] === item[key]) === index,
			);
		},
	});
}
if (!Array.prototype.except) {
	Object.defineProperty(Array.prototype, "except", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (itemsToExclude) {
			return this.filter((item) => !itemsToExclude.includes(item));
		},
	});
}
if (!Array.prototype.exceptBy) {
	Object.defineProperty(Array.prototype, "exceptBy", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (itemsToExclude, key) {
			return this.filter(
				(item) => !itemsToExclude.some((i) => i[key] === item[key]),
			);
		},
	});
}
if (!Array.prototype.groupBy) {
	Object.defineProperty(Array.prototype, "groupBy", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (groupBy, groupRes, finalMap) {
			type TKey = ReturnType<typeof groupBy>;
			type TValue = ReturnType<typeof groupRes>;
			type RecordValue = { key: TKey; values: TValue[] };

			const initialReduceValue: Record<string, RecordValue> = {};
			const obj = this.reduce((acc, item) => {
				const key = groupBy(item);
				const value = groupRes(item);
				if (!acc[key]) {
					acc[key] = { key, values: [] };
				}
				acc[key].values.push(value);
				return acc;
			}, initialReduceValue);
			return Object.values(obj).map(({ key, values }: RecordValue) =>
				finalMap(key, values),
			);
		},
	});
}
if (!Array.prototype.min) {
	Object.defineProperty(Array.prototype, "min", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function () {
			if (this.length === 0) {
				return 0;
			}
			return Math.min(...this);
		},
	});
}
if (!Array.prototype.max) {
	Object.defineProperty(Array.prototype, "max", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function () {
			if (this.length === 0) {
				return 0;
			}
			return Math.max(...this);
		},
	});
}
