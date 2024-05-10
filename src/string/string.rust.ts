export type {};
declare global {
	interface String {
		is_empty(): boolean;
		split_off(at: number): string[];
		chars(): string[];
		split_whitespace(): string[];
		split_ascii_whitespace(): string[];
		lines(): string[];
		is_ascii(): boolean;
		eq_ignore_ascii_case(other: string): boolean;
		repeat(times: number): string;
	}
}
if (!String.prototype.is_empty) {
	String.prototype.is_empty = function () {
		return this.valueOf().length === 0;
	};
}
if (!String.prototype.split_off) {
	String.prototype.split_off = function (index) {
		const right = this.valueOf().slice(index);
		const left = this.valueOf().slice(0, index);
		return [left, right];
	};
}
if (!String.prototype.chars) {
	String.prototype.chars = function () {
		return this.valueOf().split("");
	};
}
if (!String.prototype.split_whitespace) {
	String.prototype.split_whitespace = function () {
		return this.valueOf().split(" ");
	};
}
if (!String.prototype.split_ascii_whitespace) {
	String.prototype.split_ascii_whitespace = function () {
		return this.valueOf().trim().split(/\s+/);
	};
}
if (!String.prototype.lines) {
	String.prototype.lines = function () {
		return this.valueOf().trim().split(/\r?\n/);
	};
}
if (!String.prototype.is_ascii) {
	String.prototype.is_ascii = function () {
		// biome-ignore lint/suspicious/noControlCharactersInRegex: <explanation>
		return /^[\x00-\x7F]*$/.test(this.valueOf());
	};
}
if (!String.prototype.eq_ignore_ascii_case) {
	String.prototype.eq_ignore_ascii_case = function (other) {
		return this.valueOf().toLowerCase() === other.toLowerCase();
	};
}
if (!String.prototype.repeat) {
	String.prototype.repeat = function (nbTimes) {
		let result = "";
		for (let i = 0; i < nbTimes; i++) {
			result += this.valueOf();
		}
		return result;
	};
}
