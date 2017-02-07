import Game from './Game';
import $ from 'jquery';

export default function main() {
	const cards = ['angular', 'd3', 'jenkins', 'postcss', 'react', 'redux', 'sass', 'supercharge', 'ts', 'webpack'];
	const $game = $('.game');
	let game;

	$('.settings').on('submit', function (e) {
		e.preventDefault();
		const $this = $(this);

		game = new Game($game, cards, $this.find('.deck-size').val());
		game.start();
	});
}
