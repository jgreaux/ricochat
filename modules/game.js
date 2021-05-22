import {gameState, game, home} from "../app.js";
import {mapToDOM} from "./map.js";
import {mapManagedInput, createPawns, pawns, move, doMove, resetPawns} from "./pawn.js";

let headerPlayerName;
let headerPlayerScore;

export const updateScore = ()=>{
    if (headerPlayerScore.innerHTML) {
        headerPlayerScore.innerHTML = gameState.players[Object.keys(gameState.players)[gameState.currentPlayer]];
    }
}

const createVictoryMassage = (color) =>{
    const msg = document.createElement('a');
    msg.innerHTML = `Menez le chat ${color} aux croquettes !`;
    return msg;
}

const setVictoryColor = () =>{
    const colors = ['red', 'blue', 'green', 'yellow'];
    const messageColor = ['rouge', 'bleu', 'vert', 'jaune'];
    const selection = Math.floor(Math.random() * 3.99);

    gameState.victoryColor = colors[selection];
    return messageColor[selection];
}

const createHeaderPlayer = () =>{
    const players = gameState.players;
    const firstPlayerName = Object.keys(players)[0];
    const newHeader = document.createElement('div');
    newHeader.classList.add('playerHeader');
    headerPlayerName = document.createElement('a');
    headerPlayerName.classList.add('current_player_name');
    headerPlayerName.innerHTML = firstPlayerName;
    headerPlayerScore = document.createElement('a');
    headerPlayerScore.classList.add('current_player_score');
    headerPlayerScore.innerHTML = players[firstPlayerName];
    newHeader.appendChild(headerPlayerName);
    newHeader.appendChild(headerPlayerScore);
    return newHeader;
}

export const initGame = ()=>{
    const newGame = document.createElement('div');
    const resetButton = document.createElement('button');
    resetButton.onclick = resetGame;
    resetButton.innerHTML = 'X';
    const playground = document.createElement('div');
    playground.id = 'playground';
    playground.addEventListener('click', mapManagedInput);
    playground.addEventListener('touchmove', slideMove);
    playground.addEventListener('touchend', slideEnd);
    createPawns(playground);
    mapToDOM(gameState.map, playground);

    newGame.appendChild(resetButton);
    newGame.appendChild(createVictoryMassage(setVictoryColor()))
    newGame.appendChild(createHeaderPlayer());
    newGame.appendChild(playground);
    return newGame;
}

let slideCash = [];

const slideMove = (e) => {
    e.preventDefault();
    slideCash.push({x:e.changedTouches[0].screenX, y:e.changedTouches[0].screenY});
}

const slideEnd = (e) => {
    if(slideCash.length === 0) return;
    const start = slideCash[0];
    const end = slideCash.pop();
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const hor = Math.abs(dx) > Math.abs(dy);
    slideCash = [];
    if(hor && dx > 0) return doMove("right");
    if(hor && dx < 0) return doMove("left");
    if(!hor && dy > 0) return doMove("down");
    if(!hor && dy < 0) return doMove("up");
}

function resetGame() {
    document.body.removeChild(game);
    document.body.appendChild(home);
}

export function computeDestination (pos, direction, width, color) {
    const currentMap = gameState.map;
    let step = getDir(direction, width);
    let currentPos = pos; 
    
     let currentStep = step;
     let destination = null;
     while (destination === null) {
         const currentCase = currentMap[currentPos];
         const nextCase = currentMap[currentPos + currentStep];

         if(canIGo(currentPos,currentCase, nextCase, currentStep)){
            currentPos += currentStep
         }else{
             currentStep = yarnTurn(currentCase, currentStep, width, color);
             if (currentStep !== 0) {
                setTimeout(()=>{
                    move(getDir(currentStep, width))
                    gameState.players[Object.keys(gameState.players)[gameState.currentPlayer]]--;
                }, 1000);
             }
             destination = currentPos;
         }        
     }
     return destination;
}

