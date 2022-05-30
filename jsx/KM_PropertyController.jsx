/**
 * Creates a slider on a control layer named "Controls" and will link selected properties to that slider control 
 * 
 * 
 * @title KM_PropertyController
 * @author Kyle Harter <k.harter@glassandmarker.com>
 * @version 0.2.0
 * 5.30.2022
 * 
 * 
*/

(function km_propertyController(thisObj) {

    //// global UI variables
    var editTextCharacters = 20;

    var comp = app.project.activeItem;

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

        var controlLayerGroup = win.add("panel", undefined,);
        controlLayerGroup.orientation = 'row';
        controlLayerGroup.alignChildren = ["fill", "fill"];
        var controlLayerStatic = controlLayerGroup.add("statictext", undefined, "Enter Control Layer Name:");
        var controlLayerName = controlLayerGroup.add("edittext", undefined, "");
        controlLayerName.characters = editTextCharacters;


        var controlEffectGroup = win.add("panel", undefined,);
        controlEffectGroup.orientation = 'row';
        controlEffectGroup.alignChildren = ["fill", "fill"];
        var controlEffectStatic = controlEffectGroup.add("statictext", undefined, "Enter Control Effect Name:");
        var controlEffectName = controlEffectGroup.add("edittext", undefined, "");
        controlEffectName.characters = editTextCharacters;

        var editGroup = win.add("panel", undefined,);
        editGroup.orientation = 'row';
        editGroup.alignChildren = ["fill", "fill"];
        var staticText = editGroup.add("statictext", undefined, "Enter a Number or Degrees:");
        var editField = editGroup.add("edittext", undefined, "");
        editField.characters = editTextCharacters;

        var colorGroup = win.add("panel", undefined,);
        colorGroup.orientation = 'row';
        colorGroup.alignChildren = ["fill", "fill"];
        var colorStaticText = colorGroup.add("statictext", undefined, "Enter RGB values: ");
        var rgbEditField = colorGroup.add("edittext", undefined, "");
        rgbEditField.characters = editTextCharacters; 
        var colorHelpButton = colorGroup.add("button", undefined, "?");
        colorHelpButton.helpTip = 'When entering numbers, make sure to leave a space between numbers';
        colorHelpButton.size = [10, -1];
        

        var checkboxGroup = win.add("panel", undefined, );
        checkboxGroup.orientation = 'row';
        checkboxGroup.alignChildren = ["fill", "fill"];
        var cbStatic = checkboxGroup.add("statictext", undefined, "Checkbox values:")
        var cbOnGroup = checkboxGroup.add("group", undefined, "CB On Group");
        var cbOn = cbOnGroup.add("statictext", undefined, "On:");
        var cbOnEdit = cbOnGroup.add("edittext", undefined, "100");
        cbOnEdit.characters = 6;
        var cbOffGroup = checkboxGroup.add("group", undefined, "CB Off Group");
        var cbOff = cbOffGroup.add("statictext", undefined, "Off:");
        var cbOffEdit = cbOffGroup.add("edittext", undefined, "0");
        cbOffEdit.characters = 6;

        var buttonGrp = win.add("group", undefined, "button group");
        buttonGrp.orientation = 'column';
        buttonGrp.alignChildren = ["fill", "fill"];

        var buttonsTop = buttonGrp.add("group", undefined, "Buttons Top");
        buttonsTop.orientation = 'row';
        buttonsTop.alignChildren = ["fill", "fill"];
        var sliderButton = buttonsTop.add("button", undefined, "Slider");
        var angleButton = buttonsTop.add("button", undefined, "Angle");


        var buttonsBot = buttonGrp.add("group", undefined, "Buttons Top");
        buttonsBot.orientation = 'row';
        buttonsBot.alignChildren = ["fill", "fill"];
        var colorButton = buttonsBot.add("button", undefined, "Color");
        var checkBoxButton = buttonsBot.add("button", undefined, "Checkbox");

        function getControlLayer(controlLayer) {
            var numLayers = comp.numLayers;

            for (var i = 1; i <= numLayers; i++) {
                if (comp.layer(i).name === controlLayer) {
                    return comp.layer(i)
                } else {
                    var newControlsLayer = comp.layers.addShape();
                    newControlsLayer.name = controlLayer;
                    return newControlsLayer

                }
            }

        }

        

        sliderButton.onClick = function () {
            app.beginUndoGroup("Slider Controller");

            if (controlLayerName.text) {
                var controlsLayer = getControlLayer(controlLayerName.text);
            } else {
                controlsLayer = getControlLayer("Controls")
            }
            alert(controlEffectName.text)
            connectPropertyToSlider(parseInt(editField.text), controlsLayer.name, controlEffectName.text) 
            win.close();
            app.endUndoGroup()
        }

        angleButton.onClick = function () {
            app.beginUndoGroup("Angle Controller");
            if (controlLayerName.text) {
                var controlsLayer = getControlLayer(controlLayerName.text);
            } else {
                controlsLayer = getControlLayer("Controls")
            }
            connectPropertyToAngle(parseInt(editField.text), controlsLayer.name, controlEffectName.text);
            win.close();
            app.endUndoGroup()
        }
        
        checkBoxButton.onClick = function () {
            app.beginUndoGroup("Checkbox");
            if (controlLayerName.text) {
                var controlsLayer = getControlLayer(controlLayerName.text);
            } else {
                controlsLayer = getControlLayer("Controls")
            }
            connectPropertyToCheckbox(parseInt(cbOffEdit.text), parseInt(cbOnEdit.text), controlsLayer.name, controlEffectName.text);
            win.close();
            app.endUndoGroup()
        }


        colorButton.onClick = function () {
            app.beginUndoGroup("Color Controller");
            if (controlLayerName.text) {
                var controlsLayer = getControlLayer(controlLayerName.text);
            } else {
                controlsLayer = getControlLayer("Controls")
            }
            connectPropertyToColor(rgbEditField.text, controlsLayer.name, controlEffectName.text);
            win.close()
            app.endUndoGroup()
        }


        colorHelpButton.onClick = function () {
            alert(colorHelp.helpTip)
        }
        

        win.layout.layout();
        win.onResizing = win.onResize = function () {
            this.layout.resize();
        };

        win.show();
        
    }


    /**
     *
     *
     * @param {Object} sliderVal slider value input
     * @param {string} controls a string for the control layer name
     * @param {string} propName a string for property name
     * @returns slider value that has selected properties connected to it
     * 
     */
    function connectPropertyToSlider(sliderVal, controls, propName) {
        var sliderProp = comp.layer(controls).property("ADBE Effect Parade").addProperty("ADBE Slider Control");
        if (propName) {
            sliderProp.name = propName
        } else {
            sliderProp.name = selectedProps[0].name;
        }
        sliderProp.property(1).setValue(sliderVal);
        var sliderExpression = 'thisComp.layer("'+controls+'").effect("'+sliderProp.name+'")(1).value';

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
     *
     * @param {Object} angleVal degrees for rotation value
     * @param {string} controls a string for the control layer name
     * @param {string} propName a string for property name
     * @returns angle value that has selected properties connected to it
     * 
     */
    function connectPropertyToAngle(angleVal, controls, propName) {
        var angleProp = comp.layer(controls).property("ADBE Effect Parade").addProperty("ADBE Angle Control");
        if (propName) {
            angleProp.name = propName
        } else {
            angleProp.name = selectedProps[0].name;
        }
        angleProp.property(1).setValue(angleVal);

        var props = selectedProps;
        for (var i = 0; i < props.length; i++){
                props[i].expression =
                    'thisComp.layer("'+controls+'").effect("'+angleProp.name+'")(1).value'
        }
        return 
    }


    /**
     *
     *
     * @param {string} rgbValues string that gets converted ot numbers to build rgb array
     * @param {string} controls a string for the control layer name
     * @param {string} propName a string for property name
     * @returns color value that has selected properties connected to it
     * 
     */
    function connectPropertyToColor(rgbValues, controls, propName) {
        var colorProp = comp.layer(controls).property("ADBE Effect Parade").addProperty("ADBE Color Control");
        if (propName) {
            colorProp.name = propName
        } else {
            colorProp.name = selectedProps[0].name;
        }
        var rgbSplit = rgbValues.split(" ");
        colorProp.property(1).setValue([parseFloat(rgbSplit[0])/ 255, parseFloat(rgbSplit[1])/ 255, parseFloat(rgbSplit[2]) / 255]);
        
        var props = selectedProps;
        for (var i = 0; i < props.length; i++){
                props[i].expression =
                    'thisComp.layer("'+controls+'").effect("'+colorProp.name+'")(1).value'
        }
        return
    }

    /**
     *
     *
     * @param {Object} minVal minimum value for checkbox in UI
     * @param {Object} maxVal maximum value for checkbox in UI
     * @param {string} controls a string for the control layer name
     * @param {string} propName a string for property name
     * @returns  value that has selected properties connected to it
     * 
     * 
     */
    function connectPropertyToCheckbox(minVal, maxVal, controls, propName) {
        var checkboxProp = comp.layer(controls).property("ADBE Effect Parade").addProperty("ADBE Checkbox Control");
        if (propName) {
            checkboxProp.name = propName
        } else {
            checkboxProp.name = selectedProps[0].name;
        }
        checkboxProp.property(1).setValue(true);

        var props = selectedProps;
        for (var i = 0; i < props.length; i++) {
            props[i].expression =
                'var checkBoxCtrl = thisComp.layer("'+controls+'").effect("'+checkboxProp.name+'")(1).value\
            checkBoxCtrl == 1 ? '+maxVal+' : '+minVal+''
        }
        return 
    }



})(this);