/**
 * Creates color palette based on submitted hex codes
 * 
 * @author: Kyle Harter <k.harter@glassandmarker.com>
 * @version 0.2.3
 * 6.4.2022
 * 
 * 
*/


(function km_colorPaletteGenerator(thisObj) {

    var existingComp = app.project.activeItem;
    if (!(existingComp && existingComp instanceof CompItem)) {
        alert("Please open a comp first!");
        return
    }


    createUI(thisObj)

    function createUI(thisObj) {

        var scriptName = "km_colorPaletteGenerator"

        var win = thisObj instanceof Panel
            ? thisObj
            : new Window("window", scriptName, undefined, {
                resizeable: true
            })
        
        win.orientation = 'column';
        win.alignChildren = ["fill", "fill"];

        var editGroup = win.add("group", undefined, "Edit Group");
        editGroup.orientation = "column";
        editGroup.alignChildren = ["fill", "fill"];
        var editTitle = editGroup.add("statictext", undefined, "Enter Color Palette Hex Codes Below:")
        var editBox = editGroup.add("edittext", [0, 0, 150, 100], "Enter Hex Codes Here", { multiline: true });

        var createGroup = win.add("group", undefined, "Create Group");
        createGroup.alignChildren = ["fill", "fill"];
        createGroup.orientation = 'column';
        var createButton = createGroup.add("button", undefined, "Create Color Palette");


        createButton.onClick = function () {
            app.beginUndoGroup("Color Palette Group")
    
            var squareParams = {
                'squareSize': 100
            }
            
            createColorPaletteComp(editBox.text, squareParams)
            win.close();
            app.endUndoGroup()

        }

        win.layout.layout();
            win.onResizing = function () {
                this.layout.resize()
        }

        win.show();
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


    function hexToRGB(editBox) {
        var colorArray = new Array();
        var list = editBox.trim();
        var lineAmount = list.split("\n");
        for (var i = 0; i < lineAmount.length; i++) {
            var hexString = lineAmount[i];
            var newString = hexString.replace(/[#]/g,"");
            var hexColor = "0x" + newString;
                var r = hexColor >> 16;
                var g = (hexColor & 0x00ff00) >> 8;
                var b = hexColor & 0xff;
                colorArray.push([r / 255, g / 255, b / 255]);
            }

        return colorArray
    } 


    function createColorPaletteComp(editBox, squareParams) {
        var comp = existingComp;
        var colorArray = hexToRGB(editBox);
        var colorPalComp = app.project.items.addComp("Color Palette", (colorArray.length * squareParams.squareSize), squareParams.squareSize, 1.0, comp.duration, 24);
        var colorPalFolder = app.project.items.addFolder("Color Palette Comp");
        colorPalComp.parentFolder = colorPalFolder;
        colorPalFolder.parentFolder = getPreCompFolderName()[0];
        comp.layers.add(colorPalComp);
        var colorComp = comp.layer("Color Palette").source;
        var colorControls = colorComp.layers.addShape();
        colorControls.name = "Color Controls";
        colorControls.property("ADBE Transform Group").property("ADBE Position").setValue([0, squareParams.squareSize]);
        // var lineArray = lineArray(editBox);

        for (var i = 0; i < colorArray.length; i++) {
            var colorControlEffect = colorControls.property("ADBE Effect Parade").addProperty("ADBE Color Control");
            var count = i + 1;
            colorControlEffect.name = "Color-" + count;
            colorControlEffect.property(1).setValue(colorArray[i])
            var colorSquare = colorComp.layers.addShape();
            colorSquare.name = "Color-" + count;
            var contents = colorSquare.property("ADBE Root Vectors Group");
            var shapeRect = contents.addProperty("ADBE Vector Shape - Rect");
            var shapeFill = contents.addProperty("ADBE Vector Graphic - Fill");
            shapeFill.property("ADBE Vector Fill Color").expression =
                'thisComp.layer("Color Controls").effect("Color-" + ' + count + ')(1)';
            shapeRect = contents.property("ADBE Vector Shape - Rect");
            var rectSize = shapeRect.property("ADBE Vector Rect Size");
            rectSize.setValue([squareParams.squareSize, squareParams.squareSize]);
            var rectPos = shapeRect.property("ADBE Vector Rect Position");
            colorSquare.label = 3;
            colorSquare.parent = colorComp.layer("Color Controls");
            var colorTrans = colorSquare.property("ADBE Transform Group");
            colorTrans.property("ADBE Anchor Point").expression =
                'l = thisLayer.sourceRectAtTime();\
    x = l.left;\
    y = l.top + l.height;\
    [x,y]'

            if (colorComp.layer("Color-" + count).name.split("-")[1] > 1) {
                var posMult = (count - 1) * squareParams.squareSize;
                colorTrans.property("ADBE Position").setValue([posMult, 0])
            } else {
                colorTrans.property("ADBE Position").setValue([0, 0])
            }

            colorSquare.moveToEnd()

        }

        var colorLayer = colorComp.layer("Color Controls");

        for (var e = 1; e <= colorLayer.Effects.numProperties; e++) {

            colorLayer.effect(e).property(1).addToMotionGraphicsTemplateAs(colorComp, colorLayer.effect(e).name);
        }


        var colorCompTrans = comp.layer("Color Palette").property("ADBE Transform Group");
        colorCompTrans.property("ADBE Anchor Point").expression =
            'l = thisLayer.sourceRectAtTime();\
    x = l.left;\
    y = l.top + l.height;\
    [x,y]'

        colorCompTrans.property("ADBE Position").setValue([0, comp.height]);

        comp.layer("Color Palette").guideLayer = true;
        comp.layer("Color Palette").moveToBeginning();
        comp.layer("Color Palette").locked = true;


    }
})(this)