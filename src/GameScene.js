import $ from 'jquery';

export default class GameScene {
	constructor($elem) {
		this.$elem = $elem;
	}

	display(game) {
		this.game = game;

		$(this.game)
			.on('generated', () => {
				this.$elem.removeClass('hidden');
				this.detachDomHandlers();
				this.attachDomHandlers();
				this.displayCards();
			})
			.on('ended', () => {
				this.destroy();
				this.updateScore(0);
			})
			.on('scoreupdate', (event, score) => {
				this.updateScore(score);
			});
	}

	destroy() {
		$(this.game).off();
		this.game = null;

		this.detachDomHandlers();
		this.$elem.addClass('hidden');
	}

	handleChoice($card) {
		$card.addClass('shown');
		const $temps = this.$elem.find('.shown');
	
		setTimeout(() => {
			if ($temps.length <= 1) return;

			$temps.removeClass('shown');

			const values = $temps.map((i, card) => $(card).data('type')).get();
			
			if (this.game.validateChoice(values)) {
				$temps.addClass('removed');
			}
		}, 500);
	}

	updateScore(value) {
		this.$elem.find('.tries').text(value);
	}

	displayCards() {
		const $lis = this.game.cards.reduce(($acc, current) => {
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

	attachDomHandlers() {
		this.$elem.on('click', 'li', (e) => {
			this.handleChoice($(e.currentTarget));
		});
		this.$elem.find('.restart').on('click', () => {
			this.game.restart();
		});
		this.$elem.find('.quit').on('click', () => {
			this.game.end();
		});
	}

	detachDomHandlers() {
		this.$elem.off();
		this.$elem.find('.quit').off();
		this.$elem.find('.restart').off();
	}
}
