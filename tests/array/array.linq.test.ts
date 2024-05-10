import "../../src/array/array.linq";

describe("Array linq", () => {
	// Prepare data
	type Person = { name: string };
	type Pet = { name: string; owner: Person };
	const magnus = { name: "Magnus" };
	const terry = { name: "Terry" };
	const charlotte = { name: "Charlotte" };

	const people: Person[] = [magnus, terry, charlotte];

	const barley = { name: "Barley", owner: terry };
	const boots = { name: "Boots", owner: terry };
	const whiskers = { name: "Whiskers", owner: charlotte };
	const daisy = { name: "Daisy", owner: magnus };

	const pets: Pet[] = [barley, boots, whiskers, daisy];

	describe("#select()", () => {
		it("should return the mapped array", () => {
			expect([1, 2, 3].Select((n) => n + 1)).toEqual([2, 3, 4]);
		});

		it("should return the original array if no selector is provided", () => {
			expect([1, 2, 3].Select()).toEqual([1, 2, 3]);
		});
	});

	describe("#where()", () => {
		it("should return the filtered array", () => {
			expect([1, 2, 3].Where((n) => n > 1)).toEqual([2, 3]);
		});

		it("should return the original array if no predicate is provided", () => {
			expect([1, 2, 3].Where()).toEqual([1, 2, 3]);
		});
	});

	describe("#aggregate()", () => {
		it("should return the aggregated value with initial value", () => {
			expect(
				[1, 2, 3].Aggregate(1, (acc, item) => acc + item),
			).toEqual(7);
		});

		it("should return the aggregated value", () => {
			expect([1, 2, 3].Aggregate((acc, item) => acc + item)).toEqual(
				6,
			);
		});

		it("should return the aggregated value with seed", () => {
			expect(
				[1, 2, 3].Aggregate(0, (acc, item) => acc + item),
			).toEqual(6);
		});

		it("should return the aggregated value with seed and mapper", () => {
			expect(
				[1, 2, 3].Aggregate(
					0,
					(acc, item) => acc + item,
					(item) => item.toString(),
				),
			).toEqual("6");
		});
	});

	describe("#append()", () => {
		it("should return the appended array", () => {
			const arr = [1, 2, 3];
			expect(arr.Append(4, 5, 6)).toEqual([1, 2, 3, 4, 5, 6]);
			expect(arr).toEqual([1, 2, 3]);
		});
	});

	describe("#average()", () => {
		it("should return the average value", () => {
			const arr = [1, 2, 3];
			expect(arr.Average()).toEqual(2);
			expect([].Average()).toEqual(0);
			// Should show error in editor
			// expect([""].average()).toEqual(0);
		});
	});

	describe("#chunk()", () => {
		it("should return the chunked array", () => {
			expect([1, 2, 3, 4, 5].Chunk(2)).toEqual([[1, 2], [3, 4], [5]]);
		});
	});

	describe("#distinct()", () => {
		it("should return the distinct array", () => {
			expect([1, 2, 3, 4].Distinct()).toEqual([1, 2, 3, 4]);
			expect([1, 2, 2, 3, 3, 3, 4, 4, 4, 4].Distinct()).toEqual([
				1, 2, 3, 4,
			]);
			expect(
				["a", "b", "b", "c", "c", "c", "d", "d", "d", "d"].Distinct(),
			).toEqual(["a", "b", "c", "d"]);
		});
	});

	describe("#distinctBy()", () => {
		it("should return the distinct array", () => {
			expect(
				[
					{ id: 1, name: "a" },
					{ id: 2, name: "b" },
					{ id: 2, name: "c" },
					{ id: 3, name: "d" },
					{ id: 3, name: "e" },
					{ id: 3, name: "f" },
					{ id: 4, name: "g" },
					{ id: 4, name: "h" },
					{ id: 4, name: "i" },
					{ id: 4, name: "j" },
				].DistinctBy("id"),
			).toEqual([
				{ id: 1, name: "a" },
				{ id: 2, name: "b" },
				{ id: 3, name: "d" },
				{ id: 4, name: "g" },
			]);
		});
	});

	describe("#except()", () => {
		it("should return the excepted array", () => {
			expect([1, 2, 3, 4].Except([1, 2])).toEqual([3, 4]);
			expect([1, 2, 3, 4].Except([1, 2, 3, 4])).toEqual([]);
			expect(["a", "b", "c", "d"].Except(["a", "b"])).toEqual([
				"c",
				"d",
			]);
			// Should display error in IDE
			// [{}].except([])
		});
	});

	describe("#exceptBy()", () => {
		it("should return the excepted array", () => {
			expect(
				[
					{ id: 1, name: "a" },
					{ id: 2, name: "b" },
					{ id: 2, name: "c" },
					{ id: 3, name: "d" },
					{ id: 3, name: "e" },
					{ id: 3, name: "f" },
					{ id: 4, name: "g" },
					{ id: 4, name: "h" },
					{ id: 4, name: "i" },
					{ id: 4, name: "j" },
					{ id: 5, name: "o" },
				].ExceptBy(
					[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
					"id",
				),
			).toEqual([{ id: 5, name: "o" }]);
		});
	});

	describe("#groupBy()", () => {
		it("should return the grouped array", () => {
			const items = [
				{ id: 1, name: "a" },
				{ id: 2, name: "b" },
				{ id: 2, name: "c" },
				{ id: 3, name: "d" },
				{ id: 3, name: "e" },
				{ id: 3, name: "f" },
				{ id: 4, name: "g" },
				{ id: 4, name: "h" },
				{ id: 4, name: "i" },
				{ id: 4, name: "j" },
			];
			const groupedItems = items.GroupBy(
				(item) => item.id,
				(item) => item.name,
				(groupKey, groupValues) => ({
					id: groupKey,
					names: groupValues,
				}),
			);
			expect(groupedItems).toMatchObject([
				{ id: 1, names: ["a"] },
				{ id: 2, names: ["b", "c"] },
				{ id: 3, names: ["d", "e", "f"] },
				{ id: 4, names: ["g", "h", "i", "j"] },
			]);
		});
	});

	describe("#min()", () => {
		it("should return the minimum value", () => {
			expect([1, 2, 3].Min()).toEqual(1);
			expect([].Min()).toEqual(0);
			// Should show error in editor
			// expect([""].min()).toEqual(0);
		});
	});

	describe("#max()", () => {
		it("should return the maximum value", () => {
			expect([1, 2, 3].Max()).toEqual(3);
			expect([].Max()).toEqual(0);
			// Should show error in editor
			// expect([""].max()).toEqual(0);
		});
	});

	describe("#groupJoin()", () => {
		it("should return the grouped array", () => {
			const result = people.GroupJoin(
				pets,
				(person) => person,
				(pet) => pet.owner,
				(person, petCollection) => ({
					ownerName: person.name,
					pets: petCollection.Select((pet) => pet.name),
				}),
			);
			expect(result).toMatchObject([
				{
					ownerName: "Magnus",
					pets: ["Daisy"],
				},
				{
					ownerName: "Terry",
					pets: ["Barley", "Boots"],
				},
				{
					ownerName: "Charlotte",
					pets: ["Whiskers"],
				},
			]);
		});
	});

	describe("#intersect()", () => {
		it("should return the intersected array", () => {
			expect([1, 2, 3, 4].Intersect([1, 2])).toEqual([1, 2]);
			expect([1, 2, 3, 4].Intersect([1, 2, 3, 4])).toEqual([
				1, 2, 3, 4,
			]);
			expect(["a", "b", "c", "d"].Intersect(["a", "b"])).toEqual([
				"a",
				"b",
			]);
			// Should display error in IDE
			// [{}].intersect([])
		});
	});

	describe("#join()", () => {
		it("should return the joined array", () => {
			const result = people.Join(
				pets,
				(person) => person,
				(pet) => pet.owner,
				(person, pet) => ({
					ownerName: person.name,
					petName: pet.name,
				}),
			);
			expect(result.length).toBe(4);
			expect(result).toMatchObject([
				{
					ownerName: "Magnus",
					petName: "Daisy",
				},
				{
					ownerName: "Terry",
					petName: "Barley",
				},
				{
					ownerName: "Terry",
					petName: "Boots",
				},
				{
					ownerName: "Charlotte",
					petName: "Whiskers",
				},
			]);
		});
	});

	describe("#last()", () => {
		it("should return the last element", () => {
			expect([1, 2, 3].Last()).toEqual(3);
			expect([].Last()).toEqual(undefined);
		});
	});

	describe("#first()", () => {
		it("should return the first element", () => {
			expect([1, 2, 3].First()).toEqual(1);
			expect([].First()).toEqual(undefined);
		});
	});

	describe("#longCount()", () => {
		it("should return the long count", () => {
			expect([1, 2, 3].LongCount((n) => n > 2)).toEqual(1);
			expect([].LongCount((n) => n === 0)).toEqual(0);
		});
	});

	describe("#Prepend()", () => {
		it("should return the prepended array", () => {
			const arr = [1, 2, 3];
			expect(arr.Prepend(4, 5, 6)).toEqual([4, 5, 6, 1, 2, 3]);
			expect(arr).toEqual([1, 2, 3]);
		});
	});

	describe("#single()", () => {
		it("should return the single element", () => {
			expect([1, 2, 3].Single((n) => n === 2)).toEqual(2);
			expect([].Single((n) => n === 0)).toEqual(undefined);
		});
	});

	describe("#Skip()", () => {
		it("should return the skipped array", () => {
			expect([1, 2, 3, 4, 5].Skip(2)).toEqual([3, 4, 5]);
		});
	});

	describe("#SkipWhile()", () => {
		it("should return the skipped array", () => {
			expect([1, 2, 3, 4, 5].SkipWhile((n) => n < 3)).toEqual([
				3, 4, 5,
			]);
		});
	});

	describe("Sum", () => {
		it("should return the sum of all numbers in the array", () => {
			const arr = [1, 2, 3, 4, 5];
			const result = arr.Sum();
			expect(result).toEqual(15);
		});

		it("should return 0 for an empty array", () => {
			const arr: number[] = [];
			const result = arr.Sum();
			expect(result).toEqual(0);
		});
	});

	describe("#Take()", () => {
		it("should return the taken array", () => {
			expect([1, 2, 3, 4, 5].Take(2)).toEqual([1, 2]);
			expect([].Take(2)).toEqual([]);
		});
	});

	describe("#TakeWhile()", () => {
		it("should return the taken array", () => {
			expect([1, 2, 3, 4, 5].TakeWhile((n) => n < 3)).toEqual([1, 2]);
			expect([].TakeWhile((n) => n < 3)).toEqual([]);
		});
	});

	describe("#ToLookup()", () => {
		it("should return the lookup", () => {
			const lookup = people.ToLookup(
				(person) => person.name,
				(person) => person.name,
			);
			expect(lookup).toMatchObject({
				Magnus: ["Magnus"],
				Terry: ["Terry"],
				Charlotte: ["Charlotte"],
			});
		});

		it("should return the lookup by first letter", () => {
			const lookup = people.ToLookup(
				(person) => person.name[0],
				(person) => person.name,
			);
			expect(lookup).toMatchObject({
				M: ["Magnus"],
				T: ["Terry"],
				C: ["Charlotte"],
			});
		});
	});

	describe("#Union()", () => {
		it("should return the unioned array", () => {
			expect([1, 2, 3, 4].Union([1, 2])).toEqual([1, 2, 3, 4]);
			expect([1, 2, 3, 4].Union([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
			expect(["a", "b", "c", "d"].Union(["a", "b"])).toEqual([
				"a",
				"b",
				"c",
				"d",
			]);
			expect([1].Union([2])).toEqual([1, 2]);
			// Should display error in IDE
			// [{}].union([])
		});
	});
});
