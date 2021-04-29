
let currentPlayer = null;
let players = {}
const initP = {
    player1: {pos:0, color:'blue'},
    player2: {pos:1, color:'green'},
    player3: {pos:2, color:'yellow'},
    player4: {pos:3, color:'red'}
}

function initPlayers() {
    players = JSON.parse(JSON.stringify(initP));
}

//-------------------------------------------------
const rotateField = (value) => {
    switch (value) {
        case 1:
            return 4;
        case 2:
            return 3;
        case 3:
            return 2;
        case 4:
            return 1;
        case 5:
            return 6;
        case 6:
            return 8;
        case 7:
            return 5;
        case 8:
            return 7;
        case 9:
            return 10;
        case 10:
            return 12;
        case 11:
            return 9;
        case 12:
            return 11;
        case 13:
            return 14;
        case 14:
            return 16;
        case 15:
            return 13;
        case 16:
            return 15;
        case 17:
            return 18;
        case 18:
            return 20;
        case 19:
            return 17;
        case 20:
            return 19;
        case 21:
            return 22;
        case 22:
            return 24;
        case 23:
            return 21;
        case 24:
            return 23;
        default:
            return 0;
    }
}

//-----------------------------------------------------//
const mapToDOM = (map, dom) => {
    map.forEach((element, index) => {
        let field = document.createElement('div');
        field.id = 'f' + index;
        field.classList.add("field");

        switch (element) {
            case -4:
                field.classList.add("BOC_right_up")
                field.classList.add("corner")
                break;
            case -3:
                field.classList.add("BOC_left_up")
                field.classList.add("corner")
                break;
            case -2:   
                field.classList.add("BOC_right_down")
                field.classList.add("corner")
                break;    
            case -1:
                field.classList.add("BOC_left_down")
                field.classList.add("corner")
                break;
            case 1:
                field.classList.add("border")
                field.classList.add("right")
                break;
            case 2:
                field.classList.add("border")
                field.classList.add("left")
                break;
            case 3:
                field.classList.add("border")
                break;
            case 4:
                field.classList.add("border")
                field.classList.add("down")
                break;
            case 5:
                field.classList.add("BOC_red")
                field.classList.add("BOC_right_up")
                break;
            case 6:
                field.classList.add("BOC_red")
                field.classList.add("BOC_right_down")
                break;
            case 7:
                field.classList.add("BOC_red")
                field.classList.add("BOC_left_up")
                break;
            case 8:
                field.classList.add("BOC_red")
                field.classList.add("BOC_left_down")
                break;
            case 9:
                field.classList.add("BOC_blue")
                field.classList.add("BOC_right_up")
                break;
            case 10:
                field.classList.add("BOC_blue")
                field.classList.add("BOC_right_down")
                break;
            case 11:
                field.classList.add("BOC_blue")
                field.classList.add("BOC_left_up")
                break;
            case 12:
                field.classList.add("BOC_blue")
                field.classList.add("BOC_left_down")
                break;
            case 13:
                field.classList.add("BOC_green")
                field.classList.add("BOC_right_up")
                break;
            case 14:
                field.classList.add("BOC_green")
                field.classList.add("BOC_right_down")
                break;
            case 15:
                field.classList.add("BOC_green")
                field.classList.add("BOC_left_up")
                break;
            case 16:
                field.classList.add("BOC_green")
                field.classList.add("BOC_left_down")
                break;
            case 17:
                field.classList.add("BOC_yellow")
                field.classList.add("BOC_right_up")
                break;
            case 18:
                field.classList.add("BOC_yellow")
                field.classList.add("BOC_right_down")
                break;
            case 19:
                field.classList.add("BOC_yellow")
                field.classList.add("BOC_left_up")
                break;
            case 20:
                field.classList.add("BOC_yellow")
                field.classList.add("BOC_left_down")
                break;
            case 21:
                field.classList.add("BOC_multicolor")
                field.classList.add("BOC_right_up")
                break;
            case 22:
                field.classList.add("BOC_multicolor")
                field.classList.add("BOC_right_down")
                break;
            case 23:
                field.classList.add("BOC_multicolor")
                field.classList.add("BOC_left_up")
                break;
            case 24:
                field.classList.add("BOC_multicolor")
                field.classList.add("BOC_left_down")
                break;
            default:
                break;
        }
        dom.appendChild(field);
    });
}

