import { appendFileSync, readFileSync, writeFileSync } from "fs";
import "./dist/array/array.linq.js";

// Set all paths to the files that contain the methods
const files = [
	"array/array.linq.ts",
	"array/array.rust.ts",
	"number/number.rust.ts",
	"string/string.rust.ts",
];
const readmeFileName = "AvailableMethods.md";

// Create an empty readme file
writeFileSync(readmeFileName, "# All extensions\n\n");

// rome-ignore lint/complexity/noForEach: it's fine :)
files
	.GroupBy(
		(file) => file.split("/")[1].split(".")[0],
		(file) => file.split("/")[1],
		(jsKey, jsCategories) => ({
			jsKey,
			jsCategories,
		}),
	)
	.forEach(({ jsKey, jsCategories }) => {
		// Set the title
		const jsClassType = jsKey.replace(/^[a-z]/, (char) => char.toUpperCase());
		appendFileSync(readmeFileName, `## ${jsClassType}\n\n`);
		// Fill with new data
		for (const path of jsCategories) {
			const fileContents = readFileSync(`src/${jsKey}/${path}`, "utf8");

			// Find the Array interface declaration
			const arrayInterfaceRegex = /interface .* {([\s\S]*?)}/;
			const arrayInterfaceMatch = fileContents.match(arrayInterfaceRegex);

			if (!arrayInterfaceMatch) {
				console.error("Could not find interface declaration");
				process.exit(1);
			}

			// Find all the method declarations in the Array interface
			const methodRegex = /^\s*(\w+)\(.*?\): .*;/;
			const methodMatches = arrayInterfaceMatch[1].match(
				new RegExp(methodRegex, "gm"),
			);

			if (!methodMatches) {
				console.error(
					"Could not find any method declarations in Array interface",
				);
				process.exit(1);
			}

			// Generate the README content
			const readmeContent = `${methodMatches
				.map((match) => `- [x] \`${match.trim()}\``)
				.join("\n")}\n\n`;

			const [_, category] = path.split(".");

			const jsClassCategory = category.replace(/^[a-z]/, (char) =>
				char.toUpperCase(),
			);

			// Set the sub-title
			appendFileSync(readmeFileName, `### ${jsClassCategory}\n\n`);
			// Fill with new data
			appendFileSync(readmeFileName, readmeContent);
		}
	});
