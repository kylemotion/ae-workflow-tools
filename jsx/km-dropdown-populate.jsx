/**
 * 
 * creates a drop down menu on a control layer to setup templates
 * 
 * 
 * 
 * 
*/

function getCurrentLayers(){
    var compLayerSelection = activeComp.selectedLayers;
    if(compLayerSelection.length < 1){
        alert("Select atleast 1 layer first. Try again")
        return
    } else {
        return compLayerSelection
    }
}

function populateDropDown(){
    var compLayers = activeComp.layers;
    var layerSelection = getCurrentLayers();
    var layerSelNames = new Array();

    for(var i = 0; i<layerSelection.length;i++){
        layerSelNames.push(layerSelection[i].name);
    }

    if(!(activeComp.layer("Controls"))){
        var controlsLayer = activeComp.layers.addShape();
        controlsLayer.name = "Controls";
    } else {
        var controlsLayer = activeComp.layer("Controls") 
    }

    var controlsDropdown = controlsLayer.property("ADBE Effect Parade").addProperty("ADBE Dropdown Control");
    controlsDropdown.name = "Drop me baby";
    var controlsMenu = controlsDropdown.property(1);
    
    controlsDropdown.property(1).addToMotionGraphicsTemplateAs(activeComp, controlsDropdown.name);
    controlsMenu.setPropertyParameters(layerSelNames);

    return
}


app.beginUndoGroup("Populate Dropdown");
    populateDropDown()
app.endUndoGroup()