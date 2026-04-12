module.exports = {
	testEnvironment: "node",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	extensionsToTreatAsEsm: [".ts", ".tsx"],
	transform: {
		"^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.json", useESM: true }],
	},
	injectGlobals: true,
};
