enum ActionType {
	Filter = 0,
	Map = 1,
	First = 2,
}

export class IEnumerable<T> {
	private stack: Array<[ActionType, (...args: any[]) => any]> = [];
	private items: T[];

	constructor(items: T[] = []) {
		this.items = items ?? [];
	}

	public Where(predicate: (item: T) => boolean = () => true): IEnumerable<T> {
		this.stack.push([ActionType.Filter, predicate]);

		return this;
	}

	public Select<U>(predicate: (item: T) => U): IEnumerable<T> {
		this.stack.push([ActionType.Map, predicate]);

		return this;
	}

	public First(predicate?: (item: T) => boolean): T | undefined {
		const callback = predicate ?? ((item) => !!item);

		this.stack.push([ActionType.First, callback]);

		return this.ToArray()[0];
	}

	public ToArray(): T[] {
		const result: T[] = [];

		let foundNeeded = false;

		for (const item of this.items) {
			let newItem = item;

			let shouldContinue = false;

			for (const [action, callback] of this.stack) {
				let shouldBreak = false;

				switch (action) {
					case ActionType.Filter: {
						shouldBreak ||= !callback(newItem);
						shouldContinue ||= shouldBreak;

						break;
					}
					case ActionType.Map: {
						newItem = callback(newItem);

						break;
					}
					case ActionType.First: {
						const isValid = callback(newItem);

						shouldBreak = true;
						shouldContinue = !isValid;
						foundNeeded ||= isValid;

						break;
					}
				}

				if (shouldBreak) {
					break;
				}
			}

			if (shouldContinue) {
				continue;
			}

			result.push(newItem);

			if (foundNeeded) {
				break;
			}
		}

		return result;
	}
}
