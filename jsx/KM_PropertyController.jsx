/**
 * Creates a slider on a control layer named "Controls" and will link selected properties to that slider control 
 * 
 * 
 * 
 * @title KM_PropertyController
 * @author Kyle Harter <k.harter@glassandmarker.com>
 * @version 0.1.0
 * 5.17.2022
 * 
 * 
*/

(function km_propertyController() {

    var comp = app.project.activeItem;
    var sliderValue = prompt("Enter a slider value!", 100);



    if (!(comp && comp instanceof CompItem)) {
        alert("Open a comp first!")
        return
    }

    function getSelectedProperties(comp) {

        var selectedProperties = comp.selectedProperties;
        return selectedProperties
    }

    
    var selectedProps = getSelectedProperties(comp);

    if (selectedProps == 0) {
        alert("Select a property first!")
        return
    }


    function getControlLayer(comp) {
        var numLayers = comp.numLayers;

        for (var i = 1; i <= numLayers; i++){
            if (comp.layer(i).name === "Controls") {
                return comp.layer(i)
            } else {
                var controlsLayer = comp.layers.addShape();
                controlsLayer.name = "Controls"
                return controlsLayer

            }
        }

    }

    var controlsLayer = getControlLayer(comp);

    

    function addSliderToControls() {
        var sliderProp = controlsLayer.property("ADBE Effect Parade").addProperty("ADBE Slider Control");
        sliderProp.name = selectedProps[0].name;
        sliderProp.property(1).setValue(sliderValue);
        return sliderProp
    }


    
    function connectPropertyToSlider() {
        var props = selectedProps;
        var sliderControl = addSliderToControls();
        for (var i = 0; i < props.length; i++){
                props[i].expression =
                    'thisComp.layer("'+controlsLayer.name+'").effect("'+sliderControl.name+'")(1).value'
        }
        
        return 

    }

app.beginUndoGroup("Property Controller")

    connectPropertyToSlider()

app.endUndoGroup()




})();