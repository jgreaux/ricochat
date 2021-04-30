import {createHome} from "./modules/home.js";
import {initGame} from "./modules/game.js";

export let gameState = {};
export const home = createHome();
export let game = initGame();

export const newGame = ()=> {
    game.innerHTML="";
    game = initGame();
}

document.body.appendChild(home);