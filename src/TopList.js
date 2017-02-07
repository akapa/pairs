export default class TopList {
	constructor() {
		this.key = 'toplist';
		this.load();
	}

	getBestForDeckSize(n) {
		return this.topList[n];
	}

	applyBestForDeckSize(n, result) {
		const current = this.getBestForDeckSize(n);
		if (current && result > current) return false;

		this.topList[n] = result;
		this.save();
		return true;
	}

	load() {
		const stored = window.localStorage.getItem(this.key);
		this.topList = stored ? JSON.parse(stored) : {};
	}

	save() {
		window.localStorage.setItem(this.key, JSON.stringify(this.topList));
	}
}
