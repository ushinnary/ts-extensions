import { StringBuilder } from "../../dist/helpers/StringBuilder";

describe("StringBuilder", () => {
  describe("Regular with some Bolds", () => {
    const expected = "Hello <b>there</b> my friend.";
    it("Should generate a correct string at the end", () => {
      expect(
        new StringBuilder()
          .regular("Hello")
          .bS("there")
          .regularS("my friend")
          .dot()
          .build(),
      ).toEqual(expected);
    });

    it("Should generate a correct string with spaces", () => {
      expect(
        new StringBuilder()
          .regular("Hello")
          .space()
          .b("there")
          .space()
          .regular("my friend")
          .dot()
          .build(),
      ).toEqual(expected);
    });
  });
});
