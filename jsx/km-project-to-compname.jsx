/**
 * @description Renames Comp to project name. Click will name comp after the project file name.
 * @name km-project-to-compname
 * @author Kyle Harter <kylenmotion@gmail.com>
 * @version 0.3.0
 * 
 * @license This script is provided "as is," without warranty of any kind, expressed or implied. In
 * no event shall the author be held liable for any damages arising in any way from the use of this
 * script.
 * 
 * 
 * 6.27.2024
 * 
 * 
*/



(function km_projectToCompName() {



    function getComp() {
        var selectedComps = app.project.activeItem;
        if(!(selectedComps && selectedComps instanceof CompItem) ){
            alert("Select a comp first")
            return
        }

        if(selectedComps.length > 1){
            alert("Select only 1 comp.")
            return
        }

        return selectedComps
    }

    


    function getFullProjectName() {
        var projectName
        if (app.project.file != null) {
            projectName = app.project.file.name;
        };

        if (projectName.indexOf(".") != -1) { // if project has a suffix (e.g. .aep) strip it
            projectName = projectName.substring(0, projectName.lastIndexOf("."));
        }
        
        var finalProjectName = projectName.replace(/%20/g, " ");
        return  finalProjectName

    }

    app.beginUndoGroup("Rename Composition Project Name");
    
    try{
    
    getComp().name = getFullProjectName();
    } catch(err){

    } finally{

    }
    app.endUndoGroup()
    
})()