var globalLayers = [];
var globalLayerNames = [];

var mainWindow = new Window("window", "Set Matte Applier", undefined);
mainWindow.orientation = "column";

var mainButtonPanel = mainWindow.add("group", undefined, "Push Me");
mainButtonPanel.orientation = "row";
var matteLayerStatic = mainButtonPanel.add("statictext", undefined, "Select Matte Layer:");
var mainButtonDD = mainButtonPanel.add("dropdownlist", undefined, ["Click Refresh to Populate"]);
mainButtonDD.selection = 0
mainButtonDD.size = [160,25]


var applyGroup = mainWindow.add("group", undefined, "Push Me");
applyGroup.orientation = 'row'
var refreshButton = applyGroup.add("button", undefined, "Refresh List");
refreshButton.size = [100,40];
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

refreshButton.onClick = function(){
    init()
}

function getCurrentComp() {
    var existingComp = app.project.activeItem;

    if (existingComp && existingComp instanceof CompItem) {
        return existingComp
    } else {
        return alert("Open A Comp Bitch")
    }
}

function applySetMatte(mainButtonDD) {
    var comp = getCurrentComp()
    var shapeLayersSelected = comp.selectedLayers;
    for (var i = 0; i < shapeLayersSelected.length; i++) {
        var setMatteEffect = shapeLayersSelected[i].property("ADBE Effect Parade").addProperty("ADBE Set Matte3");
        setMatteEffect.property(1).setValue(parseFloat(mainButtonDD.selection)+1)
    }
}

applyButton.onClick = function () {
    app.beginUndoGroup("heckin");

    applySetMatte(mainButtonDD)
    mainWindow.close();

    app.endUndoGroup();
}



