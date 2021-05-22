import {createHome} from "./modules/home.js";
import {initGame} from "./modules/game.js";

export let gameState = {};
export const home = createHome();
export let game = document.createElement('div');

export const newGame = ()=> {
    game.innerHTML="";
    game = initGame();
}

export const stateGameState = (newState)=> {
    gameState = newState;
}

document.body.appendChild(home);

function initTestApp() {
    document.getElementsByTagName('input')[0].value = 'Test1';
    document.getElementById('add').click();
    document.getElementsByTagName('input')[0].value = 'Test2';
    document.getElementById('add').click();
    document.getElementsByTagName('input')[0].value = 'Test3';
    document.getElementById('add').click();

    let listButton = document.getElementsByTagName('button');
    listButton[listButton.length - 1].click();
}
initTestApp();