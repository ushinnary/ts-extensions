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
		/** Replaces text from index to index */
		replaceBetween(start: number, end: number, word: string): string;
		/** Replaces all occurences
		 * If inclusive param specified, so it will combine all overlapping matchs for one occurence
		 * Example: In the text "Texte" we want to wrap words "text" and "exte", so we will return combination of both, meaning the whole word "Texte"
		 * */
		replaceAllCombined(
			words: string[],
			replacer: (matchedWord: string) => string,
		): string;
		replaceAllCombined(
			words: string[],
			replacer: (matchedWord: string) => string,
			isCaseInsensetive: boolean,
		): string;
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

if (!String.prototype.replaceBetween) {
	String.prototype.replaceBetween = function (start, end, text) {
		return this.substring(0, start) + text + this.substring(end);
	};
}

if (!String.prototype.replaceAllCombined) {
	String.prototype.replaceAllCombined = function (
		words,
		replacer,
		isCaseInsensetive = true,
	) {
		if (!words.length) {
			return this;
		}

		const formatedWords = isCaseInsensetive
			? words.map((w) => w.toLowerCase())
			: words;

		const formatedSelf = isCaseInsensetive
			? this.toLowerCase()
			: this;
		const hash: Record<string, number[]> = formatedSelf
			.split("")
			.filter(Boolean)
			.reduce(
				(dict, letter, index) => {
					if (!(letter in dict)) {
						dict[letter] = [];
					}

					dict[letter].push(index);

					return dict;
				},
				{} as Record<string, number[]>,
			);

		const allOccurences = [];

		for (const word of formatedWords) {
			const [firstLetter, ...letters] = word.split("");

			if (!(firstLetter in hash)) {
				break;
			}

			const allIndexes: number[] = hash[firstLetter];

			idxLoop: for (const id of allIndexes) {
				let lastId: number = id;

				for (const letter of letters) {
					const nextId = (hash[letter] || []).find(
						(currId) => currId === lastId + 1 && currId !== lastId,
					);

					if (!nextId || lastId === nextId) {
						continue idxLoop;
					}

					lastId = nextId;
				}

				allOccurences.unshift([id, lastId]);
			}
		}

		let index = -1;

		for (const current of allOccurences) {
			++index;

			let existingOccurence = allOccurences.find(
				([start, end], idx) =>
					end >= current[0] && start <= current[1] && idx !== index,
			);

			while (existingOccurence) {
				current[0] = Math.min(current[0], existingOccurence[0]);
				current[1] = Math.max(current[1], existingOccurence[1]);

				allOccurences.splice(
					allOccurences.indexOf(existingOccurence),
					1,
				);

				existingOccurence = allOccurences.find(
					([start, end], idx) =>
						end >= current[0] && start <= current[1] && idx !== index,
				);
			}
		}

		let result = this;

		for (const [startId, endId] of allOccurences) {
			result = result.replaceBetween(
				startId,
				endId + 1,
				replacer(this.substring(startId, endId + 1)),
			);
		}

		return result;
	};
}
