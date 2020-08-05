export {};

declare global {
	interface Array<T> {
		flatMap<R>(transform: (item: T, index: number) => R[]): R[];
	}

	interface Map<K, V> {
		putAll(pairs: [K, V][]): Map<K, V>;
	}
}

// eslint-disable-next-line no-extend-native
Array.prototype.flatMap = function (
	transform: (item: any, index: number) => any[],
) {
	return this.reduce((prev, curr, id) => prev.concat(transform(curr, id)), []);
};

// eslint-disable-next-line no-extend-native
Map.prototype.putAll = function (pairs: [any, any][]) {
	pairs.forEach(([key, value]) => this.set(key, value));
	return this;
};