const getDir = (dir, width) =>{
    const textValue = ['up', 'down', 'right', 'left'];
    const numValue = [-width, width, 1, -1];
    if(textValue.includes(dir)){
        return numValue[textValue.indexOf(dir)];
    }
    if(numValue.includes(dir)){
        return textValue[numValue.indexOf(dir)];
    }
}

const canIGo = (currentPos,currentCase, nextCase, direction) => {
    return !isBorder(currentCase, nextCase, direction) && !otherPawn(currentPos + direction) && !isVictory(currentCase);
}

const isVictory = (currentCase) => {
    return currentCase === 25;
}

const isBorder = (currentCase, nextCase, direction) => {
    const rightBorder = [1,-4,5,9,13,17,21,-2,6,10,14,18,22];
    const leftBorder = [2,-1,7,11,15,19,23,-3,8,12,16,20,24];
    const upBorder = [3,-4,5,9,13,17,21,-3,7,11,15,19,23];
    const downBorder = [4,-2,6,10,14,18,22,-1,8,12,16,20,24];

    return ((direction === 1 && (rightBorder.includes(currentCase) || leftBorder.includes(nextCase)))
    || (direction > 1 && (downBorder.includes(currentCase) || upBorder.includes(nextCase)))
    || (direction === -1 && (leftBorder.includes(currentCase) || rightBorder.includes(nextCase)))
    || (direction < -1 && (upBorder.includes(currentCase) || downBorder.includes(nextCase))))
}

const otherPawn = (pos) => {
    const listPlayersPosition = Object.keys(pawns).map((key)=> pawns[key].pos);
    return listPlayersPosition.includes(pos);
}

const sameColor = (currentCase, color)=>{
    const blueYarn = [9,10,11,12,21,22,23,24];
    const greenYarn = [13,14,15,16,21,22,23,24];
    const redYarn = [5,6,7,8,21,22,23,24];
    const yellowYarn = [17,18,19,20,21,22,23,24];
    return ((color === 'red' && redYarn.includes(currentCase)) 
        || (color === 'blue' && blueYarn.includes(currentCase)) 
        || (color === 'yellow' && yellowYarn.includes(currentCase)) 
        || (color === 'green' && greenYarn.includes(currentCase)));
}

const yarnTurn = (currentCase, step, width, color) => {
    if (!sameColor(currentCase, color)) return 0;

    const rightBorder = [1,-4,5,9,13,17,21,-2,6,10,14,18,22];
    const upBorder = [3,-4,5,9,13,17,21,-3,7,11,15,19,23];

    const borderIsRight = rightBorder.includes(currentCase);
    const borderIsUp = upBorder.includes(currentCase);
    const horizontalMove = Math.abs(step) === 1;

    if (horizontalMove && borderIsUp) return width;
    if (horizontalMove && !borderIsUp) return -width;
    if (!horizontalMove && borderIsRight) return -1;
    if (!horizontalMove && !borderIsRight) return 1;
}

export const nextPlayer = () => {
    gameState.currentPlayer++;
    updateScore();
    const players = Object.keys(gameState.players);
    if(players[gameState.currentPlayer]){
        const score = gameState.players[players[gameState.currentPlayer]];
        headerPlayerName.innerHTML = players[gameState.currentPlayer];
        headerPlayerScore.innerHTML = score;
        resetPawns();
    }else{
        alert(alertVictory());
        resetGame();
    }
}

function alertVictory() {
    const players = Object.keys(gameState.players);
    const classment = players.map((player)=>{
        return {name:player, score:gameState.players[player]}
    }).sort((a,b)=>a.score - b.score);
    let res = "Félicitation " + classment[0].name + " a gagné !!! \n";
    let recap = "";
    classment.forEach((player)=>{
        recap +=  player.name + " : " + player.score + "\n";
    });
    return res + recap;
}