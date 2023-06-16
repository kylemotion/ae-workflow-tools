/**
 * 
 * renames layers in batches
 * 
 * @author: Kyle Harter <k.harter@glassandmarker.com>
 * @version 0.2.1
 * 6.1.2022
 */


(function km_layerRenamer(thisObj) {

   



    createUI(thisObj);


    function createUI(thisObj) {
        var win = thisObj instanceof Panel
            ? thisObj
            : new Window("palette", "km_LayerRenamer", undefined, {
                resizeable: true
            })

        win.orientation = "column";
        win.alignChildren = ["fill", "top"];

        var layerNameSepPanel = win.add("panel", undefined);
        layerNameSepPanel.orientation = "row";
        layerNameSepPanel.alignChildren = ["fill", "top"];
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


        var buttonGroup = win.add("group", undefined, "buttons");
        buttonGroup.orientation = 'row';
        buttonGroup.alignChildren = ["fill", "top"];

        var renameButton = buttonGroup.add("button", undefined, "Rename");
        renameButton.size = [100, 25]

        
        renameButton.onClick = function () {
            app.beginUndoGroup("rename")
            var activeComp = app.project.activeItem;

            if (!(activeComp && activeComp instanceof CompItem)) {
                alert("Please open up a comp first!")
                return
            }
            var selectedLayers = activeComp.selectedLayers;

            if (selectedLayers < 1) {
                alert("Please select atleast 1 layer first!")
                return
            }

            renameLayers(selectedLayers,layerNameEdit.text, separatorEdit.text);
            win.close();
            app.endUndoGroup()
        }


        win.onResizing = win.onResize = function () {
            this.layout.resize();
        };

        if (win instanceof Window) {
            win.center();
            win.show();
        } else {
            win.layout.layout(true);
            win.layout.resize();
        }
    }



    function renameLayers(selectedLayers,layerNames, separator) {
        for (var i = 0; i < selectedLayers.length; i++) {
            var count = i + 1;
            selectedLayers[i].name = layerNames + separator + count
        }

        return selectedLayers
    }

})(this)


