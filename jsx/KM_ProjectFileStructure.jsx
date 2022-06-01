/**
 * Creates initial project structure
 * @title KM_ProjectFileStructure
 * @author Kyle Harter <k.harter@glassandmarker.com>
 * @version 0.2.0
 * 5.10.2022
 * 
 * 
*/


(function km_projectStructure(thisObj){
    /// Global Variables
    var proj = app.project;
    var projItems = proj.items;
    
    /// Folder Names
    var rootFolders = ["01 Main Comps", "02 PreComps", "03 Imported"];
    var importedSubFolders = ["Projects", "Footage", "Graphics", "Intermediary"];

    function createRootFolders(root, sub) {
        var mainComp = projItems.addFolder(root[0]);
        var preComp = projItems.addFolder(root[1]);
        var importedFolder = projItems.addFolder(root[2]);

        for (var i = 0; i < sub.length; i++){
            var subFolders = projItems.addFolder(sub[i]);
            subFolders.parentFolder = importedFolder
        }

    }

    /// Run Script
    app.beginUndoGroup("Folder Structure");

    createRootFolders(rootFolders, importedSubFolders)

    app.endUndoGroup();

})(this)

