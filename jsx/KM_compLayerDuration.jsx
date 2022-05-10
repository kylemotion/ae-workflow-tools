
/**
 * Changes comp duration based on selected layer duration
 * @title KM_compLayerDuration
 * @author Kyle Harter <k.harter@glassandmarker.com>
 * @version 0.2.0
 * 5.10.2022
 * 
 * 
*/
(function km_compLayerDuration(){
    ///// get active comp

    function getCurrentComp() {
        var currentComp = app.project.activeItem;

        if (!currentComp || !(currentComp instanceof CompItem)) {
            alert("please select a composition and at least a layer") 
        } else {
            return currentComp
        }
    }


    function getSelectedLayerDuration() {
        var selectedLayer = getCurrentComp().selectedLayers[0];

        if (selectedLayer != null) {
            var layerDuration = (selectedLayer.outPoint - selectedLayer.inPoint);
        } else {
            alert("Select a layer first")
        }
        return layerDuration
    }


    function setCompDuration() {
        getCurrentComp().duration = getSelectedLayerDuration();
        
    }

    app.beginUndoGroup("Comp to Layer Duration")

    setCompDuration();

    app.endUndoGroup()

})()