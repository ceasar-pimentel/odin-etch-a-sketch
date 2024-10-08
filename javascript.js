// in this project you have to construct the page with only javascript.
/*
    plan of attack
    1. use flex box to create a square box where the height is equal to the length.]
    2. calculate the width of the box oby dividing the full width of the container by the amount of boxes from user input
    3. use hover event to change color of the box. 
*/

// builds the basic layout for divs that will contain the header and etch a sketch portion of the page.
// will set variables to hold the header elemenet and main body element so document doesnt have to search from beginning 

// dom objects
let body = null;
let container = null;
let etchDiv = null;
let form = null;
let header = null;
let input = null;
let inputBtn = null;
let main = null;


// fields;
// let bodyWidth = null;
let baseWidth = null;

//#region page layout and styling 

function initializeDomObjects() {
    body = document.querySelector("body");
    container = document.querySelector("#container");
    etchDiv = main = document.createElement("div");
    form = document.createElement("form");
    inputBtn = document.createElement("input");
    input = document.createElement("input");
    header = document.createElement("div");
    main = document.createElement("div");
}

function buildBody() {
    body.style.padding = "0px";
    body.style.margin = "0px";
}

function buildHeader() {
    header.style.display = "flex";
    header.style.justifyContent = "center";
    header.id = "header";

    input.style.margin = "5px";
    input.type = "text";

    inputBtn.type = "button";
    inputBtn.value = "draw";

    form.appendChild(input);
    form.appendChild(inputBtn);
    header.appendChild(form);

}

function buildEtchASketch() {
    main.id = "main";
    main.style.textAlign = "center";
    main.style.margin = "8px";
    etchDiv.id = "etch-div";
    etchDiv.style.display = "inline-flex";
    etchDiv.style.flexWrap = "wrap";
    etchDiv.style.justifyContent = "center";
    etchDiv.style.alignItems = "center";
    etchDiv.style.gap = "0px";
    etchDiv.style.width = "50%";
    etchDiv.style.aspectRatio = "1/1";
    etchDiv.style.margin = "auto";
    etchDiv.style.borderStyle = "solid";
}

function buildLayout() {
    buildBody();
    buildHeader();
    buildEtchASketch();

    main.appendChild(etchDiv);
    container.appendChild(header);
    container.appendChild(main);
}

//#endregion

//#region game logic

function calculateSquareSize(numOfSquares, etchDivWidth) {
    let squareWidth = Math.floor((etchDivWidth) / numOfSquares);
    return squareWidth;
}

function removeAllPixels() {
    let children = Array.from(etchDiv.children);
    children.forEach((child) => {
        etchDiv.removeChild(child);
    });
}
/* 
function recalculateBodyPadding(squareSize,  numOfSquares) {
    // updating the window width in case it might have changed
    bodyWidth = body.getBoundingClientRect().width;
   
    let calculatedWidth = squareSize * numOfSquares;
    let newCalcPadding = Math.ceil(((bodyWidth - calculatedWidth)-4)/2); 
    console.log(`squareSize: ${squareSize} windowWidth: ${bodyWidth} calculatedWith: ${calculatedWidth} new calc padding: ${newCalcPadding}`);
    return newCalcPadding;
}
*/

function constructBoard() {

    let num = Number(input.value);

    if(baseWidth == null) {
        baseWidth = etchDiv.getBoundingClientRect().width;
    }

    // removing and clearing the board in case there was prior drawing.
    removeAllPixels();

    if (Number.isNaN(num)) {
        return;
    }


    let squareSize = calculateSquareSize(num, baseWidth);
    let squares = num * num;
    let newEtchDivWidth = (squareSize * num);

    etchDiv.style.width = `${newEtchDivWidth}px`;

    //let newPadding = recalculateBodyPadding(squareSize, num);
    //body.style.padding = `16px ${newPadding}px`;

    for (let i = 0; i < squares; i++) {
        let pixel = document.createElement("div");
        pixel.style.flexBasis = `${squareSize}px`;
        pixel.style.aspectRatio = "1/1";
        pixel.onmouseenter = (event) => {
            event.target.style.backgroundColor = "black";
        };
        etchDiv.appendChild(pixel);
    }
}

//#endregion

function initializePage() {
    initializeDomObjects();
    buildLayout();
}

document.addEventListener("DOMContentLoaded", () => {
    initializePage();
    inputBtn.addEventListener("click", constructBoard);
})

