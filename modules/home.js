import {stateGameState, newGame, game, home} from "../app.js";
import { resetPawns, initPawns } from "./pawn.js";
import { createMap } from "./map.js";

export function createHome(){
    const myHome = document.createElement('div');
    myHome.id = 'home';
    const namePlayer = document.createElement('input');
    namePlayer.type = "text";
    const buttonAdd = document.createElement('button');
    buttonAdd.id = 'add';
    buttonAdd.onclick = ()=> addPlayer(namePlayer,listPlayers);
    buttonAdd.innerHTML = 'Add';
    const listPlayers = document.createElement('ul');
    const buttonPlay = document.createElement('button');
    buttonPlay.innerHTML = 'PLAY';
    buttonPlay.onclick = () => startPlay(listPlayers);

    myHome.appendChild(namePlayer);
    myHome.appendChild(buttonAdd);
    myHome.appendChild(listPlayers);
    myHome.appendChild(buttonPlay);

    return myHome;
}

function addPlayer(namePlayer,listPlayers) {
    if (listPlayers.childElementCount > 7) {
        alert('8 Joueur maximum');
        return;
    }
    const name = namePlayer.value;
    if (name.length === 0) {
        alert('Name is Empty');
        return;
    }
    if (nameExist(name, listPlayers)) return;

    let listElm = document.createElement('li');
    let elmTxt = document.createElement('a');
    elmTxt.innerHTML = namePlayer.value || 'Player';
    let elmX = document.createElement('button');
    elmX.innerHTML = 'X';
    elmX.onclick = () => { 
        listPlayers.removeChild(listElm);
    };
    listElm.appendChild(elmTxt);
    listElm.appendChild(elmX);

    listPlayers.appendChild(listElm);
}

function initState(players) {
    const map = createMap();
    stateGameState({currentPlayer:0, players, map, pawns:initPawns(map)});
    resetPawns();
}

function startPlay(listPlayers) {
    const listP = listPlayers.childNodes;
    if (listP.length === 0) {
        alert("Il n'y a pas de joueur pour cette partie !");
        return;
    }
    const players = {};
    listP.forEach((li) => {
        players[li.childNodes[0].innerHTML] = 0;
    });
    initState(players);
    newGame();
    document.body.removeChild(home);
    document.body.appendChild(game)
}

function nameExist(name, listPlayers) {
    const nodes = listPlayers.childNodes;
    for (let index = 0; index < nodes.length; index++) {
        const li = nodes[index];
        if(li.childNodes[0].innerHTML === name) {
            alert(name +' already exist');
            return true;
        }
    }
    return false;
}
