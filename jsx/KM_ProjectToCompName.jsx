/**
 * Renames Comp to project name
 * @title KM_ProjectToCompName
 * @author Kyle Harter <k.harter@glassandmarker.com>
 * @version 0.2.1
 * 5.10.2022
 * 
 * 
*/

(function projectToCompName() {



    function getComp() {
        var selectedComps = app.project.selection
        var compArray = new Array()
        for (var i = 0; i <= selectedComps.length; i++) {
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

    var compName = getComp();


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



    app.beginUndoGroup("Rename Composition Project Name");

    var shiftHeld = ScriptUI.environment.keyboardState.shiftKey;
    if (shiftHeld) {
        return compName.name = projectName;
    } else {
        if (projNameNoProjCode == "") {
            alert("No Project Code Present. Shift+Click script for full project name")
            return
        } else {
            return compName.name = projNameNoProjCode
        }
    }

    app.endUndoGroup()
    
})()