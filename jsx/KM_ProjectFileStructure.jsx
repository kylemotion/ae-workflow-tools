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
    var proj = app.project.items;
    
    /// Folder Names
    var rootFolders = ["01 Main Comps", "02 PreComps", "03 Imported"];

    /// Run Script
        app.beginUndoGroup("Folder Structure");

    alert(createFolders(proj, rootFolders))

        app.endUndoGroup();


    function createFolders(proj, rootFolders) {
        var itemArray = new Array();
        var folderArray = new Array();
        for (var i = 1; i <= app.project.numItems; i++) {
            itemArray.push(app.project.item(i));
            for (var b = 0; b < rootFolders.length; b++){
                if (itemArray[i-1].indexOf(rootFolders[b]) != -1) {
                    folderArray.push(itemArray[i])
                    $.writeln(itemArray[i].name)
                }
            }
        }
        return folderArray.toString()

        // var mainCompsFolder = proj.item("01 Main Comps");
        // if (!mainCompsFolder) {
        //     var mainCompsFolder = proj.addFolder("01 Main Comps");
        // } 

        // if (!preCompsFolder) {
        //     var preCompsFolder = proj.addFolder("02 PreComps");
        // }
        
        // if (!importedFolder) {
        //     var importedFolder = proj.addFolder("03 Imported");
        // }

        // if (importedFolder) {
        //     var importedArray = new Array("Projects", "Footage", "Graphics", "Intermediary")
        //     for (var i = 0; i < importedArray.length; i++) {
        //         var importedSubFolders = proj.addFolder(importedArray[i]);
        //         importedSubFolders.parentFolder = importedFolder
        //     }
        // }
    }

})()