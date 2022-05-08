function getSelection() {
    var selectedComps = app.project.selection
    var compArray = new Array()
    for (var i = 0; i <= selectedComps.length; i++){
        var compSelection = selectedComps[i];
        if (compSelection && compSelection instanceof CompItem) {
            compArray.push(compSelection)
        }
    }

    if (compArray.length > 0) {
        return compArray[0]
    } else {
        alert("Select a comp first")
    }
}

function renameComp2ProjName() {
    var projectName = "Untitled";
    if (app.project.file != null) {
        projectName = app.project.file.name;
    };

    if (projectName.indexOf(".") != -1) { // if project has a prefix (e.g. .aep) strip it
        projectName = projectName.substring(0, projectName.lastIndexOf("."));
    }

    var selectionName = getSelection();
    if (selectionName != null) {
        return getSelection().name = projectName
    } else {
        return null
    }
}

app.beginUndoGroup("Rename Composition Project Name");


renameComp2ProjName()

app.endUndoGroup()