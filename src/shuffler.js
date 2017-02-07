export default function shuffle(arr) {
	return arr.sort(() => Math.round(Math.random()));
};
