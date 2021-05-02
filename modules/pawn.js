import {computePixelXY, playCat, getVictoryPos} from "./utils.js";
import {computeDestination, updateScore, nextPlayer} from "./game.js"
import {mapWidth} from "./map.js";
import { gameState } from "../app.js";

export let currentPawn = null;
export let pawns = {};

export function initPawns(map) {
    const posMax = map.length;
    let newPos = 0;
    const currentPos = getVictoryPos(mapWidth);
    const randomPawns = () => {
        let added = false;
        while (!added) {
            newPos = Math.round(Math.random() * posMax);
            if (!currentPos.includes(newPos)) {
                currentPos.push(newPos);
                added = true;
            }
        }
        return newPos;
    };
    const newPawns = {
        pawn1: {pos:randomPawns(), color:'blue'},
        pawn2: {pos:randomPawns(), color:'green'},
        pawn3: {pos:randomPawns(), color:'yellow'},
        pawn4: {pos:randomPawns(), color:'red'}
    }
    return newPawns;
}

export function resetPawns() {
    pawns = JSON.parse(JSON.stringify(gameState.pawns));
    resetInputPawn();
    Object.keys(pawns).forEach((pawn)=>{
        currentPawn = document.getElementById(pawn);
        movePawn(pawns[pawn].pos, mapWidth);
    })
    currentPawn = null;
}

export function move (dir) {
    const pawn = pawns[currentPawn.id];
    movePawn(computeDestination(pawn.pos, dir, mapWidth, pawn.color),mapWidth);
    playCat();
    gameState.players[Object.keys(gameState.players)[gameState.currentPlayer]]++;
    if(getVictoryPos(mapWidth).includes(pawn.pos)) setTimeout(nextPlayer,1000);
}

function doMove(dir){
    move(dir);
    updateScore();
}

function movePawn (pos, width) {
    if(currentPawn == null) return;
    pawns[currentPawn.id].pos = pos;
    currentPawn.setAttribute("style","transform: translate("+computePixelXY(width,pos)+")");
}

function resetInputPawn () {
    if(currentPawn == null) return;
    currentPawn.innerHTML = "";
    currentPawn.classList.remove("current")
    currentPawn = null;
}

function displayInputPawn () {
    if(currentPawn.innerHTML !== "") {
        resetInputPawn();
        return;
    }

    const upButton = document.createElement("div");
    const downButton = document.createElement("div");
    const rightButton = document.createElement("div");
    const leftButton = document.createElement("div");

    upButton.id = "up";
    downButton.id = "down";
    rightButton.id = "right";
    leftButton.id = "left";

    currentPawn.appendChild(upButton);
    currentPawn.appendChild(downButton);
    currentPawn.appendChild(rightButton);
    currentPawn.appendChild(leftButton);

}

export function mapManagedInput (ev) {
    const target = ev.target;

    switch (target.id) {
        case (target.id.match(/pawn[1-9]/) || {}).input:
            resetInputPawn();
            currentPawn = target;
            currentPawn.classList.add("current");
            displayInputPawn();
            break;
        case "up":
            doMove("up");
            break;
        case "down":
            doMove("down");
            break;
        case "right":
            doMove("right");
            break;
        case "left":
            doMove("left");
            break;
        default:
            resetInputPawn();
            break;
    }
}

export function createPawns (playground) {
    Object.keys(pawns).forEach(element => {
        const pawn = document.createElement("div");
        pawn.id = element;
        pawn.classList.add("pawn");
        pawn.classList.add(pawns[element].color);
        playground.appendChild(pawn);
        currentPawn = pawn;
        movePawn(pawns[element].pos, 16);
    });
}