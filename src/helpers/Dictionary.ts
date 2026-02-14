/**
 * A dictionary class that provides O(1) key access and array-like iteration over values.
 * Wraps ES6 Map to provide a more convenient API for common frontend tasks.
 */
export class Dictionary<K, V> implements Iterable<[K, V]> {
	private _map: Map<K, V>;

	constructor(init?: Iterable<[K, V]> | Record<any, V>) {
		if (
			init &&
			typeof (init as any)[Symbol.iterator] !== "function" &&
			typeof init === "object" &&
			!Array.isArray(init)
		) {
			// Handle Record/Object input
			const entries = Object.entries(init) as unknown as [K, V][];
			// If K is number, keys will be strings here. We can't fix K at runtime safely without schema.
			// Users should use string keys with objects or Map entries for other types.
			this._map = new Map(entries);
		} else {
			this._map = new Map(init as Iterable<[K, V]>);
		}
	}

	/**
	 * Set a value by key.
	 * O(1)
	 */
	public set(key: K, value: V): this {
		this._map.set(key, value);
		return this;
	}

	/**
	 * Get a value by key.
	 * O(1)
	 */
	public get(key: K): V | undefined {
		return this._map.get(key);
	}

	/**
	 * Check if a key exists.
	 * O(1)
	 */
	public hasKey(key: K): boolean {
		return this._map.has(key);
	}

	/**
	 * Remove a value by key.
	 * O(1)
	 */
	public remove(key: K): boolean {
		return this._map.delete(key);
	}

	/**
	 * Clear the dictionary.
	 */
	public clear(): void {
		this._map.clear();
	}

	/**
	 * Get the number of items.
	 */
	public get length(): number {
		return this._map.size;
	}

	/**
	 * Iterate over values directly.
	 */
	public forEach(
		callback: (value: V, key: K, dict: Dictionary<K, V>) => void,
	): void {
		for (const [key, value] of this._map) {
			callback(value, key, this);
		}
	}

	/**
	 * Check if a value exists (iterates over all values).
	 * O(N)
	 */
	public includes(value: V): boolean {
		for (const v of this._map.values()) {
			if (v === value) return true;
		}
		return false;
	}

	/**
	 * Find a value satisfying a predicate.
	 * O(N)
	 */
	public find(predicate: (value: V, key: K) => boolean): V | undefined {
		for (const [key, value] of this._map) {
			if (predicate(value, key)) {
				return value;
			}
		}
		return undefined;
	}

	/**
	 * Filter values satisfying a predicate.
	 * Returns a new Dictionary.
	 * O(N)
	 */
	public filter(predicate: (value: V, key: K) => boolean): Dictionary<K, V> {
		const newDict = new Dictionary<K, V>();
		for (const [key, value] of this._map) {
			if (predicate(value, key)) {
				newDict.set(key, value);
			}
		}
		return newDict;
	}

	/**
	 * Map values to a generic Array.
	 * O(N)
	 */
	public map<T>(callback: (value: V, key: K) => T): T[] {
		const result: T[] = [];
		for (const [key, value] of this._map) {
			result.push(callback(value, key));
		}
		return result;
	}

	/**
	 * Returns all keys as an array.
	 */
	public keys(): K[] {
		return Array.from(this._map.keys());
	}

	/**
	 * Returns all values as an array.
	 */
	public values(): V[] {
		return Array.from(this._map.values());
	}

	/**
	 * Returns entries as an array of [key, value].
	 */
	public entries(): [K, V][] {
		return Array.from(this._map.entries());
	}

	/**
	 * Implementation of Iterable iterator
	 */
	public [Symbol.iterator](): Iterator<[K, V]> {
		return this._map.entries();
	}
}
