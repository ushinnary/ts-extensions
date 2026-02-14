import { Dictionary } from "../../src/helpers/Dictionary";

describe("Dictionary", () => {
	it("should initialize with values", () => {
		const dict = new Dictionary<string, number>([
			["one", 1],
			["two", 2],
		]);
		expect(dict.get("one")).toBe(1);
		expect(dict.get("two")).toBe(2);
		expect(dict.length).toBe(2);
	});

	it("should initialize with object", () => {
		const dict = new Dictionary<string, number>({
			one: 1,
			two: 2,
		});
		expect(dict.get("one")).toBe(1);
		expect(dict.get("two")).toBe(2);
		expect(dict.length).toBe(2);
	});

	it("should set and get values", () => {
		const dict = new Dictionary<string, number>();
		dict.set("one", 1);
		expect(dict.get("one")).toBe(1);
		expect(dict.hasKey("one")).toBe(true);
		expect(dict.hasKey("two")).toBe(false);
	});

	it("should remove values", () => {
		const dict = new Dictionary<string, number>();
		dict.set("one", 1);
		expect(dict.remove("one")).toBe(true);
		expect(dict.hasKey("one")).toBe(false);
		expect(dict.remove("one")).toBe(false);
	});

	it("should iterate values with forEach", () => {
		const dict = new Dictionary<string, number>([
			["one", 1],
			["two", 2],
		]);
		const keys: string[] = [];
		const values: number[] = [];
		dict.forEach((value, key) => {
			keys.push(key);
			values.push(value);
		});
		expect(keys).toEqual(["one", "two"]);
		expect(values).toEqual([1, 2]);
	});

	it("should find values", () => {
		const dict = new Dictionary<string, number>({
			one: 1,
			two: 2,
			three: 3,
		});
		expect(dict.find((v) => v > 2)).toBe(3);
		expect(dict.find((v) => v === 1)).toBe(1);
		expect(dict.find((v) => v > 10)).toBeUndefined();
	});

	it("should map values", () => {
		const dict = new Dictionary<string, number>({
			one: 1,
			two: 2,
		});
		const result = dict.map((v) => v * 2);
		expect(result).toEqual([2, 4]);
	});

	it("should filter values", () => {
		const dict = new Dictionary<string, number>({
			one: 1,
			two: 2,
			three: 3,
		});
		const filtered = dict.filter((v) => v >= 2);
		expect(filtered.length).toBe(2);
		expect(filtered.get("two")).toBe(2);
		expect(filtered.get("three")).toBe(3);
		expect(filtered.get("one")).toBeUndefined();
	});

	it("should allow includes check", () => {
		const dict = new Dictionary<string, number>({
			one: 1,
			two: 2,
		});
		expect(dict.includes(1)).toBe(true);
		expect(dict.includes(3)).toBe(false);
	});

	it("should allow clear", () => {
		const dict = new Dictionary<string, number>({
			one: 1,
		});
		dict.clear();
		expect(dict.length).toBe(0);
		expect(dict.get("one")).toBeUndefined();
	});
});
