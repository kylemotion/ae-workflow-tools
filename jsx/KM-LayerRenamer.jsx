var mainWindow = new Window("window", "Layer Renamer", undefined);
mainWindow.orientation = "column";

var layerNameSepPanel = mainWindow.add("panel", undefined);
layerNameSepPanel.orientation = "row";
layerNameSepPanel.alignChildren = "left";
var layerNameEditGroup = layerNameSepPanel.add("group", undefined, "Layer Name Group");
layerNameEditGroup.orientation = "column";
layerNameEditGroup.alignChildren = "left";
var layerNameStatic = layerNameEditGroup.add("statictext", undefined, "Layer Name");
var layerNameEdit = layerNameEditGroup.add("edittext", undefined, "New Layer Name");
layerNameEdit.characters = 20;
var separatorGroup = layerNameSepPanel.add("group", undefined, "Separator Group");
separatorGroup.orientation = "column";
separatorGroup.alignChildren = "left";
var separatorStatic = separatorGroup.add("statictext", undefined, "Seperator")
var separatorEdit = separatorGroup.add("edittext", undefined, "-")
separatorEdit.characters = 5;

var renameGroup = mainWindow.add("group", undefined, "Rename Group");
var renameButton = renameGroup.add("button", undefined, "Rename");
renameButton.size = [100,25]

mainWindow.center();
mainWindow.show();

renameButton.onClick = function () {
    setNames(layerNameEdit, separatorEdit);
    mainWindow.close();
}

function getCurrentComp(){
    var existingComp = app.project.activeItem;
    if(existingComp && existingComp instanceof CompItem){
        return existingComp
    } else {
        alert("Select a composition first")
    }
}

function setNames(layerNameEdit, separatorEdit){
    var layersNeedNames = getCurrentComp().selectedLayers;
    if(layersNeedNames < 1){
        return alert("Select a layer first");
    } else {
        for(var i = 0; i<layersNeedNames.length; i++){
            count = i + 1;
            layersNeedNames[i].name = layerNameEdit.text + separatorEdit.text + count
        }
    }
}

