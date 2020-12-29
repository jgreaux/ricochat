const map1 = [0,0,0,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,0,0,4,0,13,0,0,0,0,0,3,0,0,0,0,0,0,8,0,17,0,0,0,0,0,0,0,0,0,0,0,0,0];
const map2 = [0,1,2,0,0,0,0,0,0,0,0,0,7,0,0,0,0,13,0,0,0,0,0,0,0,0,0,0,0,0,14,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,3,0,0,12,0,0,0,0,0,0,0,0,0,0,0];
const map3 = [0,0,0,1,2,0,0,0,0,0,0,0,0,16,0,0,0,6,0,0,0,0,0,0,4,0,0,0,0,0,0,0,3,0,0,0,0,0,19,0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0];
const map4 = [0,0,0,0,1,2,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,0,0,0,0,0,0,4,0,0,0,0,0,19,0,3,0,0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,22,0,0,0];

const mapCount = (mp, mapName)=>{
    console.log(mapName + ' = ' + mp.length);
}

mapCount(map1, 'map1');
mapCount(map2, 'map2');
mapCount(map3, 'map3');
mapCount(map4, 'map4');

//-----------------------------------------------------//

let playground = document.getElementById('playground');

const mapToDOM = (map, dom)=>{
    map.forEach(element => {
        let field = document.createElement('div');
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

mapToDOM(map1,playground);

