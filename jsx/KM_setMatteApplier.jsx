/**
 * Batch set matte applying tool
 * 
 * @author: Kyle Harter <k.harter@glassandmarker.com>
 * @version 0.2.0
 * 5.9.2022
 * 
 * 
*/


var globalLayers = [];
var globalLayerNames = [];

var mainWindow = new Window("window", "Set Matte Applier", undefined);
mainWindow.orientation = "column";

var mainButtonPanel = mainWindow.add("group", undefined, "Push Me");
mainButtonPanel.orientation = "row";
var matteLayerStatic = mainButtonPanel.add("statictext", undefined, "Select Matte Layer:");
var mainButtonDD = mainButtonPanel.add("dropdownlist", undefined, ["Click Refresh to Populate"]);
mainButtonDD.selection = 0;
mainButtonDD.size = [160, 25];
var invertMatte = mainButtonPanel.add("checkbox", undefined, "Invert Matte");
invertMatte.value = false;

// var extraSettingsPanel = mainWindow.add("panel", undefined,);
// extraSettingsPanel.orientation = "row";
// extraSettingsPanel.size = [250, 35];
// var useForMatteDropDown = extraSettingsPanel.add("dropdownlist", undefined, ["Use For Matte"]);
// useForMatteDropDown.selection = 0;
// useForMatteDropDown.size = [160,25]


var applyGroup = mainWindow.add("group", undefined, "Push Me");
applyGroup.orientation = 'row'
var helpButton = applyGroup.add("button", undefined, "Help Me");
helpButton.size = [100, 40];
helpButton.helpTip = "How to use:\n1. Select layer that will serve as matte in the dropdown\n2. Check Invert Matte for Invert Matte\n3. Click apply!";
var applyButton = applyGroup.add("button", undefined, "Apply Matte");
applyButton.size = [100, 40];

mainWindow.center();
mainWindow.show();



function init(){
    globalLayers = [];
    globalLayerNames = [];
    mainButtonDD.removeAll();
    
    var existingComp = app.project.activeItem;
    
    if(existingComp && existingComp instanceof CompItem){
        for(var i = 1; i<=existingComp.numLayers; i++){
            globalLayers.push(existingComp.layer(i));
            globalLayerNames.push(i.toString() + ". " + existingComp.layer(i).name);
            mainButtonDD.add("item", globalLayerNames[globalLayerNames.length-1])

            if(existingComp.layer(i) instanceof AVLayer && existingComp.layer(i).canSetCollapseTransformation){
                existingComp.layer(i).collapseTransformation = true
            }

        }
    } else {
        alert("Select Your Composition First")
    }
    
    mainButtonDD.selection = 0;
}

var layerList = init();

helpButton.onClick = function(){
    alert(helpButton.helpTip)
}

function getCurrentComp() {
    var existingComp = app.project.activeItem;

    if (existingComp && existingComp instanceof CompItem) {
        return existingComp
    } else {
        return alert("Open A Comp")
    }
}

function applySetMatte(mainButtonDD, invertMatte) {
    var comp = getCurrentComp();
    var layersSelected = comp.selectedLayers;
    for (var i = 0; i < layersSelected.length; i++) {
        var setMatteEffect = layersSelected[i].property("ADBE Effect Parade").addProperty("ADBE Set Matte3");
        setMatteEffect.property(1).setValue(parseFloat(mainButtonDD.selection) + 1);
        if (invertMatte.value == false) {
            setMatteEffect.property(3).setValue(false);
        } else if (invertMatte.value == true){
            setMatteEffect.property(3).setValue(true);
        }
    }
}

applyButton.onClick = function () {
    app.beginUndoGroup("heckin");

    applySetMatte(mainButtonDD, invertMatte);
    mainWindow.close();

    app.endUndoGroup();
}


