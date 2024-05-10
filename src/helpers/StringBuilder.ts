type TDirection = "ltr" | "rtl";
/** Builder for a clearer string building. */
export class StringBuilder {
	/** Current string */
	protected result: string;

	constructor() {
		this.result = "";
	}

	/** Inserts raw text as is */
	public regular(text: string) {
		if (text) {
			this.result += text;
		}

		return this;
	}

	/** Regular with space if text is not empty */
	public regularS(text: string) {
		this._insertSpaceIfNotEmpty(text);

		return this.regular(text);
	}

	// HTML Formatting

	/** <strong> - Important text */
	public strong(text: string) {
		if (text) {
			this.result += this._wrap(text, "strong");
		}

		return this;
	}

	/** Strong with space if text is not empty */
	public strongS(text: string) {
		this._insertSpaceIfNotEmpty(text);

		return this.strong(text);
	}

	/** <b> - Bold text */
	public b(text: string) {
		if (text) {
			this.result += this._wrap(text, "b");
		}

		return this;
	}

	/** Bold with space if text is not empty */
	public bS(text: string) {
		this._insertSpaceIfNotEmpty(text);
		return this.b(text);
	}

	/** <i> - Italic text */
	public i(text: string) {
		if (text) {
			this.result += this._wrap(text, "i");
		}

		return this;
	}

	/** Italic with space if text is not empty */
	public iS(text: string) {
		this._insertSpaceIfNotEmpty(text);
		return this.i(text);
	}

	/** <em> - Emphasized text */
	public em(text: string) {
		if (text) {
			this.result += this._wrap(text, "em");
		}

		return this;
	}

	/** Emphasized with space if text is not empty */
	public emS(text: string) {
		this._insertSpaceIfNotEmpty(text);
		return this.em(text);
	}

	/** <mark> - Marked text */
	public mark(text: string) {
		if (text) {
			this.result += this._wrap(text, "mark");
		}

		return this;
	}

	/** Marked with space if text is not empty */
	public markS(text: string) {
		this._insertSpaceIfNotEmpty(text);
		return this.mark(text);
	}

	/** <small> - Smaller text */
	public small(text: string) {
		if (text) {
			this.result += this._wrap(text, "small");
		}

		return this;
	}

	/** Smaller with space if text is not empty */
	public smallS(text: string) {
		this._insertSpaceIfNotEmpty(text);
		return this.small(text);
	}

	/** <del> - Deleted text */
	public del(text: string) {
		if (text) {
			this.result += this._wrap(text, "del");
		}

		return this;
	}

	/** Deleted with space if text is not empty */
	public delS(text: string) {
		this._insertSpaceIfNotEmpty(text);
		return this.del(text);
	}

	/** <ins> - Inserted text */
	public ins(text: string) {
		if (text) {
			this.result += this._wrap(text, "ins");
		}

		return this;
	}

	/** Inserted with space if text is not empty */
	public insS(text: string) {
		this._insertSpaceIfNotEmpty(text);
		return this.ins(text);
	}

	/** <sub> - Subscript text */
	public sub(text: string) {
		if (text) {
			this.result += this._wrap(text, "sub");
		}

		return this;
	}

	/** Subscript with space if text is not empty */
	public subS(text: string) {
		this._insertSpaceIfNotEmpty(text);
		return this.sub(text);
	}

	/** <sup> - Superscript text */
	public sup(text: string) {
		if (text) {
			this.result += this._wrap(text, "sup");
		}

		return this;
	}

	/** Superscript with space if text is not empty */
	public supS(text: string) {
		this._insertSpaceIfNotEmpty(text);
		return this.sup(text);
	}

	// HTML Quotation

	/** The HTML <q> tag defines a short quotation.*/
	public q(text: string) {
		if (text) {
			this.result += this._wrap(text, "q");
		}

		return this;
	}

	/** Quotation with space if text is not empty */
	public qS(text: string) {
		this._insertSpaceIfNotEmpty(text);
		return this.q(text);
	}

	/**
	 * The HTML <abbr> tag defines an abbreviation or an acronym
	 * Like "HTML", "CSS", "Mr.", "Dr.", "ASAP", "ATM".
	 * */
	public abbr(text: string, title: string) {
		if (text && title) {
			this.result += this._wrap(text, "abbr", `title="${title}"`);
		}

		return this;
	}

	/** Abbreviation with space if text is not empty */
	public abbrS(text: string, title: string) {
		this._insertSpaceIfNotEmpty(text);
		return this.abbr(text, title);
	}

	/** The HTML <bdo> tag is used to override the current text direction */
	public bdo(text: string, dir: TDirection) {
		if (text && dir) {
			this.result += this._wrap(text, "abbr", `dir="${dir}"`);
		}

		return this;
	}

	/** Direction override with space if text is not empty */
	public bdoS(text: string, dir: TDirection) {
		this._insertSpaceIfNotEmpty(text);
		return this.bdo(text, dir);
	}

	/** If you really would need it :) */
	public space() {
		this.result += " ";

		return this;
	}

	/** Add a dot :) */
	public dot() {
		this.result += ".";

		return this;
	}

	/** Adds a <br /> tag
	 * @param [times=1] Indicate number of <br /> tag repeats
	 */
	public br(times = 1) {
		for (let i = 0; i < times; i++) {
			this.result += "<br />";
		}

		return this;
	}

	/** Adds \n for new line */
	public newLine() {
		this.result += "\n";

		return this;
	}

	/** Getting result */
	public build() {
		return this.result;
	}

	/** helper that wraps text withing tags */
	protected _wrap(text: string, tag: string, attrs?: string): string {
		if (attrs) {
			return `<${tag} ${attrs}>${text}</${tag}>`;
		}

		return `<${tag}>${text}</${tag}>`;
	}

	protected _insertSpaceIfNotEmpty(text: string) {
		if (text.trim()) {
			this.space();
		}
	}
}
