import {computePixelXY, catSound} from "./utils.js";
import {computeDestination} from "./game.js"
import {mapWidth} from "./map.js";

export let currentPawn = null;
export let pawns = {}
const initP = {
    pawn1: {pos:0, color:'blue'},
    pawn2: {pos:1, color:'green'},
    pawn3: {pos:2, color:'yellow'},
    pawn4: {pos:3, color:'red'}
}

export function initPawns() {
    pawns = JSON.parse(JSON.stringify(initP));
}

export function move (dir) {
    const pawn = pawns[currentPawn.id];
    movePawn(computeDestination(pawn.pos, dir, mapWidth, pawn.color),mapWidth);
    catSound.play();
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
            move("up");
            break;
        case "down":
            move("down");
            break;
        case "right":
            move("right");
            break;
        case "left":
            move("left");
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