import type { Pair } from "./types";

export function mergeRanges<T = string | number | Date>(
	items: Pair<T>[],
): Pair<T>[] {
	const copy = structuredClone(items);
	let index = -1;

	for (const current of copy) {
		++index;

		let existingOccurence = copy.find(
			([start, end], idx) =>
				end >= current[0] && start <= current[1] && idx !== index,
		);

		while (existingOccurence) {
			current[0] =
				current[0] <= existingOccurence[0]
					? current[0]
					: existingOccurence[0];
			current[1] =
				current[1] >= existingOccurence[1]
					? current[1]
					: existingOccurence[1];

			copy.splice(copy.indexOf(existingOccurence), 1);

			existingOccurence = copy.find(
				([start, end], idx) =>
					end >= current[0] && start <= current[1] && idx !== index,
			);
		}
	}

	copy.sort((a, b) => (b as unknown)[0] - (a as unknown)[0]);

	return copy;
}
