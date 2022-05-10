/**
 * Set Anchor Point of Position Property in Shape Group 
 * 
 * @author: Kyle Harter <k.harter@glassandmarker.com>
 * @version 0.1.3
 * 4.27.2022
 * 
 * 
*/

(function shapeAnchor(){

var mainWindow = new Window("window", "Shape Anchor", undefined);
mainWindow.orientation = "column";

var buttonsGroup = mainWindow.add("panel", undefined, "Shape Anchor Position");
    buttonsGroup.orientation = "column";
    buttonsGroup.spacing = 10;
var topRowButtonsGroup = buttonsGroup.add("group", undefined, "Top Row Group");
var topLeftButton = topRowButtonsGroup.add("Button", undefined, "TL");
topLeftButton.preferredSize = [25,25];
topLeftButton.helpTip = "Top Left";
var topMiddleButton = topRowButtonsGroup.add("Button", undefined, "TM");
topMiddleButton.preferredSize = [25,25];
topMiddleButton.helpTip = "Top Middle";
var topRightButton = topRowButtonsGroup.add("Button", undefined, "TR");
topRightButton.preferredSize = [25,25];
topRightButton.helpTip = "Top Right";

var midRowButtonsGroup = buttonsGroup.add("group", undefined, "Mid Row Group");
var midLeftButton = midRowButtonsGroup.add("Button", undefined, "ML");
midLeftButton.preferredSize = [25,25];
midLeftButton.helpTip = "Middle Left";
var middleButton = midRowButtonsGroup.add("Button", undefined, "MM");
middleButton.preferredSize = [25,25];
middleButton.helpTip = "Middle";
var midRightButton = midRowButtonsGroup.add("Button", undefined, "MR");
midRightButton.preferredSize = [25,25];
midRightButton.helpTip = "Middle Right";

var botRowButtonsGroup = buttonsGroup.add("group", undefined, "Bottom Row Group");
var botLeftButton = botRowButtonsGroup.add("Button", undefined, "BL");
botLeftButton.preferredSize = [25,25];
botLeftButton.helpTip = "Bottom Left";
var botMiddleButton = botRowButtonsGroup.add("Button", undefined, "BM");
botMiddleButton.preferredSize = [25,25];
botMiddleButton.helpTip = "Bottom Middle";
var botRightButton = botRowButtonsGroup.add("Button", undefined, "BR");
botRightButton.preferredSize = [25, 25];
botRightButton.helpTip = "Bottom Right"
    
var bottomRoundnessGroup = mainWindow.add("panel", undefined, "Roundness Expression");
var roundnessButton = bottomRoundnessGroup.add("Button", undefined, "");
roundnessButton.text = 'Roundness';
roundnessButton.preferredSize = [100, 25];
roundnessButton.helpTip = "Apply to Roundness property on parametric shape"
    
var bottomHelpGroup = mainWindow.add("panel", undefined, "Help");
bottomHelpGroup.orientation = "column";
var questionButton = bottomHelpGroup.add("Button", undefined, "What do I do?");
questionButton.preferredSize = [100, 25];
questionButton.helpTip = "This script applies expressions to the position property of a parametric shape group. It's ideal for rectangles and ellipses."
var howWorkButton = bottomHelpGroup.add("Button", undefined, "How do I work?");
howWorkButton.preferredSize = [100,25];
howWorkButton.helpTip = "Select the position properties inside of the shape groups that you wish to apply the position to. Click your desired button to apply the expression to."


mainWindow.show();
mainWindow.center();

topLeftButton.onClick = function(){
    app.beginUndoGroup("Top Left");
    topLeftPos();
    mainWindow.close();
app.endUndoGroup()
}

topMiddleButton.onClick = function(){
    app.beginUndoGroup("Top Middle");
    topMiddlePos();
    mainWindow.close();
app.endUndoGroup()
}

topRightButton.onClick = function(){
    app.beginUndoGroup("Top Right");
    topRightPos();
    mainWindow.close();
app.endUndoGroup()
}

midLeftButton.onClick = function(){
    app.beginUndoGroup("Mid Left");
    midLeftPos();
    mainWindow.close();
app.endUndoGroup()
}

middleButton.onClick = function(){
    app.beginUndoGroup("Mid");
    midPos();
    mainWindow.close();
app.endUndoGroup()
}

midRightButton.onClick = function(){
    app.beginUndoGroup("Mid Right");
    midRightPos();
    mainWindow.close();
app.endUndoGroup()
}

botLeftButton.onClick = function(){
    app.beginUndoGroup("Top Right");
    botLeftPos();
    mainWindow.close();
app.endUndoGroup()
}

botMiddleButton.onClick = function(){
    app.beginUndoGroup("Bot Mid");
    botMidPos();
    mainWindow.close();
app.endUndoGroup()
}

botRightButton.onClick = function(){
app.beginUndoGroup("Bot Right");
    botRightPos();
    mainWindow.close();
app.endUndoGroup()
}

questionButton.onClick = function(){
    alert(questionButton.helpTip)
}

howWorkButton.onClick = function(){
    alert(howWorkButton.helpTip)
}

roundnessButton.onClick = function () {
    app.beginUndoGroup("roundness");
    roundnessExpression();
    mainWindow.close();
    app.endUndoGroup()
}    
    
    
function getCurrentComp() {
    var comp = app.project.activeItem;
    if (comp && comp instanceof CompItem) {
        return comp
    } else {
        return alert("Select or open a comp to place the layer in")
    }
}

function compSelectedProperties(){
    var comp = getCurrentComp();
    var propArray = new Array();
    var compProps = comp.selectedProperties;
    for(var m = 0; m < compProps.length; m++){
        propArray.push(compProps[m]);
    }

    return propArray;
}

function topLeftPos(){
    var props = compSelectedProperties();    
    for(var i = 0; i<props.length; i++){
        props[i].expression = 
'var shapeGroup = thisProperty.propertyGroup(1);\
var shapeSize = shapeGroup.size;\
x = shapeSize[0]/2;\
y = shapeSize[1]/2;\
[x,y]'
    }
}

function topMiddlePos(){
    var props = compSelectedProperties();    
    for(var i = 0; i<props.length; i++){
        props[i].expression = 
'var shapeGroup = thisProperty.propertyGroup(1);\
var shapeSize = shapeGroup.size;\
x = 0;\
y = shapeSize[1]/2;\
[x,y]'
    }
}

function topRightPos(){
    var props = compSelectedProperties();    
    for(var i = 0; i<props.length; i++){
        props[i].expression = 
'var shapeGroup = thisProperty.propertyGroup(1);\
var shapeSize = shapeGroup.size;\
x = shapeSize[0]/-2;\
y = shapeSize[1]/2;\
[x,y]'
    }
}

function midLeftPos(){
    var props = compSelectedProperties();    
    for(var i = 0; i<props.length; i++){
        props[i].expression = 
'var shapeGroup = thisProperty.propertyGroup(1);\
var shapeSize = shapeGroup.size;\
x = shapeSize[0]/2;\
y = 0;\
[x,y]'
    }
}

function midPos(){
    var props = compSelectedProperties();    
    for(var i = 0; i<props.length; i++){
        props[i].expression = 
'x = 0;\
y = 0;\
[x,y]'
    }
}

function midRightPos(){
    var props = compSelectedProperties();    
    for(var i = 0; i<props.length; i++){
        props[i].expression = 
'var shapeGroup = thisProperty.propertyGroup(1);\
var shapeSize = shapeGroup.size;\
x = shapeSize[0]/-2;\
y = 0;\
[x,y]'
    }
}

function botLeftPos(){
    var props = compSelectedProperties();    
    for(var i = 0; i<props.length; i++){
        props[i].expression = 
'var shapeGroup = thisProperty.propertyGroup(1);\
var shapeSize = shapeGroup.size;\
x = shapeSize[0]/2;\
y = shapeSize[1]/-2;\
[x,y]'
    }
}

function botMidPos(){
    var props = compSelectedProperties();    
    for(var i = 0; i<props.length; i++){
        props[i].expression = 
'var shapeGroup = thisProperty.propertyGroup(1);\
var shapeSize = shapeGroup.size;\
x = 0; \
y = shapeSize[1]/-2;\
[x,y]'
    }
}

function botRightPos(){
    var props = compSelectedProperties();    
    for(var i = 0; i<props.length; i++){
        props[i].expression = 
'var shapeGroup = thisProperty.propertyGroup(1);\
var shapeSize = shapeGroup.size;\
x = shapeSize[0]/-2;\
y = shapeSize[1]/-2;\
[x,y]'
    }
}
    
function roundnessExpression() {
    var props = compSelectedProperties();
    for (var i = 0; i < props.length; i++) {
        props[i].expression =
'shapeRoundness = value;\
var shapeGroup = thisProperty.propertyGroup(1);\
var shapeSize = shapeGroup.size;\
xSize = shapeSize[0];\
ySize = shapeSize[1];\
smallestSize = Math.min(xSize, ySize);\
(smallestSize / 2) * shapeRoundness * .01'
    }

}    
    

})();