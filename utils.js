let currentPlayer = null;
const players = {
    player1: {pos:0},
    player2: {pos:1}
}
const playground = document.getElementById("playground");

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
        field.id = index;
        field.classList.add("field");

        switch (element) {
            case -5:
                field.classList.add("coin")
                break;
            case -4:
                field.classList.add("border")
                break;
            case -3:
                field.classList.add("border")
                break;
            case -2:
                field.classList.add("border")
                break;
            case -1:
                field.classList.add("border")
                break;
            case 1:
                field.classList.add("rightfence")
                break;
            case 2:
                field.classList.add("leftfence")
                break;
            case 3:
                field.classList.add("upfence")
                break;
            case 4:
                field.classList.add("downfence")
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
        map[key] = -1;
    })
    right.forEach( (key) => {
        map[key] = -2;
    })
    down.forEach( (key) => {
        map[key] = -3;
    })
    left.forEach( (key) => {
        map[key] = -4;
    })
    coin.forEach( (key) => {
        map[key] = -5;
    })

    return map;
}

const range = (n,p,step) => {
    if(step == undefined) step = 1;
    if(n == p) return [n];
    if(n > p) return [];
    return [n].concat(range(n+step,p,step));
}

//-------------------------------------------------------//

const createPlayers = () => {
    Object.keys(players).forEach(element => {
        const player = document.createElement("div");
        player.id = element;
        player.className = "player";
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
    const currentPos = players[currentPlayer.id].pos;
    movePlayer(computeDestination(currentPos, dir, mapWidth),mapWidth);
}

const computeDestination = (pos, direction, width) => {
    let step = null;
    let destination = null;
    let currentPos = pos; 
     switch (direction) {
         case 'right':
            step = 1;
            break;
        case 'left':
            step = -1;
            break;
        case 'up':
            step = - width;
            break;
        case 'down':
            step = width;
            break;
     }
    while (destination === null) {
        currentPos += step;
        if (currentMap[currentPos] != 0) {
            destination = currentPos;
        }
    }
    return currentPos;
}

//-----------------------------------------------------//

const resetInputPlayer = () => {
    if(currentPlayer == null) return;
    currentPlayer.innerHTML = "";
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

const init = (map)=>{
    playground.addEventListener('click', mapManagedInput);
    createPlayers();
    mapToDOM(map, playground);
}
