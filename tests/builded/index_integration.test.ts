import { StringBuilder } from "../../dist/index";
import "../../dist/index"; // Import side effects

describe("Package Entry Point (Integration)", () => {
	it("should export StringBuilder", () => {
		expect(StringBuilder).toBeDefined();
		const sb = new StringBuilder();
		sb.regular("test");
		expect(sb.toString()).toBe("test");
	});

	it("should apply Array.prototype augmentations (Rust)", () => {
		const arr = [1, 2, 3];
		// Dynamic check because compiler might not know about the augmentation in this test file context
		// unless we include the d.ts reference or similar, but runtime check is what matters for this test.
		// @ts-ignore
		expect(arr.first).toBeDefined();
		// @ts-ignore
		expect(arr.first()).toBe(1);
	});

	it("should apply Number.prototype augmentations", () => {
		// @ts-ignore
		expect((10).inBetween(5, 15)).toBe(true);
	});

	it("should apply String.prototype augmentations", () => {
		// @ts-ignore
		expect("hello".wrapBetweenHtmlTags("<b>", "</b>")).toBe("<b>hello</b>");
		// @ts-ignore
		expect("hello".wrapBetweenHtmlTags("<b>")).toBe("<b>hello</b>");
	});
});
