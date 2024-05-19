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

	describe("Adding new lines", () => {
		it("Should add new line with \n and build", () => {
			expect(
				new StringBuilder()
					.regular("Hello")
					.newLine()
					.regular("there")
					.build(),
			).toEqual("Hello\nthere");
		});

		it("Should add new line with <br> and build", () => {
			expect(
				new StringBuilder()
					.regular("Hello")
					.br()
					.regular("there")
					.build(),
			).toEqual("Hello<br />there");
		});

		it("Should add new line with <br> tag multiple times and build", () => {
			expect(
				new StringBuilder()
					.regular("Hello")
					.br(3)
					.regular("there")
					.build(),
			).toEqual("Hello<br /><br /><br />there");
		});
	});
});
