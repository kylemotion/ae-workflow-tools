var proj = app.project.items;

app.beginUndoGroup("Folder Structure");

createFolders(proj)

app.endUndoGroup();

function createFolders(proj) {
    var mainCompsFolder = proj.addFolder("01 Main Comps");
    mainCompsFolder;
    var preCompsFolder = proj.addFolder("02 PreComps");
    preCompsFolder;
    var importedFolder = proj.addFolder("03 Imported");

    var importedArray = new Array("Projects", "Footage", "Graphics", "Intermediary")
    for (var i = 0; i <importedArray.length; i ++){
        var importedSubFolders = proj.addFolder(importedArray[i]);  
        importedSubFolders.parentFolder = importedFolder
    }
}

