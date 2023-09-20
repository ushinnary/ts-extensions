export async function initArrayRustExtension() {
	return import("./array/array.rust");
}
export async function initArrayLinqExtension() {
	return import("./array/array.linq");
}
export async function initNumberRustExtension() {
	return import("./number/number.rust");
}

export async function initStringRustExtension() {
	return import("./string/string.rust");
}
