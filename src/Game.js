import $ from 'jquery';
import shuffle from './shuffler';

export default class Game {
	constructor(elem, availableCards, deckSize = 6) {
		this.$elem = $(elem);
		this.deckSize = deckSize;
		this.availableCards = availableCards;
		this.cards = [];
	}

	start() {
		this.tries = 0;
		this.updateScore();

		this.cards = this.generateCards();
		this.displayCards();

		this.$elem.removeClass('hidden');
		this.attachHandlers();
	}

	attachHandlers() {
		this.$elem.on('click', 'li', (e) => {
			this.handleChoice($(e.currentTarget));
		});
		this.$elem.find('.restart').on('click', () => {
			this.end();
			this.start();
		});
		this.$elem.find('.quit').on('click', this.end.bind(this));
	}

	detachHandlers() {
		this.$elem.off();
		this.$elem.find('.quit').off();
	}

	generateCards() {
		shuffle(this.availableCards);
		const cards = this.availableCards.slice(0, this.deckSize / 2);
		return shuffle(cards.concat(cards));
	}

	handleChoice($card) {
		$card.addClass('shown');
		const $temps = this.$elem.find('.shown');
		setTimeout(this.doChecks.bind(this, $temps), 500);
	}

	doChecks($temps) {
		if ($temps.length <= 1) return;

		this.tries += 1;
		this.updateScore();

		$temps.removeClass('shown');

		const tempValues = $temps.map((i, card) => $(card).data('type')).get();
		if (tempValues[0] === tempValues[1]) {
			$temps.addClass('removed');
		}

		if(this.isReady()) this.end();
	}

	displayCards() {
		const $lis = this.cards.reduce(($acc, current) => {
			const $elem = $(`
				<li data-type="${current}">
					<img src="assets/${current}.png" alt="${current}">
				</li>
			`);
			return $acc.add($elem);
		}, $());
		this.$list = this.$elem.find('.cards').empty();
		this.$list.append($lis);
	}

	updateScore() {
		this.$elem.find('.tries').text(this.tries);
	}

	isReady() {
		const $stillHidden = this.$list.find('li:not(.removed)');
		return $stillHidden.length === 0;
	}

	end() {
		this.detachHandlers();
		this.$elem.addClass('hidden');
	}
}
