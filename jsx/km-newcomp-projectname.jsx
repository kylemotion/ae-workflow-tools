
/**
 * 
 * Click will result in trimming project code from file name
 * 
 * Shift+Click will result in renaming to full file name
 * 
 * 
 * @title KM_NewCompProjName
 * @author Kyle Harter <k.harter@glassandmarker.com>
 * @version 0.2.1
 * 5.10.2022
 * 
 * 
*/


(function km_newCompProjName() {
        
    var compParams = {
            compWidth: 1920,
            compHeight: 1080,
            compDuration: 10,
            compFrameRate: 23.976
        }


        function getFolderName() {
            var folderName = "01 Main Comps";
            if (typeof folderName === "string") {
                var folderArray = new Array();
                var proj = app.project;
                var itemCount = proj.numItems;
                for (var i = 1; i <= itemCount; i++){
                    var curItem = proj.item(i);
                    if (curItem instanceof FolderItem) {
                        if (curItem.name == folderName) {
                            folderArray.push(curItem)
                        }
                    }
                }
            }
            if (folderArray.length > 0) {
                return folderArray
            } else {
                var mainCompsFolder = proj.items.addFolder("01 Main Comps");
                folderArray.push(mainCompsFolder);
                return folderArray
            }
        }

        
        
        function getFullProjectName() {
            var projectName = "Untitled";
            if (app.project.file != null) {
                projectName = app.project.file.name;
            };

            if (projectName.indexOf(".") != -1) { // if project has a prefix (e.g. .aep) strip it
                projectName = projectName.substring(0, projectName.lastIndexOf("."));
            }
            return projectName.replace(/%20/g, " ")
        }

        var projectName = getFullProjectName();
        
        function removeProjCode(projectName) {
            var projCode = projectName.split("-")[0];
            var trimmedProjName = projectName.replace(new RegExp(projCode, "g"), "");
            var removeDash = trimmedProjName.replace(/^\W/gi, "");

            return removeDash

        }

        var projNameNoProjCode = removeProjCode(projectName);
        
        
    function createNewGMComp(compParams) {
        var projItems = app.project.items;
        var mainCompFolder = getFolderName()[0];
        var newComp = projItems.addComp(projectName.replace(/%20/g," "), compParams.compWidth, compParams.compHeight, 1.0, compParams.compDuration, compParams.compFrameRate);
        newComp.parentFolder = mainCompFolder;
        newComp.openInViewer()
        return newComp
    }

    app.beginUndoGroup("New Composition Project Name");

    var shiftHeld = ScriptUI.environment.keyboardState.shiftKey;
    if (shiftHeld) {
        var newComp = createNewGMComp(compParams);
        newComp.name = projectName;
        return 
    } else {
        if (projNameNoProjCode == "") {
            alert("No Project Code Present. Shift+Click script for full project name")
            return
        } else {
            var newComp = createNewGMComp(compParams);
            newComp.name = projNameNoProjCode;
            return
        }
    }
    
    app.endUndoGroup()

})()