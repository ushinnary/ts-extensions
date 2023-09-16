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
			expect([1, 2, 3].select((n) => n + 1)).toEqual([2, 3, 4]);
		});

		it("should return the original array if no selector is provided", () => {
			expect([1, 2, 3].select()).toEqual([1, 2, 3]);
		});
	});

	describe("#where()", () => {
		it("should return the filtered array", () => {
			expect([1, 2, 3].where((n) => n > 1)).toEqual([2, 3]);
		});

		it("should return the original array if no predicate is provided", () => {
			expect([1, 2, 3].where()).toEqual([1, 2, 3]);
		});
	});

	describe("#aggregate()", () => {
		it("should return the aggregated value with initial value", () => {
			expect([1, 2, 3].aggregate(1, (acc, item) => acc + item)).toEqual(7);
		});

		it("should return the aggregated value", () => {
			expect([1, 2, 3].aggregate((acc, item) => acc + item)).toEqual(6);
		});

		it("should return the aggregated value with seed", () => {
			expect([1, 2, 3].aggregate(0, (acc, item) => acc + item)).toEqual(6);
		});

		it("should return the aggregated value with seed and mapper", () => {
			expect(
				[1, 2, 3].aggregate(
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
			expect(arr.append(4, 5, 6)).toEqual([1, 2, 3, 4, 5, 6]);
			expect(arr).toEqual([1, 2, 3]);
		});
	});

	describe("#average()", () => {
		it("should return the average value", () => {
			const arr = [1, 2, 3];
			expect(arr.average()).toEqual(2);
			expect([].average()).toEqual(0);
			// Should show error in editor
			// expect([""].average()).toEqual(0);
		});
	});

	describe("#chunk()", () => {
		it("should return the chunked array", () => {
			expect([1, 2, 3, 4, 5].chunk(2)).toEqual([[1, 2], [3, 4], [5]]);
		});
	});

	describe("#distinct()", () => {
		it("should return the distinct array", () => {
			expect([1, 2, 3, 4].distinct()).toEqual([1, 2, 3, 4]);
			expect([1, 2, 2, 3, 3, 3, 4, 4, 4, 4].distinct()).toEqual([1, 2, 3, 4]);
			expect(
				["a", "b", "b", "c", "c", "c", "d", "d", "d", "d"].distinct(),
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
				].distinctBy("id"),
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
			expect([1, 2, 3, 4].except([1, 2])).toEqual([3, 4]);
			expect([1, 2, 3, 4].except([1, 2, 3, 4])).toEqual([]);
			expect(["a", "b", "c", "d"].except(["a", "b"])).toEqual(["c", "d"]);
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
				].exceptBy([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }], "id"),
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
			const groupedItems = items.groupBy(
				(item) => item.id,
				(item) => item.name,
				(groupKey, groupValues) => ({ id: groupKey, names: groupValues }),
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
			expect([1, 2, 3].min()).toEqual(1);
			expect([].min()).toEqual(0);
			// Should show error in editor
			// expect([""].min()).toEqual(0);
		});
	});

	describe("#max()", () => {
		it("should return the maximum value", () => {
			expect([1, 2, 3].max()).toEqual(3);
			expect([].max()).toEqual(0);
			// Should show error in editor
			// expect([""].max()).toEqual(0);
		});
	});

	describe("#groupJoin()", () => {
		it("should return the grouped array", () => {
			const result = people.groupJoin(
				pets,
				(person) => person,
				(pet) => pet.owner,
				(person, petCollection) => ({
					ownerName: person.name,
					pets: petCollection.select((pet) => pet.name),
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
			expect([1, 2, 3, 4].intersect([1, 2])).toEqual([1, 2]);
			expect([1, 2, 3, 4].intersect([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
			expect(["a", "b", "c", "d"].intersect(["a", "b"])).toEqual(["a", "b"]);
			// Should display error in IDE
			// [{}].intersect([])
		});
	});

	describe("#join()", () => {
		it("should return the joined array", () => {
			const result = people.linqJoin(
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
});