//--------------------------------------------------------------------------------------//

const rotateClockWise = (map, width) => {
    let combineMap = [];
    for (let x = 0; x < width; x++) {
        for (let y = width - 1; y> -1; y--) {
            combineMap.push(rotateField(getFieldXY(map, width, x, y)));
        }
    }
    return combineMap;
}

const joinMapHorizontal = (firstMap, secondMap, width) => {
    let countMap1 = 0;
    let countMap2 = 0;
    let first = true;
    let result = [];
    while (map2.length > countMap2) {
        for (let index = 0; index < width/2; index++) {
            result.push(first ? firstMap[countMap1] : secondMap[countMap2]);
            if (first) {
                countMap1++;
            } else {
                countMap2++;
            }
        }
        first = !first;
    }
    return result;
}

const joinMapVertical = (firstMap, secondMap) => {
    return [...firstMap].concat(secondMap);
}

const getFieldXY = (map, width, x, y) => {
    const posY = width * y;
    return map[posY + x];
}

const posToXY = (width, pos) => {
    const posX = (pos%width);
    const posY = Math.trunc(pos/width)
    return {x:posX,y:posY}
}


const computePixelXY = (width, pos) => {
    const fieldWidth = 40;
    const posX = (pos%width) * fieldWidth;
    const posY = Math.trunc(pos/width) * fieldWidth;
    return (posX+"px, "+posY+"px");
}

const shuffleArray = (inputArray) => {
    inputArray.sort(() => Math.random() - 0.5);
}

const createMap = () => {
    let maps = [];
    maps.push([...map1], [...map2], [...map3], [...map4]);
    shuffleArray(maps);
    for (let index = 0; index < maps.length; index++) {
        for (let index2 = 0; index2 < index; index2++) {
            maps[index] = rotateClockWise(maps[index], 8);
        }
    }
    const upMap = joinMapHorizontal(maps[0], maps[1], 16);
    const downMap = joinMapHorizontal(maps[3], maps[2], 16);
    return computeBorderMap(joinMapVertical(upMap, downMap));
}

const computeBorderMap = (map) => {
    const coin = [0,mapWidth - 1, map.length - mapWidth, map.length-1];
    const up = range(coin[0] + 1, coin[1] - 1, 1);
    const right = range(coin[1] + mapWidth, coin[3] - mapWidth, mapWidth );
    const down = range(coin[2] + 1,coin[3] - 1, 1);
    const left = range(coin[0] + mapWidth, coin[2] - mapWidth, mapWidth);

    up.forEach( (key) => {
        if (map[key] !== 0) {
            map[key] = map[key] - 5;
        }else{
            map[key] = 3;
        }
    })
    right.forEach( (key) => {
        if(map[key] === 3){
            map[key] = -4
        }else if(map[key] === 4){
            map[key] = -2;
        }else{
            map[key] = 1;
        }
    })
    down.forEach( (key) => {
        if (map[key] !== 0) {
            map[key] = map[key] - 3;
        }else{
            map[key] = 4;
        }
    })
    left.forEach( (key) => {
        if(map[key] === 3){
            map[key] = -3
        }else if(map[key] === 4){
            map[key] = -1;
        }else{
            map[key] = 2;
        }
    })
    //Gestion des coins
    map[coin[0]] = -3;
    map[coin[1]] = -4;
    map[coin[2]] = -1;
    map[coin[3]] = -2;

    return map;
}

const range = (n,p,step) => {
    if(step == undefined) step = 1;
    if(n == p) return [n];
    if(n > p) return [];
    return [n].concat(range(n+step,p,step));
}

//-------------------------------------------------------//

const createPlayers = (playground) => {
    Object.keys(players).forEach(element => {
        const player = document.createElement("div");
        player.id = element;
        player.classList.add("player");
        player.classList.add(players[element].color);
        playground.appendChild(player);
        currentPlayer = player;
        movePlayer(players[element].pos, 16);
    });
}

const movePlayer = (pos, width) => {
    if(currentPlayer == null) return;
    players[currentPlayer.id].pos = pos;
    currentPlayer.setAttribute("style","transform: translate("+computePixelXY(width,pos)+")");
}

const move = (dir) =>{
    const player = players[currentPlayer.id];
    movePlayer(computeDestination(player.pos, dir, mapWidth, player.color),mapWidth);
    catSound.play();
}

