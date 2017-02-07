import Game from './Game';
import GameScene from './GameScene';
import $ from 'jquery';

export default function main() {
	const cards = ['angular', 'd3', 'jenkins', 'postcss', 'react', 'redux', 'sass', 'supercharge', 'ts', 'webpack'];
	const scene = new GameScene($('.game'));
	let game;

	$('.settings').on('submit', function (e) {
		e.preventDefault();

		game = new Game(cards, $(this).find('.deck-size').val());
		game.start();
		scene.display(game);
	});
}
