import "../../src/array/array.linq";
import { IEnumerable } from "../../src/array/array.linq.lazy";

describe("Array linq lazy", () => {
  const numArrayUntilSix = [1, 2, 3, 4, 5, 6];
  describe("Filter only", () => {
    it("Should filter items in array", () => {
      const expected = [2, 4, 6];

      expect(
        new IEnumerable(numArrayUntilSix)
          .Where((num) => num % 2 === 0)
          .ToArray(),
      ).toStrictEqual(expected);
    });
  });

  describe("Filter and get sum of numbers", () => {
    it("Should sum all items for number array", () => {
      expect(
        new IEnumerable(numArrayUntilSix).Where((num) => num % 2 === 0).Sum(),
      ).toEqual(12);
    });
  });

  describe("First after filter and map", () => {
    it("Pick first corresponding with Where", () => {
      const expected = 2;

      expect(
        new IEnumerable(numArrayUntilSix).Where((num) => num % 2 === 0).First(),
      ).toStrictEqual(expected);
    });

    it("Pick first corresponding with First only", () => {
      const expected = 2;

      expect(
        new IEnumerable(numArrayUntilSix).First((num) => num % 2 === 0),
      ).toStrictEqual(expected);
    });

    it("Return undefined cause not found", () => {
      expect(
        new IEnumerable(numArrayUntilSix).First((num) => num % 2 === 9),
      ).toBeUndefined();
    });
  });
});
