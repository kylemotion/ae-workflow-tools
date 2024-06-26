/**
 * @description Changes comp duration based on selected layer duration
 * @name km-comp-layer-duration
 * @author Kyle Harter <k.harter@glassandmarker.com>
 * @version 0.3.0
 * 
 * @license This script is provided "as is," without warranty of any kind, expressed or implied. In
 * no event shall the author be held liable for any damages arising in any way from the use of this
 * script.
 * 
 * 
 * 6.26.2024
 * 
 * 
*/
(function km_compLayerDuration(){


    function compDurationFromLayer(comp) {
        
        if (!comp || !(comp instanceof CompItem)) {
            alert("Please open a composition first") 
            return
        }
        

        var selectedLayers = comp.selectedLayers;

        if(selectedLayers.length < 1 || selectedLayers.length > 1){
            alert("Select 1 layer to continue")
            return 
        } 

        var targetLayer = selectedLayers[0];

        comp.workAreaDuration = targetLayer.outPoint - targetLayer.inPoint;
        comp.workAreaStart = targetLayer.inPoint;
        
        app.executeCommand(2360) // Trimp comp to work area Command ID
        
        return comp.duration
    }


    app.beginUndoGroup("Comp to Layer Duration")
    try{
        var activeComp = app.project.activeItem;
        // var compDuration = compDurationFromLayer(activeComp);

        
        compDurationFromLayer(activeComp)
        
        
    } catch (err){
        alert(err)
    } finally{
        
    }

    app.endUndoGroup()

})()