import "../../src/string/string.custom";

describe("String Custom", () => {
	it("should wrapBetween", () => {
		expect(
			"<b>hello</b>".wrapBetweenHtmlTags('<div class="wrapper">', "</div>"),
		).toBe('<div class="wrapper"><b>hello</b></div>');
		expect(
			"<b>hello</b>".wrapBetweenHtmlTags(
				["<div class='wrapper'>", "<div class='wrapper2'>"],
				["</div>"],
			),
		).toBe("<div class='wrapper'><div class='wrapper2'><b>hello</b></div>");
		expect(
			"<b>hello</b>".wrapBetweenHtmlTags([
				"<div class='wrapper'>",
				"<div class='wrapper2'>",
			]),
		).toBe(
			"<div class='wrapper'><div class='wrapper2'><b>hello</b></div></div>",
		);
		expect("<b>hello</b>".wrapBetweenHtmlTags("<div class='wrapper'>")).toBe(
			"<div class='wrapper'><b>hello</b></div>",
		);
	});

	it("should phoneNumberSplit", () => {
		expect("0707070707".phoneNumberSplit()).toBe("07 07 07 07 07");
		expect("".phoneNumberSplit()).toBe("");
	});
});
