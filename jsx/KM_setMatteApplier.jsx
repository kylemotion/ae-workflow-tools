/**
 * Batch set matte applying tool
 * 
 * @title Set Matte Applier
 * @author Kyle Harter <k.harter@glassandmarker.com>
 * @version 0.2.1
 * 5.9.2022
 * 
 * 
*/

(function km_setMatteApplier() {
    

var globalLayers = [];
var globalLayerNames = [];

var mainWindow = new Window("window", "Set Matte Applier", undefined);
mainWindow.orientation = "column";
mainWindow.alignChildren = ["center", "center"];

var setMatteSettingsPanel = mainWindow.add("panel", undefined, "Set Matte Settings");
setMatteSettingsPanel.orientation = "column";
setMatteSettingsPanel.alignChildren = ["left", "fill"]
setMatteSettingsPanel.margins = 15;
    var matteLayerStatic = setMatteSettingsPanel.add("statictext", undefined, "Select Matte Layer:");
    
var mainButtonDD = setMatteSettingsPanel.add("dropdownlist", [0,0,160,25], ["Click Refresh to Populate"]);
mainButtonDD.selection = 0;
var invertMatte = setMatteSettingsPanel.add("checkbox", undefined, "\u00A0Invert Matte");
invertMatte.value = false;

var applyGroup = mainWindow.add("group", undefined, "Push Me");
    applyGroup.orientation = 'row';
    applyGroup.alignChildren = "fill";
var helpButton = applyGroup.add("button", undefined, "Help Me");
// helpButton.size = [25, 25];
helpButton.helpTip = "How to use:\n1. Select layer that will serve as matte in the dropdown\n2. Check Invert Matte for Invert Matte\n3. Click apply!";
var applyButton = applyGroup.add("button", undefined, "Apply Matte");
// applyButton.size = [100, 25];

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

})()