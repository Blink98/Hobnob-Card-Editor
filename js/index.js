// Closing 3 extended sidebars and opening/closing 1.
let extendedSidebars = document.getElementsByClassName("extended-sidebar");
function togglingCurrentExtSidebar(currentExtSidebar) {
    for (let numOfExtendedSidebar=0; numOfExtendedSidebar<4; numOfExtendedSidebar++) {
        let sidebarBtnPath = document.getElementsByClassName("sidebar-btn")[numOfExtendedSidebar].childNodes[1].childNodes[1];
        let sidebarBtnLabel = document.getElementsByClassName("sidebar-btn-label");

        // Changing styles according to need.
        if (numOfExtendedSidebar === currentExtSidebar) {
            extendedSidebars[numOfExtendedSidebar].classList.toggle("hide-element");
            sidebarBtnPath.style.fill = "rgb(255, 183, 3)";
            sidebarBtnLabel[numOfExtendedSidebar].style.color = "rgb(255, 183, 3)";
        } else {
            extendedSidebars[numOfExtendedSidebar].classList.add("hide-element");
            sidebarBtnPath.style.fill = "rgb(255, 255, 255)";
            sidebarBtnLabel[numOfExtendedSidebar].style.color = "rgb(255, 255, 255)";
        }
    }
}

// Template button and it's extended sidebar
const templateBtn = document.getElementById("templateBtn");

templateBtn.addEventListener("click", function () { 
    togglingCurrentExtSidebar(0);
});

// Uplaod button and it's extended sidebar
const uploadBtn = document.getElementById("uploadBtn");

uploadBtn.addEventListener("click", function () { 
    togglingCurrentExtSidebar(1);
});

// Elements button and it's extended sidebar
const elementsBtn = document.getElementById("elementsBtn");

elementsBtn.addEventListener("click", function () {
    togglingCurrentExtSidebar(2);
});

// Text button and it's extended sidebar
const textBtn = document.getElementById("textBtn");

textBtn.addEventListener("click", function () { 
    togglingCurrentExtSidebar(3);
});


// Canvas
const canvas = new fabric.Canvas('canvas', {
    width: 595,
    height: 340,
});
// Change Canvas Color
let canvasColor = document.getElementById("canvasColor");
canvasColor.addEventListener("input", function () {
    canvas.setBackgroundColor(`${canvasColor.value}`, canvas.renderAll.bind(canvas));    
})
// Customising object controls
fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.cornerColor = 'blue';
fabric.Object.prototype.cornerStyle = 'circle';

// Deleting an object/element from the canvas
function deleteObject() {
    canvas.getActiveObjects().forEach((obj) => {
        canvas.remove(obj)
    });
    canvas.discardActiveObject().renderAll()
}

// Adding Rectangle to the canvas
function addRectangle() {
    var rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'yellow',
        width: 200,
        height: 100,
        objectCaching: false,
        stroke: 'blue',
        strokeWidth: 0
    });

    canvas.add(rect);
    canvas.setActiveObject(rect);
}

const addRectBtn = document.getElementById("addRectBtn");

addRectBtn.addEventListener("click", function () {
   addRectangle(); 
});

let objectColor = document.getElementById("objectColor");
objectColor.addEventListener("input", function () {
    var activeObject = canvas.getActiveObject();
    activeObject.fill = `${objectColor.value}`;
    canvas.renderAll();    
});

canvas.renderAll();

// Download the Canvas as PNG.
document.getElementById("downloadCanvas").addEventListener("click", function () {
    // Name of the file/card
    let cardName = document.getElementById("cardName").value;
    // Referencing the canvas
    let canvas = document.getElementById("canvas");
    canvas.click();
    let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let link = document.createElement('a');
    link.download = `${cardName}.png`;
    link.href = image;
    link.click();
});