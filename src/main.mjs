import { GolGame } from './game-of-life/game/gol-game.mjs';
import { GolRulesClassic } from './game-of-life/game/gol-rules.mjs';
import { GameRenderer } from './game-of-life/render/game-renderer.mjs';
import { createGliderLeft, createGliderRight, createSpinner3, createSpinner3Vertical, createStaticRing, createStaticSquare } from './presets.mjs';

function startGame() {
    const rootSelector = '#game-root';
    const nextSelector = "#next-step";
    const playSelector = "#play";
    const pauseSelector = "#pause";

    const rowCount = 45;
    const colCount = 55;

    const game = new GolGame(GolRulesClassic, rowCount, colCount);

    createGliderRight({row: 3, col: colCount - 4}, game);
    createGliderLeft({row: Math.floor(rowCount / 2), col: colCount - 10}, game);
    createGliderLeft({row: rowCount - 6, col: 8}, game);
    createGliderRight({row: rowCount - 5, col: colCount - 4}, game);
    createGliderRight({row: 7, col: 5}, game);
    createSpinner3Vertical({row: rowCount - 5, col: Math.floor(colCount / 2)}, game);
    createSpinner3Vertical({row: rowCount - 15, col: Math.floor(colCount / 2) + 4}, game);
    createStaticRing({row: 31, col: 21}, game);
    createSpinner3({row: 21, col: 5}, game);

    const renderer = new GameRenderer(game, rootSelector);

    document.querySelector(nextSelector).addEventListener("click", (ev) => {
        ev.preventDefault();
        game.nextState();
    });

    let intervalId = null;
    document.querySelector(playSelector).addEventListener("click", (ev) => {
        intervalId = window.setInterval(() => {
            ev.preventDefault();
            game.nextState();
        }, 500);
    })

    document.querySelector(pauseSelector).addEventListener("click", (ev) => {
        if (intervalId !== null) {
            window.clearInterval(intervalId);
            intervalId = null;
        }
    });
}


startGame();