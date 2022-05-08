var mainWindow = new Window("window", "Color Palette Generator", undefined);
mainWindow.orientation = 'column';


var editGroup = mainWindow.add("group", undefined, "Edit Group");
editGroup.orientation = "column";
editGroup.alignChildren = "center"
var editTitle = editGroup.add("statictext", undefined, "Enter Color Palette Hex Codes Below:")
var editBox = editGroup.add("edittext", [0,0,150, 100], "Enter Hex Codes Here",{multiline: true});

var createGroup = mainWindow.add("group", undefined, "Create Group");
createGroup.orientation = 'column';
var createButton = createGroup.add("button", undefined, "Create Color Palette")


mainWindow.center();
mainWindow.show()


createButton.onClick = function(){
    app.beginUndoGroup("Color Palette Group")

    var squareParams = {
        'squareSize': 100
    }

    createColorPaletteComp(editBox, squareParams)
    app.endUndoGroup()
}

function getCurrentComp(){
    var existingComp = app.project.activeItem
    if(existingComp && existingComp instanceof CompItem){
        existingComp.openInViewer()
        return existingComp
    } else {
        alert("Select a composition first")
    }
}
function getPreCompFolderName() {
    var folderName = "02 PreComps";
    if (typeof folderName === "string") {
        var folderArray = new Array();
        var proj = app.project;
        var itemCount = proj.numItems;
        for (var i = 1; i <= itemCount; i++) {
            var curItem = proj.item(i);
            if (curItem instanceof FolderItem) {
                if (curItem.name == folderName) {
                    folderArray.push(curItem)
                } 
            }
        }
    }
    if (folderArray.length > 0) {
        return folderArray
    } else {
        var preCompFolder = proj.items.addFolder("02 PreComps");
        folderArray.push(preCompFolder);
        return folderArray
    }
 
}

function colorControlArray(editBox){
    var lineArray = new Array();
    var lineAmount = editBox.text.split("\n");
    for(var i = 0; i<lineAmount.length; i++){
        lineArray.push(lineAmount[i])
    }
    
    return lineArray
}

function createColorPaletteComp(editBox, squareParams){
    var comp = getCurrentComp();
    var colorPalComp = app.project.items.addComp("Color Palette", (colorControlArray(editBox).length*squareParams.squareSize), squareParams.squareSize, 1.0, comp.duration,24);
    var colorPalFolder = app.project.items.addFolder("Color Palette Comp");
            colorPalComp.parentFolder = colorPalFolder;
            colorPalFolder.parentFolder = getPreCompFolderName()[0];
    comp.layers.add(colorPalComp);
    var colorComp = comp.layer("Color Palette").source;
    var colorControls = colorComp.layers.addShape();
    colorControls.name = "Color Controls";
    colorControls.property("ADBE Transform Group").property("ADBE Position").setValue([0,squareParams.squareSize]);
    var lineArray = colorControlArray(editBox);

    for( var i = 0; i < lineArray.length; i++){
        var colorControlEffect = colorControls.property("ADBE Effect Parade").addProperty("ADBE Color Control");
        var count = i+1;
        colorControlEffect.name = "Color-" + count;
        colorControlEffect.property(1).expression = 
        'hexToRgb("'+lineArray[i]+'")'
        var colorSquare = colorComp.layers.addShape();
        colorSquare.name = "Color-" + count;
        var contents = colorSquare.property("ADBE Root Vectors Group");
        var shapeRect = contents.addProperty("ADBE Vector Shape - Rect");
        var shapeFill = contents.addProperty("ADBE Vector Graphic - Fill");
        shapeFill.property("ADBE Vector Fill Color").expression = 
'thisComp.layer("Color Controls").effect("Color-" + '+count+')(1)';
    shapeRect = contents.property("ADBE Vector Shape - Rect");
    var rectSize = shapeRect.property("ADBE Vector Rect Size");
    rectSize.setValue([squareParams.squareSize,squareParams.squareSize]);
    var rectPos = shapeRect.property("ADBE Vector Rect Position");
/*     rectPos.expression = 'x = 0;\
                        y = 0;\
                        [x, y]'; */
    colorSquare.label = 3;
    colorSquare.parent = colorComp.layer("Color Controls");
    var colorTrans = colorSquare.property("ADBE Transform Group");
    colorTrans.property("ADBE Anchor Point").expression = 
'l = thisLayer.sourceRectAtTime();\
x = l.left;\
y = l.top + l.height;\
[x,y]'    

    if(colorComp.layer("Color-" + count).name.split("-")[1] > 1){
        var posMult = (count-1) * squareParams.squareSize;
        colorTrans.property("ADBE Position").setValue([posMult,0])
    } else {
        colorTrans.property("ADBE Position").setValue([0,0])
    }

    colorSquare.moveToEnd()

    }

    var colorLayer = colorComp.layer("Color Controls");

    for( var e = 1; e <= colorLayer.Effects.numProperties; e++){
        
        colorLayer.effect(e).property(1).addToMotionGraphicsTemplateAs(colorComp, colorLayer.effect(e).name);
    }

    
    var colorCompTrans = comp.layer("Color Palette").property("ADBE Transform Group");
    colorCompTrans.property("ADBE Anchor Point").expression = 
'l = thisLayer.sourceRectAtTime();\
x = l.left;\
y = l.top + l.height;\
[x,y]'   

    colorCompTrans.property("ADBE Position").setValue([0,comp.height]);

    comp.layer("Color Palette").guideLayer = true;
    comp.layer("Color Palette").moveToBeginning();
    comp.layer("Color Palette").locked = true;


}







