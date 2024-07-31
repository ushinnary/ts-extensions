import "../../../dist/array/array.custom";
import { Pair } from "../../../dist/shared/types";

describe("Array custom", () => {
	describe("mergeRanges", () => {
		it("Should left only non overlapping values for Number", () => {
			const numberPair: Pair[] = [
				[10, 20],
				[13, 14],
				[19, 25],
			];
			expect(numberPair.mergeRanges()).toMatchObject([[10, 25]]);
		});

		it("Should left only non overlapping values for String values that represent dates", () => {
			const stringPair: Pair[] = [
				["2020-05-05T12:45:00", "2024-05-05T12:45:00"],
				["2021-05-05T12:45:00", "2023-05-05T12:45:00"],
				["2018-05-05T12:45:00", "2019-05-05T12:45:00"],
			];
			expect(stringPair.mergeRanges()).toMatchObject([
				["2020-05-05T12:45:00", "2024-05-05T12:45:00"],
				["2018-05-05T12:45:00", "2019-05-05T12:45:00"],
			]);
		});

		it("Should left only non overlapping values for Date", () => {
			// In order to compare dates, it has to be the same reference
			const date2018 = new Date(2018, 5, 5, 12, 45);
			const date2019 = new Date(2019, 5, 5, 12, 45);
			const date2020 = new Date(2020, 5, 5, 12, 45);
			const date2021 = new Date(2021, 5, 5, 12, 45);
			const date2023 = new Date(2023, 5, 5, 12, 45);
			const date2024 = new Date(2024, 5, 5, 12, 45);

			const stringPair: Pair[] = [
				[date2021, date2024],
				[date2020, date2023],
				[date2018, date2019],
			];
			expect(stringPair.mergeRanges()).toMatchObject([
				[date2020, date2024],
				[date2018, date2019],
			]);
		});
	});

	describe("splitFilter", () => {
		it("Would create two arrays with items that filtered", () => {
			const entry = [...Array(100).keys()].map((i) => i + 1);
			const result = [
				entry.filter((num) => num % 2 === 0),
				entry.filter((num) => num % 2 !== 0),
			];

			expect(entry.splitFilter((num) => num % 2 === 0)).toMatchObject(
				result,
			);
		});
	});
});
