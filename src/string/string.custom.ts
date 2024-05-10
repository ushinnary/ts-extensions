export type {};
declare global {
	interface String {
		/**Imaging having html stuff in our string
		 * like: <b>hello</b>
		 * and we want to wrap it with something
		 * like: <div class="wrapper"> <b>hello</b> </div>
		 */
		wrapBetweenHtmlTags(start: string, end?: string): string;
		wrapBetweenHtmlTags(start: string[], end?: string[]): string;
		/**  Shows phone number in a readable way */
		/**  0707070707 => 07 07 07 07 07 */
		phoneNumberSplit(): string;
	}
}

if (!String.prototype.wrapBetweenHtmlTags) {
	String.prototype.wrapBetweenHtmlTags = function (
		textToPrepend,
		textToAppend,
	) {
		// If textToAppend is empty, we have to determine the correct end of tag
		if (Array.isArray(textToPrepend)) {
			if (Array.isArray(textToAppend)) {
				return textToPrepend.join("") + this + textToAppend.join("");
			}
			if (!textToAppend) {
				const ending = textToPrepend.map((tag) => {
					const endTag = tag.replace("<", "</");
					return endTag.replace(/(<\/\w+).*$/g, "$1>");
				});
				return textToPrepend.join("") + this + ending.join("");
			}
			return textToPrepend.join("") + this + textToAppend;
		}
		if (!textToAppend) {
			const ending = textToPrepend.replace("<", "</");
			return (
				textToPrepend + this + ending.replace(/(<\/\w+).*$/g, "$1>")
			);
		}
		return textToPrepend + this + textToAppend;
	};
}

if (!String.prototype.phoneNumberSplit) {
	String.prototype.phoneNumberSplit = function () {
		return this.replace(
			/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g,
			"$1 $2 $3 $4 $5",
		);
	};
}
