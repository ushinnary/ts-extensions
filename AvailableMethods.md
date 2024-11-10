# All extensions

## Array

### Linq

- [x] `Where(predicate?: (item: T) => boolean): T[];`
- [x] `Append(...items: T[]): T[];`
- [x] `Average(this: number[]): number;`
- [x] `Min(this: number[]): number;`
- [x] `Max(this: number[]): number;`
- [x] `Chunk(size: number): T[][];`
- [x] `Distinct(this: (number | string)[]): T[];`
- [x] `DistinctBy(this: object[], key: keyof T): T[];`
- [x] `ExceptBy(this: object[], items: Partial<T>[], key: keyof T): T[];`
- [x] `First(): T | undefined;`
- [x] `Last(): T | undefined;`
- [x] `LongCount(predicate: (item: T) => boolean): number;`
- [x] `Prepend(...items: T[]): T[];`
- [x] `Single(predicate?: (item: T) => boolean): T | undefined;`
- [x] `Skip(count: number): T[];`
- [x] `SkipWhile(predicate: (item: T) => boolean): T[];`
- [x] `Sum(this: number[]): number;`
- [x] `Take(count: number): T[];`
- [x] `TakeWhile(predicate: (item: T) => boolean): T[];`

### Rust

- [x] `first(): T | undefined;`
- [x] `last(): T | undefined;`
- [x] `append(items: T[]): T[];`
- [x] `drain(fromIdx: number, toIdx: number): T[];`
- [x] `clear(): void;`
- [x] `is_empty(): boolean;`
- [x] `split_off(at: number): T[];`
- [x] `resize_with(len: number, f?: () => T): void;`
- [x] `resize(len: number, value?: T): void;`
- [x] `dedup(): void;`
- [x] `remove(index: number): T;`
- [x] `retain(f: (item: T) => boolean): void;`

## Number

### Rust

- [x] `diff(num: number): number;`
- [x] `abs_diff(num: number): number;`
- [x] `div_floor(num: number): number;`
- [x] `div_ceil(num: number): number;`
- [x] `pow(num: number): number;`
- [x] `saturating_sub(num: number): number;`
- [x] `range_up_to(num: number): number[];`
- [x] `min(num: number): number;`
- [x] `max(num: number): number;`
- [x] `clamp(min: number, max: number): number;`
- [x] `range_down_to(num: number): number[];`
- [x] `is_power_of_two(): boolean;`
- [x] `midpoint(num: number): number;`

### Custom

- [x] `removePercentage(percent: number): number;`
- [x] `addPercentage(percent: number): number;`
- [x] `inBetween(min: number, max: number): boolean;`
- [x] `calculatePriceForTaxes(percent: number): number;`
- [x] `lessThan(num: number): boolean;`
- [x] `moreThan(num: number): boolean;`
- [x] `notZeroAndLessThan(num: number): boolean;`
- [x] `notZeroAndMoreThan(num: number): boolean;`
- [x] `toOffsetRange(from: number, to: number): [number, number];`
- [x] `toOffsetRangeInclusive(from: number, to: number): number[];`

## String

### Rust

- [x] `is_empty(): boolean;`
- [x] `split_off(at: number): string[];`
- [x] `chars(): string[];`
- [x] `split_whitespace(): string[];`
- [x] `split_ascii_whitespace(): string[];`
- [x] `lines(): string[];`
- [x] `is_ascii(): boolean;`
- [x] `eq_ignore_ascii_case(other: string): boolean;`
- [x] `repeat(times: number): string;`

### Custom

- [x] `wrapBetweenHtmlTags(start: string, end?: string): string;`
- [x] `wrapBetweenHtmlTags(start: string[], end?: string[]): string;`
- [x] `phoneNumberSplit(): string;`
- [x] `replaceBetween(start: number, end: number, word: string): string;`

