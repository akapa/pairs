import $ from 'jquery';
import shuffle from './shuffler';

export default class Game {
	constructor(availableCards, deckSize = 6) {
		this.deckSize = deckSize;
		this.availableCards = availableCards;
		this.cards = [];
		this.tries = 0;
	}

	start() {
		this.updateScore(0);
		this.cards = this.generateCards();
		setTimeout(() => {
			$(this).trigger('generated')
		}, 10);
	}

	generateCards() {
		shuffle(this.availableCards);
		const cards = this.availableCards.slice(0, this.deckSize / 2);
		return shuffle(cards.concat(cards));
	}

	validateChoice(values) {
		this.updateScore(this.tries + 1);

		const good = values[0] === values[1];
		if (good) this.cards = this.cards.filter(elem => elem !== values[0]);

		if(this.isReady()) this.end();

		return good;
	}

	updateScore(value) {
		this.tries = value;
		$(this).trigger('scoreupdate', this.tries);
	}

	isReady() {
		return this.cards.length === 0;
	}

	restart() {
		this.start();
	}

	end() {
		$(this).trigger('ended');
	}
}
