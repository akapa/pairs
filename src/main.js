import Game from './Game';
import TopList from './TopList';
import GameScene from './GameScene';
import $ from 'jquery';

export default function main() {
	const cards = ['angular', 'd3', 'jenkins', 'postcss', 'react', 'redux', 'sass', 'supercharge', 'ts', 'webpack'];
	const scene = new GameScene($('.game'));
	const topList = new TopList();
	const $deckSize = $('.deck-size');
	let game;

	updateTopList(topList.getBestForDeckSize($deckSize.val()));

	$deckSize.on('input', function () {
		updateTopList(topList.getBestForDeckSize($deckSize.val()));
	});

	$('.settings').on('submit', function (e) {
		e.preventDefault();

		game = new Game(cards, $deckSize.val());
		game.start();
		scene.display(game);

		$(game).on('ended', function () {
			topList.applyBestForDeckSize(game.deckSize, game.tries);
			updateTopList(topList.getBestForDeckSize(game.deckSize));
		});
	});
}

function updateTopList(top) {
	$('.toplist').html(`${top ? 
		`For this deck size the best is ${top} tries` : 
		`No top score yet with this deck size`}
	`);
}
