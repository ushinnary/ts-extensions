import "../../src/string/string.custom";

describe("String Custom", () => {
	it("should wrapBetween", () => {
		expect(
			"<b>hello</b>".wrapBetweenHtmlTags(
				'<div class="wrapper">',
				"</div>",
			),
		).toBe('<div class="wrapper"><b>hello</b></div>');
		expect(
			"<b>hello</b>".wrapBetweenHtmlTags(
				["<div class='wrapper'>", "<div class='wrapper2'>"],
				["</div>"],
			),
		).toBe(
			"<div class='wrapper'><div class='wrapper2'><b>hello</b></div>",
		);
		expect(
			"<b>hello</b>".wrapBetweenHtmlTags([
				"<div class='wrapper'>",
				"<div class='wrapper2'>",
			]),
		).toBe(
			"<div class='wrapper'><div class='wrapper2'><b>hello</b></div></div>",
		);
		expect(
			"<b>hello</b>".wrapBetweenHtmlTags("<div class='wrapper'>"),
		).toBe("<div class='wrapper'><b>hello</b></div>");
	});

	it("should phoneNumberSplit", () => {
		expect("0707070707".phoneNumberSplit()).toBe("07 07 07 07 07");
		expect("".phoneNumberSplit()).toBe("");
	});

	it("Replace all occurencies with overlap case-insensetive", () => {
		expect(
			"Simple texte about something".replaceAllCombined(
				["mp", "simp", "imple", "mp", "te", "text", "exte"],
				(word) => `<mark>${word}</mark>`,
			),
		).toBe("<mark>Simple</mark> <mark>texte</mark> about something");
	});

	it("Replace all occurencies with overlap case-sensetive", () => {
		expect(
			"Simple texte about something".replaceAllCombined(
				["mp", "simp", "imple", "mp", "te", "text", "exte"],
				(word) => `<mark>${word}</mark>`,
				false,
			),
		).toBe("S<mark>imple</mark> <mark>texte</mark> about something");
	});
});
