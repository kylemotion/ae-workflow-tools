/**
 * Creates a slider on a control layer named "Controls" and will link selected properties to that slider control 
 * 
 * 
 * @title KM_PropertyController
 * @author Kyle Harter <k.harter@glassandmarker.com>
 * @version 0.1.1
 * 5.24.2022
 * 
 * 
*/

(function km_propertyController(thisObj) {

    var comp = app.project.activeItem;
    // var sliderValue = prompt("Enter a slider value!", 100);



    if (!(comp && comp instanceof CompItem)) {
        alert("Open a comp first!")
        return
    }

    /**
     * 
     * @param {Object} comp active comp or item in project
     * @returns {number} number of selected properties
     */

    function getSelectedProperties(comp) {

        var selectedProperties = comp.selectedProperties;
        return selectedProperties
    }



    var selectedProps = getSelectedProperties(comp);

    if (selectedProps == 0) {
        alert("Select a property first!")
        return
    }
    

    createUI(thisObj);


/**
 * 
 * @param {Object} thisObj
 * 
 *  
 */

    function createUI(thisObj) {
        var win = thisObj instanceof Panel
            ? thisObj
            : new Window("palette", "km_propertyController", undefined, {
                resizeable: true
            });
        
        win.orientation = 'column';
        win.alignChildren = ["fill", "top"];

        var editGroup = win.add("group", undefined, "edit group");
        editGroup.orientation = 'row';
        editGroup.alignChildren = ["fill", "fill"];
        var staticText = editGroup.add("statictext", undefined, "Number or Degrees:");
        var editField = editGroup.add("edittext", undefined, "Enter an integer");
        editField.characters = 15;

        var buttonGrp = win.add("group", undefined, "button group");
        buttonGrp.orientation = 'row';
        buttonGrp.alignChildren = ["fill", "fill"];
        var sliderButton = buttonGrp.add("button", undefined, "Slider");
        var angleButton = buttonGrp.add("button", undefined, "Angle");


        sliderButton.onClick = function () {
            app.beginUndoGroup("Slider Controller");
            connectPropertyToSlider(parseInt(editField.text)) 
            win.close();
            app.endUndoGroup()
        }

        angleButton.onClick = function () {
            app.beginUndoGroup("Angle Controller");
            connectPropertyToAngle(parseInt(editField.text));
            win.close();
            app.endUndoGroup()
        }

        win.layout.layout();
        win.onResizing = win.onResize = function () {
            this.layout.resize();
        };

        win.show();
        
    }


/**
 * 
 * @param {Object} comp 
 * @returns 
 */


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

/**
 * 
 * @param {number} sliderVal 
 * @returns 
 */


    function connectPropertyToSlider(sliderVal) {
        var sliderProp = controlsLayer.property("ADBE Effect Parade").addProperty("ADBE Slider Control");
        sliderProp.name = selectedProps[0].name;
        sliderProp.property(1).setValue(sliderVal);
        var sliderExpression = 'thisComp.layer("'+controlsLayer.name+'").effect("'+sliderProp.name+'")(1).value';

        var props = selectedProps;
        for (var i = 0; i < props.length; i++) {

                if (props[i].propertyValueType == 6413) {
                    props[i].expression = '['+sliderExpression+','+sliderExpression+','+sliderExpression+']';
                }
            
                if (props[i].propertyValueType == 6414) {
                    props[i].expression = '['+ sliderExpression+', '+sliderExpression+','+sliderExpression+']';
                }
            
                if (props[i].propertyValueType == 6415) {
                    props[i].expression = '['+sliderExpression+', '+sliderExpression+']';
                }
            
                if (props[i].propertyValueType == 6416) {
                    props[i].expression = '['+sliderExpression+'", "'+sliderExpression+']';
                }
            
                if (props[i].propertyValueType == 6417) {
                    props[i].expression =
                        sliderExpression
                }
            }
        
        return 
    }


/**
 * 
 * @param {number} angleVal 
 * @returns 
 */

    function connectPropertyToAngle(angleVal) {
        var angleProp = controlsLayer.property("ADBE Effect Parade").addProperty("ADBE Angle Control");
        angleProp.name = selectedProps[0].name;
        angleProp.property(1).setValue(angleVal);

        var props = selectedProps;
        for (var i = 0; i < props.length; i++){
                props[i].expression =
                    'thisComp.layer("'+controlsLayer.name+'").effect("'+angleProp.name+'")(1).value'
        }
        return 
    }


})(this);