enum ActionType {
  Filter = 0,
  Map = 1,
  First = 2,
}

export class IEnumerable<T> {
  private stack: Array<[ActionType, (...args: any[]) => any]> = [];
  private items: T[];

  constructor(
    items: T[] = [],
    stack?: Array<[ActionType, (...args: any[]) => any]>,
  ) {
    this.items = items ?? [];
    this.stack = stack ?? [];
  }

  public Where(predicate: (item: T) => boolean = () => true): IEnumerable<T> {
    this.stack.push([ActionType.Filter, predicate]);

    return this;
  }

  public Select<U>(predicate: (item: T) => U): IEnumerable<U> {
    this.stack.push([ActionType.Map, predicate]);

    return new IEnumerable(this.items as unknown as U[], this.stack);
  }

  public Sum(this: IEnumerable<number>): number {
    return this.ToArray().reduce((total, curr) => total + curr, 0);
  }

  public First(predicate?: (item: T) => boolean): T | undefined {
    this.stack.push([ActionType.First, predicate ?? ((item) => !!item)]);

    return this.ToArray()[0];
  }

  public ToArray(): T[] {
    const result: T[] = [];

    outer: for (const item of structuredClone(this.items)) {
      let newItem = item;

      inner: for (const [action, callback] of this.stack) {
        switch (action) {
          case ActionType.Filter: {
            if (!callback(newItem)) {
              continue outer;
            }

            break;
          }
          case ActionType.Map: {
            newItem = callback(newItem);
            continue inner;
          }
          case ActionType.First: {
            const isValid = callback(newItem);

            if (isValid) {
              return [newItem];
            }

            continue outer;
          }
        }
      }

      result.push(newItem);
    }

    return result;
  }
}
