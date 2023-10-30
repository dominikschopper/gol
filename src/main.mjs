import { GolGame } from './game-of-life/game/gol-game.mjs';
import { GolRulesClassic } from './game-of-life/game/gol-rules.mjs';
import { GameRenderer } from './game-of-life/render/game-renderer.mjs';

function startGame() {
    const rootSelector = '#game-root';
    const nextSelector = "#next-step";

    const game = new GolGame(GolRulesClassic, 45, 55);
    const renderer = new GameRenderer(game, rootSelector);
    window.renderer = renderer;
    document.querySelector(nextSelector)
        .addEventListener('click', (ev) => {
            console.log('#####CLICK NEXT#####');
            ev.preventDefault();
            game.nextState();
        });
}


startGame();