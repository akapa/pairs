import $ from 'jquery';

export default class Game {
	constructor(elem, availableCards, deckSize = 6) {
		this.$elem = $(elem);
		this.deckSize = deckSize;
		this.availableCards = availableCards;
		this.cards = [];
	}

	start() {
		this.cards = this.generateCards();
		this.displayCards();
		this.$elem.on('click', 'li', (e) => {
			this.handleChoice($(e.currentTarget));
		});
	}

	generateCards() {
		this.shuffle(this.availableCards);
		const cards = this.availableCards.slice(0, this.deckSize / 2);
		return this.shuffle(cards.concat(cards));
	}

	handleChoice($card) {
		$card.addClass('shown temporarily');
		const $temps = this.$elem.find('.temporarily');
		if ($temps.length > 1) {
			$temps.removeClass('temporarily');

			const tempValues = $temps.map((i, card) => $(card).data('type')).get();
			if (tempValues[0] !== tempValues[1]) {
				$temps.removeClass('shown');
			}
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

	isReady() {
		const $stillHidden = this.$list.find('li:not(.shown)');
		return $stillHidden.length === 0;
	}

	shuffle(arr) {
		return arr.sort(() => Math.round(Math.random()));
	}

	end() {
		this.$elem.off();
		console.log('game has ended');
	}
}