const computeDestination = (pos, direction, width, color) => {
    const currentMap = gameState.currentMap;
    let step = getDir(direction, width);
    let currentPos = pos; 
    
     let currentStep = step;
     let destination = null;
     while (destination === null) {
        const listPlayersPosition = Object.keys(players).map((key)=> players[key].pos);
        if (listPlayersPosition.includes(currentPos + currentStep)){
           destination = currentPos;
           break;
        }

         const currentCase = currentMap[currentPos];
         const nextCase = currentMap[currentPos + currentStep];

         if(canIGo(currentCase, nextCase, currentStep, color)){
            currentPos += currentStep
         }else{
             currentStep = yarnTurn(currentCase, currentStep, width);
             if (currentStep !== 0) {
                const keepPlayer = currentPlayer;
                setTimeout(()=>{
                    currentPlayer = keepPlayer;
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

const canIGo = (currentCase, nextCase, direction, color) => {
    const blueYarn = [9,10,11,12,21,22,23,24];
    const greenYarn = [13,14,15,16,21,22,23,24];
    const redYarn = [5,6,7,8,21,22,23,24];
    const yellowYarn = [17,18,19,20,21,22,23,24];
    const rightBorder = [1,-4,5,9,13,17,21,-2,6,10,14,18,22];
    const leftBorder = [2,-1,7,11,15,19,23,-3,8,12,16,20,24];
    const upBorder = [3,-4,5,9,13,17,21,-3,7,11,15,19,23];
    const downBorder = [4,-2,6,10,14,18,22,-1,8,12,16,20,24];

    let isBorder = false;
    let sameColor = false;
    isBorder = ((direction === 1 && (rightBorder.includes(currentCase) || leftBorder.includes(nextCase)))
    || (direction > 1 && (downBorder.includes(currentCase) || upBorder.includes(nextCase)))
    || (direction === -1 && (leftBorder.includes(currentCase) || rightBorder.includes(nextCase)))
    || (direction < -1 && (upBorder.includes(currentCase) || downBorder.includes(nextCase))))

    sameColor = (currentCase < 5
    || (color === 'red' && redYarn.includes(currentCase)) 
    || (color === 'blue' && blueYarn.includes(currentCase)) 
    || (color === 'yellow' && yellowYarn.includes(currentCase)) 
    || (color === 'green' && greenYarn.includes(currentCase))); 

    return !isBorder || (isBorder && !sameColor);
}

const yarnTurn = (currentCase, step, width) => {
    if (currentCase < 5) return 0;

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
//-----------------------------------------------------//

const resetInputPlayer = () => {
    if(currentPlayer == null) return;
    currentPlayer.innerHTML = "";
    currentPlayer.classList.remove("current")
    currentPlayer = null;
}

const displayInputPlayer = () => {
    if(currentPlayer.innerHTML !== "") {
        resetInputPlayer();
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

    currentPlayer.appendChild(upButton);
    currentPlayer.appendChild(downButton);
    currentPlayer.appendChild(rightButton);
    currentPlayer.appendChild(leftButton);

}

//-----------------------------------------------------//
const mapManagedInput = (ev)=>{
    const target = ev.target;

    switch (target.id) {
        case (target.id.match(/player[1-9]/) || {}).input:
            resetInputPlayer();
            currentPlayer = target;
            currentPlayer.classList.add("current");
            displayInputPlayer();
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
            resetInputPlayer();
            break;
    }
}

//-----------------------------------------------------//

const initGame = ()=>{
    gameState.currentMap = createMap();
    const newGame = document.createElement('div');
    const resetButton = document.createElement('button');
    resetButton.onclick = resetGame;
    resetButton.innerHTML = 'X';
    const playground = document.createElement('div');
    playground.id = 'playground';
    playground.addEventListener('click', mapManagedInput);
    initPlayers();
    createPlayers(playground);
    mapToDOM(gameState.currentMap, playground);

    newGame.appendChild(resetButton);
    newGame.appendChild(playground);
    return newGame;
}

function resetGame() {
    document.body.removeChild(game);
    document.body.appendChild(home);
}
//-----------------------------------------------------//
const catSound = document.createElement('audio');
catSound.innerHTML = `
<source src="assets/cat.mp3" type="audio/mpeg">
`
