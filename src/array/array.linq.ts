export {};
declare global {
	interface Array<T> {
		/// Returns mapped array.
		Select<U>(selector?: (item: T) => U): U[];
		/// Returns filtered array.
		Where(predicate?: (item: T) => boolean): T[];
		Aggregate<R, U = T>(
			seed: U,
			accumulator: (acc: U, item: T) => U,
			mapper: (item: U) => R,
		): R;
		Aggregate<U = T>(seed: U, accumulator: (acc: U, item: T) => U): U;
		Aggregate<R, U = T>(
			accumulator: (acc: U, item: T) => U,
			mapper: (item: U) => R,
		): R;
		Aggregate<U = T>(accumulator: (acc: U, item: T) => U): U;
		Append(...items: T[]): T[];
		Average(this: number[]): number;
		Min(this: number[]): number;
		Max(this: number[]): number;
		Chunk(size: number): T[][];
		Distinct(this: (number | string)[]): T[];
		DistinctBy(this: object[], key: keyof T): T[];
		Except<U extends number | string>(this: U[], items: U[]): U[];
		ExceptBy(this: object[], items: Partial<T>[], key: keyof T): T[];
		GroupBy<U, R, V>(
			this: object[],
			groupingBy: (item: T) => U,
			groupRes: (item: T) => R,
			finalMap: (groupKey: U, groupValues: R[]) => V,
		): V[];
		GroupJoin<U, R, V>(
			this: object[],
			inner: U[],
			outerKeySelector: (item: T) => R,
			innerKeySelector: (item: U) => R,
			resultSelector: (outer: T, inner: U[]) => V,
		): V[];
		Intersect<U extends number | string>(this: U[], items: U[]): U[];
		Join<U, R, V>(
			this: object[],
			inner: U[],
			outerKeySelector: (item: T) => R,
			innerKeySelector: (item: U) => R,
			resultSelector: (outer: T, inner: U) => V,
		): V[];
		First(): T | undefined;
		Last(): T | undefined;
		LongCount(predicate: (item: T) => boolean): number;
		Prepend(...items: T[]): T[];
		Single(predicate?: (item: T) => boolean): T | undefined;
	}
}

if (!Array.prototype.Select) {
	Object.defineProperty(Array.prototype, "Select", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (selector) {
			return selector ? this.map(selector) : this;
		},
	});
}

if (!Array.prototype.Where) {
	Object.defineProperty(Array.prototype, "Where", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (predicate) {
			return predicate ? this.filter(predicate) : this;
		},
	});
}

if (!Array.prototype.Aggregate) {
	Object.defineProperty(Array.prototype, "Aggregate", {
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

if (!Array.prototype.Append) {
	Object.defineProperty(Array.prototype, "Append", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (...params) {
			return [...this, ...params];
		},
	});
}

if (!Array.prototype.Average) {
	Object.defineProperty(Array.prototype, "Average", {
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

if (!Array.prototype.Chunk) {
	Object.defineProperty(Array.prototype, "Chunk", {
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
if (!Array.prototype.Distinct) {
	Object.defineProperty(Array.prototype, "Distinct", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function () {
			return [...new Set(this)];
		},
	});
}
if (!Array.prototype.DistinctBy) {
	Object.defineProperty(Array.prototype, "DistinctBy", {
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
if (!Array.prototype.Except) {
	Object.defineProperty(Array.prototype, "Except", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (itemsToExclude) {
			return this.filter((item) => !itemsToExclude.includes(item));
		},
	});
}
if (!Array.prototype.ExceptBy) {
	Object.defineProperty(Array.prototype, "ExceptBy", {
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
if (!Array.prototype.GroupBy) {
	Object.defineProperty(Array.prototype, "GroupBy", {
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
if (!Array.prototype.Min) {
	Object.defineProperty(Array.prototype, "Min", {
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
if (!Array.prototype.Max) {
	Object.defineProperty(Array.prototype, "Max", {
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
if (!Array.prototype.GroupJoin) {
	Object.defineProperty(Array.prototype, "GroupJoin", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (
			inner,
			outerKeySelector,
			innerKeySelector,
			resultSelector,
		) {
			const result = [];

			for (const outer of this ?? []) {
				result.push(
					resultSelector(
						outer,
						inner.filter(
							(inner) => innerKeySelector(inner) === outerKeySelector(outer),
						),
					),
				);
			}

			return result;
		},
	});
}
if (!Array.prototype.Intersect) {
	Object.defineProperty(Array.prototype, "Intersect", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (itemsToIntersect) {
			return this.filter((item) => itemsToIntersect.includes(item));
		},
	});
}
if (!Array.prototype.Join) {
	Object.defineProperty(Array.prototype, "Join", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (
			innerArray,
			outerKeySelector,
			innerKeySelector,
			resultSelector,
		) {
			const result = [];

			for (const outer of this) {
				for (const inner of innerArray) {
					const outerKey = outerKeySelector(outer);
					const innerKey = innerKeySelector(inner);

					if (outerKey === innerKey) {
						result.push(resultSelector(outer, inner));
					}
				}
			}

			return result;
		},
	});
}
if (!Array.prototype.First) {
	Object.defineProperty(Array.prototype, "First", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function () {
			return this[0];
		},
	});
}
if (!Array.prototype.Last) {
	Object.defineProperty(Array.prototype, "Last", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function () {
			if (this.length === 0) {
				return undefined;
			}
			return this[this.length - 1];
		},
	});
}
if (!Array.prototype.LongCount) {
	Object.defineProperty(Array.prototype, "LongCount", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (filter) {
			return this.filter(filter).length;
		},
	});
}
if (!Array.prototype.Prepend) {
	Object.defineProperty(Array.prototype, "Prepend", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (...items) {
			return [...items, ...this];
		},
	});
}
if (!Array.prototype.Single) {
	Object.defineProperty(Array.prototype, "Single", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (predicate) {
			return predicate ? this.find(predicate) : this[0];
		},
	});
}
