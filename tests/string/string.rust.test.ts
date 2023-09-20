import "../../src/string/string.rust";

describe("String", () => {
	describe("#is_empty()", () => {
		it("should return true if the string is empty", () => {
			expect("".is_empty()).toBeTruthy();
			expect(" ".is_empty()).toBeFalsy();
			expect("a".is_empty()).toBeFalsy();
		});
	});

	describe("#splitOff()", () => {
		it("should return the string starting at the given index", () => {
			const str = "hello world";
			expect(str.split_off(0)).toEqual(["", "hello world"]);
			expect(str.split_off(6)).toEqual(["hello ", "world"]);
		});
	});

	describe("#chars()", () => {
		it("should return the string as an array of characters", () => {
			expect("hello".chars()).toEqual(["h", "e", "l", "l", "o"]);
		});
	});

	describe("#split_whitespace()", () => {
		it("should return the string as an array of characters", () => {
			expect("hello world".split_whitespace()).toEqual(["hello", "world"]);
		});
	});

	describe("#split_ascii_whitespace()", () => {
		it("should return the string as an array of characters", () => {
			expect(
				" Mary   had\ta\u{2009}little  \n\t lamb".split_ascii_whitespace(),
			).toEqual(["Mary", "had", "a", "little", "lamb"]);
		});
	});

	describe("#lines()", () => {
		it("should return the string as an array of characters", () => {
			expect("hello\nworld".lines()).toEqual(["hello", "world"]);
			expect("foo\r\nbar\n\nbaz\n".lines()).toEqual(["foo", "bar", "", "baz"]);
		});
	});

	describe("#is_ascii()", () => {
		it("should return true if the string is ascii", () => {
			expect("hello!\n".is_ascii()).toBeTruthy();
			expect("Grüße, Jürgen ❤".is_ascii()).toBeFalsy();
		});
	});

	describe("#eq_ignore_ascii_case()", () => {
		it("should return true if the string is ascii", () => {
			expect("hello!\n".eq_ignore_ascii_case("HELLO!\n")).toBeTruthy();
			expect(
				"Grüße, Jürgen ❤".eq_ignore_ascii_case("grüße, jürgen ❤"),
			).toBeTruthy();
			expect("Grüße, Jürgen ❤".eq_ignore_ascii_case("FERRÖS")).toBeFalsy();
		});
	});

	describe("#repeat()", () => {
		it("should repeat the string n times", () => {
			expect("hello".repeat(3)).toEqual("hellohellohello");
		});
	});
});
