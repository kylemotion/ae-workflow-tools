/**
 * Batch set matte applying tool
 * can invert matte
 * can also turn matte on/off
 * dockable: yes
 * 
 * 
 * @title Set Matte Applier
 * @author Kyle Harter <k.harter@glassandmarker.com>
 * @version 0.2.2
 * 5.27.2022
 * 
 * 
*/

(function km_setMatteApplier(thisObj) {
    
    
    var existingComp = app.project.activeItem;

    if (!(existingComp && existingComp instanceof CompItem)) {
        alert("Open a comp first!")
        return
    } 


    if (existingComp.selectedLayers == 0) {
        alert("Select atleast one layer to apply the Set Matte effect to")
        return
    }


    var globalLayers = [];
    var globalLayerNames = [];
    

    createUI(thisObj);

    /**
     * 
     * @param {Object} thisObj activates UI immediately
     * @returns ui
     */

    function createUI(thisObj) {
        var win = thisObj instanceof Panel
            ? thisObj
            : new Window("window", "km_setMatteApplier", undefined, {
                resizeable: true
            })
        
        win.orientation = "column";
        win.alignChildren = ["fill", "fill"];

        var setMatteSettingsPanel = win.add("panel", undefined, "Set Matte Settings");
        setMatteSettingsPanel.orientation = "column";
        setMatteSettingsPanel.alignChildren = ["left", "fill"]
        setMatteSettingsPanel.margins = 15;
            var matteLayerStatic = setMatteSettingsPanel.add("statictext", undefined, "Select Matte Layer:");
            
        var mainButtonDD = setMatteSettingsPanel.add("dropdownlist", [0,0,160,25], ["Click Refresh to Populate"]);
        mainButtonDD.selection = 0;

        var matteOptionsGroup = setMatteSettingsPanel.add("group", undefined, "matte options");
            
        var invertMatte = matteOptionsGroup.add("checkbox", undefined, "\u00A0Invert Matte");
        invertMatte.value = false;
        var matteVisibility = matteOptionsGroup.add("checkbox", undefined, "\u00A0Matte Visible");
        matteVisibility.value = true;

        var applyGroup = win.add("group", undefined, "Push Me");
            applyGroup.orientation = 'row';
            applyGroup.alignChildren = "fill";
        var helpButton = applyGroup.add("button", undefined, "Help Me");
        helpButton.helpTip = "How to use:\n1. Select layer that will serve as matte in the dropdown\n\n2. Check Invert Matte for Invert Matte\n\n3. Click Matte Visible to change matte visibility\n\n4. Click apply!";
        var applyButton = applyGroup.add("button", undefined, "Apply Matte");


        win.layout.layout();
        win.onResizing = function () {
            this.layout.resize();
        };

        

        var layerList = init(mainButtonDD);



        helpButton.onClick = function(){
            alert(helpButton.helpTip)
        }

        applyButton.onClick = function () {

            app.beginUndoGroup("apply set matte");
            
        applySetMatte(mainButtonDD, invertMatte.value, matteVisibility.value);
            win.close();

        app.endUndoGroup();
}

        win.show()
    }

/**
 * 
 * @param {Object} dropDown dropdown that holds list of layers in comp
 * @returns first drop down selection item
 */

    function init(dropDown){
    globalLayers = [];
    globalLayerNames = [];
    dropDown.removeAll();
    
    var existingComp = app.project.activeItem;
    
    if(existingComp && existingComp instanceof CompItem){
        for(var i = 1; i<=existingComp.numLayers; i++){
            globalLayers.push(existingComp.layer(i));
            globalLayerNames.push(i.toString() + ". " + existingComp.layer(i).name);
            dropDown.add("item", globalLayerNames[globalLayerNames.length-1])

            if(existingComp.layer(i) instanceof AVLayer && existingComp.layer(i).canSetCollapseTransformation){
                existingComp.layer(i).collapseTransformation = true
            }

        }
    } 
    
    return dropDown.selection = 0;
}
    
    /**
     * 
     * @param {Object} dropDown dropdown list of layers
     * @param {Object} invertMatte invert matte checkbox
     * @param {Object} matteViz matte visibility checkbox
     * @returns apply set matte process
     */
    
    function applySetMatte(dropDown, invertMatte, matteViz) {
    var comp = existingComp;
    var layersSelected = comp.selectedLayers;
        for (var i = 0; i < layersSelected.length; i++) {
            var ddSel = parseFloat(dropDown.selection) + 1;

        var setMatteEffect = layersSelected[i].property("ADBE Effect Parade").addProperty("ADBE Set Matte3");
            setMatteEffect.property(1).setValue(ddSel);
        if (invertMatte == false) {
            setMatteEffect.property(3).setValue(false);
        } else if (invertMatte == true){
            setMatteEffect.property(3).setValue(true);
        }

        
        if (matteViz == true) {
            comp.layer(ddSel).enabled = true;
        } else if (matteViz == false) {
            comp.layer(ddSel).enabled = false;
        }
    }
}


})(this)