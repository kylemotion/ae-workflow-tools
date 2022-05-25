
(function km_layerRenamer(thisObj) {

    createUI(thisObj);


    function createUI(thisObj) {
        var win = thisObj instanceof Panel
            ? thisObj
            : new Window("palette", "km_LayerRenamer", undefined, {
                resizeable: true
            })


        var mainWindow = win.add("group", undefined, "ui");
        mainWindow.orientation = "column";
        mainWindow.alignChildren = ["fill", "fill"];

        var layerNameSepPanel = mainWindow.add("panel", undefined);
        layerNameSepPanel.orientation = "row";
        layerNameSepPanel.alignChildren = ["fill", "fill"];
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

        var replaceNamePanel = mainWindow.add("panel", undefined, "Replace Text");
        replaceNamePanel.orientation = 'column';
        replaceNamePanel.alignChildren = ["fill", "fill"];
        var replaceEdit = replaceNamePanel.add("edittext", undefined, "Text to be replaced");
        replaceEdit.characters = 20;
        var newText = replaceNamePanel.add("edittext", undefined, "New Text to replace");
        newText.characters = 20;

        var buttonGroup = mainWindow.add("group", undefined, "buttons");
        buttonGroup.orientation = 'row';
        buttonGroup.alignChildren = ["fill", "fill"];
        var replaceButton = buttonGroup.add("button", undefined, "Replace");
        replaceButton.size = [100, 25]
        var renameButton = buttonGroup.add("button", undefined, "Rename");
        renameButton.size = [100,25]

        replaceButton.onClick = function () {
            app.beginUndoGroup("replace");
            replaceText(replaceEdit.text, newText.text);
            win.close();
            app.endUndoGroup()
        }

        renameButton.onClick = function () {
            app.beginUndoGroup("rename")
            renameLayers(layerNameEdit.text, separatorEdit.text);
            win.close();
            app.endUndoGroup()
        }


        win.layout.layout();
        win.onResizing = win.onResize = function () {
            this.layout.resize();
        };

        win.show()
    }


    function getCurrentComp(){
        var existingComp = app.project.activeItem;
        if(existingComp && existingComp instanceof CompItem){
            return existingComp
        } else {
            alert("Select a composition first");
            return
        }
    }

    
    function getSelectedLayers() {
        var selectedLayers = getCurrentComp().selectedLayers;
        if (selectedLayers < 1) {
            alert("Select a layer first");
            return
        } else {
            return selectedLayers
        }
    }
    
    
    var selectedLayers = getSelectedLayers();


    function renameLayers(layerNames, separator){
        for (var i = 0; i < selectedLayers.length; i++){
                var count = i + 1;
            selectedLayers[i].name = layerNames + separator + count
            }
        
            return
        }

    function replaceText(oldText, updatedText) {
        for (var i = 0; i < selectedLayers.length; i++) {
            selectedLayers[i].name.replace(/oldText/g, updatedText)
        }
        return
    }



})(this)



