import {gameState, game, home} from "../app.js";
import {createMap, mapToDOM} from "./map.js";
import {mapManagedInput, initPawns, createPawns, pawns, move} from "./pawn.js";

export const initGame = ()=>{
    gameState.currentMap = createMap();
    const newGame = document.createElement('div');
    const resetButton = document.createElement('button');
    resetButton.onclick = resetGame;
    resetButton.innerHTML = 'X';
    const playground = document.createElement('div');
    playground.id = 'playground';
    playground.addEventListener('click', mapManagedInput);
    initPawns();
    createPawns(playground);
    mapToDOM(gameState.currentMap, playground);

    newGame.appendChild(resetButton);
    newGame.appendChild(playground);
    return newGame;
}

function resetGame() {
    document.body.removeChild(game);
    document.body.appendChild(home);
}

export function computeDestination (pos, direction, width, color) {
    const currentMap = gameState.currentMap;
    let step = getDir(direction, width);
    let currentPos = pos; 
    
     let currentStep = step;
     let destination = null;
     while (destination === null) {
        const listPlayersPosition = Object.keys(pawns).map((key)=> pawns[key].pos);
        if (listPlayersPosition.includes(currentPos + currentStep)){
           destination = currentPos;
           break;
        }

         const currentCase = currentMap[currentPos];
         const nextCase = currentMap[currentPos + currentStep];

         if(canIGo(currentCase, nextCase, currentStep)){
            currentPos += currentStep
         }else{
             currentStep = yarnTurn(currentCase, currentStep, width, color);
             if (currentStep !== 0) {
                setTimeout(()=>{
                    move(getDir(currentStep, width))
                }, 1500);
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

const canIGo = (currentCase, nextCase, direction) => {
    const rightBorder = [1,-4,5,9,13,17,21,-2,6,10,14,18,22];
    const leftBorder = [2,-1,7,11,15,19,23,-3,8,12,16,20,24];
    const upBorder = [3,-4,5,9,13,17,21,-3,7,11,15,19,23];
    const downBorder = [4,-2,6,10,14,18,22,-1,8,12,16,20,24];

    return !((direction === 1 && (rightBorder.includes(currentCase) || leftBorder.includes(nextCase)))
    || (direction > 1 && (downBorder.includes(currentCase) || upBorder.includes(nextCase)))
    || (direction === -1 && (leftBorder.includes(currentCase) || rightBorder.includes(nextCase)))
    || (direction < -1 && (upBorder.includes(currentCase) || downBorder.includes(nextCase))))

}

const sameColor = (currentCase, color)=>{
    const blueYarn = [9,10,11,12,21,22,23,24];
    const greenYarn = [13,14,15,16,21,22,23,24];
    const redYarn = [5,6,7,8,21,22,23,24];
    const yellowYarn = [17,18,19,20,21,22,23,24];

    return (currentCase < 5
        || (color === 'red' && redYarn.includes(currentCase)) 
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