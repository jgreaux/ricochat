const mapCount = (mp, mapName) => {
    console.log(mapName + ' = ' + mp.length);
}

//--------------------------------------------------------------------------------------//

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

//--------------------------------------------------------------------------------------//

const rotateClockWise = (map, width) => {
    let combineMap = [];
    for (let x = 0; x < width; x++) {
        for (let y = width - 1; y> -1; y--) {
            combineMap.push(rotateField(navigateXY(map, width, x, y)));
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

const navigateXY = (map, width, x, y) => {
    const posY = width * y;
    return map[posY + x];
}

const navigatePixelXY = (width, pos) => {
    const fieldWidth = 40;
    const posX = (pos%width) * fieldWidth;
    const posY = Math.trunc(pos/width) * fieldWidth;

    console.log("width : ", width);
    console.log("x : ",posX);
    console.log("y : ",posY);

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
    return joinMapVertical(upMap, downMap);
}

//-----------------------------------------------------------

const movePlayer = (pId, pos, width) => {
    const player = document.getElementById(pId);
    player.setAttribute("style","transform: translate("+navigatePixelXY(width,pos)+")");
}

//-----------------------------------------------------//
const mapManagedInput = (ev)=>{
    let fieldPos = ev.target.id;
    console.log(fieldPos);
    movePlayer("player", fieldPos, 16);
    
    
}
//-----------------------------------------------------//

const mapToDOM = (map, dom) => {
    map.forEach((element, index) => {
        let field = document.createElement('div');
        field.id = index;
        field.classList.add("field");

        switch (element) {
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

const init = (map)=>{
    let playground = document.getElementById('playground');
    playground.addEventListener('click', mapManagedInput);

    mapToDOM(map, playground);
}
