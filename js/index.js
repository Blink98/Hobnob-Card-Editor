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
    document.getElementById("canvasColorBox").style.background = `${canvasColor.value}`;
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

document.addEventListener("keydown", function(event) {
    if (event.key == "Delete") {
        deleteObject();
    }
});

// Adding Rectangle to the canvas
function addRectangle() {
    var rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'yellow',
        width: 100,
        height: 100,
        objectCaching: false,
        strokeWidth: 0
    });

    canvas.add(rect);
    canvas.setActiveObject(rect);
}

const addRectBtn = document.getElementById("addRectBtn");
addRectBtn.addEventListener("click", function () {
   addRectangle(); 
});

// Adding Circle to the canvas
function addCircle() {
    var circle = new fabric.Circle({
        left: 100,
        top: 100,
        fill: 'green',
        objectCaching: false,
        radius: 60
    });

    canvas.add(circle);
    canvas.setActiveObject(circle);
}

const addCircleBtn = document.getElementById("addCircleBtn");
addCircleBtn.addEventListener("click", function () {
    addCircle();
});

// Adding Triangle to the canvas
function addTriangle() {
    var triangle = new fabric.Triangle({
        left: 100,
        top: 100,
        fill: 'red',
        objectCaching: false,
        width: 100,
        height: 100
    });

    canvas.add(triangle);
    canvas.setActiveObject(triangle);
}

const addTriangleBtn = document.getElementById("addTriangleBtn");
addTriangleBtn.addEventListener("click", function () {
    addTriangle();
});

// Change color of selected object
let objectColor = document.getElementById("objectColor");
objectColor.addEventListener("input", function () {
    var activeObject = canvas.getActiveObject();
    activeObject.fill = `${objectColor.value}`;
    canvas.renderAll();    
});
// Deactivate the active object.
function removeSelection() {
    canvas.discardActiveObject();
    canvas.renderAll();
}

// Change width of selected object
document.getElementById("width").addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        let activeObject = canvas.getActiveObject();
        activeObject.set("width", parseInt(`${width.value}`) / activeObject.scaleX);
        canvas.renderAll();
    } 
});

var activeObject = canvas.getActiveObject();
if (activeObject) {
    console.log(activeObject);
}


// Change height of selected object
document.getElementById("height").addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        let activeObject = canvas.getActiveObject();
        activeObject.set("height", parseInt(`${height.value}`) / activeObject.scaleY);
        canvas.renderAll();
    }
});

// // Group objects
// function groupObjects() {
//     // canvas.getActiveObjects().forEach((object) => {
//     //     // do something with object
//     //     console.log(object);
//     //     var activeGroup = [];
//     //     activeGroup.push(object);
//     // });
//     var group = new fabric.Group(canvas.getActiveObjects());
//     var activeGroup = [];
//     for (let object in group) {
//         activeGroup.push(object.clone());
//     }

//     canvas.clear().renderAll();
//     canvas.add(activeGroup);
//     // var activegroup = canvas.getActiveGroup();
//     // var objectsInGroup = activegroup.getObjects();    
    
//     // activegroup.clone(function(newgroup) {
//     //     canvas.discardActiveGroup();
//     //     objectsInGroup.forEach(function(object) {
// 	// 	    canvas.remove(object);  
// 	//     });
//     //     canvas.add(newgroup); 
//     // });
// }

canvas.renderAll();

// Upload image
document.getElementById('uploadImageInput').onchange = function uploadImage(e) {
    let reader = new FileReader();
      reader.onload = function (event){
        let imgObj = new Image();
        imgObj.src = event.target.result;
        imgObj.onload = function () {
            let image = new fabric.Image(imgObj);
            // image.set({
            //     angle: 0
            // });
            canvas.centerObject(image);
            canvas.add(image);
            canvas.renderAll();
        }
    }
    reader.readAsDataURL(e.target.files[0]);
}
var selected_obj = new fabric.Object();

// document.getElementById("width").addEventListener("blur", function(event) {
//     // if (selected_obj != null) {
//     //     selected_obj.set("width",Math.round(parseInt($(this).val())));
//     //     canvas.renderAll();
//     // }
//     if(selected_obj == canvas.getActiveObject() && selected_obj != null){
//         document.getElementById('width').value = Math.round(selected_obj.get('width') * selected_obj.get('scaleX'));
//     } else {
//         document.getElementById('width').value = "";
//     }
// });


// Download the Canvas as PNG.
document.getElementById("downloadCanvas").addEventListener("click", function () {
    // Removing Selection
    removeSelection();
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