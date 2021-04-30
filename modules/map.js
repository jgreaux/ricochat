import * as _utils from "./utils.js";

const map1 = [0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 13, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 8, 0, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const map2 = [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const map3 = [0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const map4 = [0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 19, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0];

export const mapWidth = 16;

export function mapToDOM (map, dom) {
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

function joinMapHorizontal (firstMap, secondMap, width) {
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

function joinMapVertical (firstMap, secondMap) {
    return [...firstMap].concat(secondMap);
}

const computeBorderMap = (map) => {
    const coin = [0,mapWidth - 1, map.length - mapWidth, map.length-1];
    const up = _utils.range(coin[0] + 1, coin[1] - 1, 1);
    const right = _utils.range(coin[1] + mapWidth, coin[3] - mapWidth, mapWidth );
    const down = _utils.range(coin[2] + 1,coin[3] - 1, 1);
    const left = _utils.range(coin[0] + mapWidth, coin[2] - mapWidth, mapWidth);

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

export const createMap = () => {
    let maps = [];
    maps.push([...map1], [...map2], [...map3], [...map4]);
    _utils.shuffleArray(maps);
    for (let index = 0; index < maps.length; index++) {
        for (let index2 = 0; index2 < index; index2++) {
            maps[index] = _utils.rotateClockWise(maps[index], 8);
        }
    }
    const upMap = joinMapHorizontal(maps[0], maps[1], 16);
    const downMap = joinMapHorizontal(maps[3], maps[2], 16);
    return computeBorderMap(joinMapVertical(upMap, downMap));
}

