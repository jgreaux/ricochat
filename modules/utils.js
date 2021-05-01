export function rotateField (value) {
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

export function rotateClockWise (map, width) {
    let combineMap = [];
    for (let x = 0; x < width; x++) {
        for (let y = width - 1; y> -1; y--) {
            combineMap.push(rotateField(getFieldXY(map, width, x, y)));
        }
    }
    return combineMap;
}

function getFieldXY (map, width, x, y) {
    const posY = width * y;
    return map[posY + x];
}

export function posToXY (width, pos) {
    const posX = (pos%width);
    const posY = Math.trunc(pos/width)
    return {x:posX,y:posY}
}


export function computePixelXY (width, pos) {
    const fieldWidth = 40;
    const posX = (pos%width) * fieldWidth;
    const posY = Math.trunc(pos/width) * fieldWidth;
    return (posX+"px, "+posY+"px");
}

export function shuffleArray (inputArray){
    inputArray.sort(() => Math.random() - 0.5);
}

export function range (n,p,step) {
    if(step == undefined) step = 1;
    if(n == p) return [n];
    if(n > p) return [];
    return [n].concat(range(n+step,p,step));
}

//-----------------------------------------------------//
export function playCat(){
    const catSound = document.createElement('audio');
    catSound.innerHTML = `
    <source src="assets/cat.mp3" type="audio/mpeg">
    `;
    catSound.play();
    setTimeout(()=> catSound.remove(),800);
}
