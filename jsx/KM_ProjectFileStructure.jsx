/**
 * Creates initial project structure
 * @title KM_ProjectFileStructure
 * @author Kyle Harter <k.harter@glassandmarker.com>
 * @version 0.2.0
 * 5.10.2022
 * 
 * 
*/


(function projectStructure(){
    /// Global Variables
    var proj = app.project;
    var projItems = proj.items;
    
    /// Folder Names
    var rootFolders = ["01 Main Comps", "02 PreComps", "03 Imported"];
    var importedSubFolders = ["Projects", "Footage", "Graphics", "Intermediary"];

    function createRootFolders(rootFolders, importedSubFolders) {
        var mainComp = projItems.addFolder(rootFolders[0]);
        var preComp = projItems.addFolder(rootFolders[1]);
        var importedFolder = projItems.addFolder(rootFolders[2]);

        for (var i = 0; i < importedSubFolders.length; i++){
            var subFolders = projItems.addFolder(importedSubFolders[i]);
            subFolders.parentFolder = importedFolder
        }

    }

    /// Run Script
    app.beginUndoGroup("Folder Structure");

    createRootFolders(rootFolders, importedSubFolders)

    app.endUndoGroup();

})()


    // && proj.item(i).name === rootFolders[i - 1].name