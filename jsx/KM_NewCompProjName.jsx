/**
 * Creates new comp based on project name
 * @title KM_NewCompProjName
 * @author Kyle Harter <k.harter@glassandmarker.com>
 * @version 0.2.0
 * 5.10.2022
 * 
 * 
*/


(function newCompProjName(){
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

function createNewGMComp(projItems, compParams) {
    var projectName = "Untitled";
    if (app.project.file != null) {
        projectName = app.project.file.name;
    };

    if (projectName.indexOf(".") != -1) { // if project has a prefix (e.g. .aep) strip it
        projectName = projectName.substring(0, projectName.lastIndexOf("."));
    }
    var mainCompFolder = getFolderName()[0];
    var newComp = projItems.addComp(projectName.replace(/%20/g," "), compParams.compWidth, compParams.compHeight, 1.0, compParams.compDuration, compParams.compFrameRate);
    newComp.parentFolder = mainCompFolder;
    newComp.openInViewer()
    return newComp
    
}

app.beginUndoGroup("New Composition Project Name");



var compParams = {
    compWidth: 1920,
    compHeight: 1080,
    compDuration: 10,
    compFrameRate: 23.976
}


var projItems = app.project.items;

createNewGMComp(projItems, compParams);

    app.endUndoGroup()


})()