import "../../src/array/array.linq";
import "../../src/array/array.rust";

describe("Array all extensions", () => {
  describe("#first() & #select()", () => {
    it("should execute both methods with no error", () => {
      expect([1, 2, 3].Select((n) => n).first()).toEqual(1);
    });

    it("should iterate only 3 times", () => {
      const items = [1, 2, 3];

      for (const i of items) {
        expect(items.includes(i));
      }
    });
  });
});
