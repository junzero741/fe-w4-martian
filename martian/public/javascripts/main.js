import { drawCircle, renderNumbers } from "./render.js";
import { dom } from "./dom.js";
import {angleList} from "./angles.js";
import {getHexFromMsg, getIdxFromChar} from "./convert.js";

const MESSAGE_FROM_EARTH = "hello";
let hexMsg = getHexFromMsg(MESSAGE_FROM_EARTH);


const toggleMode = (event, trigger, target, buttonList) => {
    trigger.addEventListener(`${event}`, function () {
        changeInnerHtml(target, "수신모드", "발신모드");
        disableButton(target, buttonList);
        initInput([dom.hexInfo.input, dom.strInfo.input]);
        runMode(dom.modeInfo.str.innerHTML);
    });
}

const changeInnerHtml = (dom, before, after) => {
    dom.innerHTML = (dom.innerHTML === before) ? after : before;
    return dom.innerHTML;
}

const disableButton = (target, buttonList) => {
    if (target.innerHTML === "수신모드") {
        buttonList.forEach((el) => el.disabled = true);
    } else {
        buttonList.forEach((el) => {
            if (el.className === "hex_info_submit") el.disabled = true;
            else el.disabled = false;
        });
    }
}

const initInput = (inputList) => {
    inputList.forEach((el) => el.value = "");
}


const rotateObject = (event, target, angle) => {
    target.addEventListener(`${event}`, () => {
        angle += 0.0625;
        target.style.transform = `rotate(${angle}turn)`;
        console.log(angle);
    })
}

const runMode = (mode) => {
    if (mode === "수신모드") runReceiveMode();
    else runSendMode();
}


const runReceiveMode = () => {
    const SECONDS = 3000;
    const timer = () => {
        setTimeout (() => {
            const firstChar = hexMsg.slice(0,1);
            hexMsg = hexMsg.substring(1);
            if(dom.modeInfo.str.innerHTML !== "수신모드") return;
            if(firstChar !== "") {
                rotateArrow(firstChar);
                timer();
            } else {
                clearTimeout();
            }

        }, SECONDS);
    }
    timer();
}



const rotateArrow = (char) => {
    const idx = getIdxFromChar(char);

    dom.arrow.style.transform = `rotate(` + angleList[idx] + `turn)`;
    console.log(idx);

}

const runSendMode = () => {
    //   console.log("sendMode run")
}


const init = () => {
    const ROTATE_ANGLE = 0.03;

    drawCircle();
    renderNumbers();
    toggleMode("click", dom.modeInfo.button, dom.modeInfo.str, [dom.hexInfo.button, dom.strInfo.button]);
    rotateObject("click", dom.arrow, ROTATE_ANGLE);
    runMode(dom.modeInfo.str.innerHTML);


}
init();