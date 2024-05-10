export type {};
declare global {
	interface Array<T> {
		/**  Returns mapped array. */
		Select<U>(selector?: (item: T) => U): U[];
		/**  Returns filtered array. */
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
		Skip(count: number): T[];
		SkipWhile(predicate: (item: T) => boolean): T[];
		Sum(this: number[]): number;
		Take(count: number): T[];
		TakeWhile(predicate: (item: T) => boolean): T[];
		ToLookup<U, R>(
			this: object[],
			groupingBy: (item: T) => U,
			groupRes: (item: T) => R,
		): Map<U, R[]>;
		Union<U extends number | string>(this: U[], items: U[]): U[];
	}
}

function defineProp<K extends keyof any[]>(
	key: K,
	value: (...args: Parameters<any[][K]>) => ReturnType<any[][K]>,
): void {
	if (!Array.prototype[key]) {
		Object.defineProperty(Array.prototype, key, {
			enumerable: false,
			writable: false,
			configurable: false,
			value,
		});
	}
}

defineProp("Select", function (selector) {
	return selector ? this.map(selector) : this;
});

defineProp("Where", function (predicate) {
	return predicate ? this.filter(predicate) : this;
});

// Exception
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
				}
				return this.reduce(params[1], params[0]);
			}
			if (params.length === 3) {
				return params[2](this.reduce(params[1], params[0]));
			}
			return this;
		},
	});
}

defineProp("Append", function (...items) {
	return [...this, ...items];
});

defineProp("Average", function () {
	if (this.length === 0) {
		return 0;
	}

	return this.reduce((acc, item) => acc + item) / this.length;
});

defineProp("Chunk", function (size) {
	return Array.from(
		{ length: Math.ceil(this.length / size) },
		(_, i) => this.slice(i * size, i * size + size),
	);
});

defineProp("Distinct", function () {
	return [...new Set(this)];
});

defineProp("DistinctBy", function (key) {
	return this.filter(
		(item, index, self) =>
			self.findIndex((i) => i[key] === item[key]) === index,
	);
});

defineProp("Except", function (itemsToExclude) {
	return this.filter((item) => !itemsToExclude.includes(item));
});

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

defineProp("Min", function () {
	return this.length === 0 ? 0 : Math.min(...this);
});

defineProp("Max", function () {
	return this.length === 0 ? 0 : Math.max(...this);
});

defineProp(
	"GroupJoin",
	function (
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
						(inner) =>
							innerKeySelector(inner) === outerKeySelector(outer),
					),
				),
			);
		}

		return result;
	},
);

defineProp("Intersect", function (itemsToIntersect) {
	return this.filter((item) => itemsToIntersect.includes(item));
});

defineProp(
	"Join",
	function (
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
);

defineProp("First", function () {
	return this[0];
});

defineProp("Last", function () {
	return this[this.length - 1];
});

defineProp("LongCount", function (filter) {
	return this.filter(filter).length;
});

defineProp("Prepend", function (...items) {
	return [...items, ...this];
});

defineProp("Single", function (predicate) {
	return predicate ? this.find(predicate) : this[0];
});

defineProp("Skip", function (num) {
	return this.slice(num);
});

defineProp("SkipWhile", function (predicate) {
	let i = 0;
	while (i < this.length && predicate(this[i])) {
		i++;
	}
	return this.slice(i);
});

defineProp("Sum", function () {
	return this.reduce((acc, item) => acc + item, 0);
});

defineProp("Take", function (nbToTake) {
	return this.slice(0, nbToTake);
});

defineProp("TakeWhile", function (predicate) {
	let i = 0;
	while (i < this.length && predicate(this[i])) {
		i++;
	}
	return this.slice(0, i);
});

if (!Array.prototype.ToLookup) {
	Object.defineProperty(Array.prototype, "ToLookup", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (groupingBy, groupRes) {
			type TKey = ReturnType<typeof groupingBy>;
			type TValue = ReturnType<typeof groupRes>;

			const initialReduceValue: Record<TKey, TValue[]> = {};
			const obj = this.reduce((acc, item) => {
				const key = groupingBy(item);
				const value = groupRes(item);

				if (!acc[key]) {
					acc[key] = [];
				}
				acc[key].push(value);

				return acc;
			}, initialReduceValue);

			return obj;
		},
	});
}

defineProp("Union", function (secondArr) {
	return [...new Set([...this, ...secondArr])];
});
