/**
 * Creates a slider on a control layer named "Controls" and will link selected properties to that slider control 
 * 
 * 
 * @title KM_PropertyController
 * @author Kyle Harter <k.harter@glassandmarker.com>
 * @version 0.2.2
 * 6.4.2022
 * 
 * 
*/

(function km_propertyController(thisObj) {

    //// global UI variables
    var editTextCharacters = 20;
    



    var theWindow = createUI(thisObj);
    if (theWindow instanceof Window) {
        theWindow.center();
        theWindow.show();
    } else {
        theWindow.layout.layout(true);
    }


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

        var sliderEditGroup = win.add("panel", undefined,);
        sliderEditGroup.orientation = 'column';
        sliderEditGroup.alignChildren = ["fill", "fill"];
        var sliderTopGroup = sliderEditGroup.add("group", undefined, "Slider top");
        sliderTopGroup.orientation = 'row';
        sliderTopGroup.alignChildren = ["fill", "fill"]
        var sliderStaticText = sliderTopGroup.add("statictext", undefined, "Enter a slider value:");
        var sliderEditField = sliderTopGroup.add("edittext", undefined, "");
        sliderEditField.characters = editTextCharacters;
        var sliderButton = sliderEditGroup.add("button", undefined, "Slider");

        var angleEditGroup = win.add("panel", undefined,);
        angleEditGroup.orientation = 'column';
        angleEditGroup.alignChildren = ["fill", "fill"];
        var angleTopGroup = angleEditGroup.add("group", undefined, "Angle top");
        angleTopGroup.orientation = 'row';
        angleTopGroup.alignChildren = ["fill", "fill"]
        var angleStaticText = angleTopGroup.add("statictext", undefined, "Enter an angle value:");
        var angleEditField = angleTopGroup.add("edittext", undefined, "");
        angleEditField.characters = editTextCharacters;
        var angleButton = angleEditGroup.add("button", undefined, "Angle");

        var colorGroup = win.add("panel", undefined,);
        colorGroup.orientation = 'column';
        colorGroup.alignChildren = ["fill", "fill"];
        var colorTopGroup = colorGroup.add("group", undefined, "color top");
        colorTopGroup.orientation = 'row';
        colorTopGroup.alignChildren = ["fill", "fill"];
        var colorStaticText = colorTopGroup.add("statictext", undefined, "Hex values:");
        var hexEditField = colorTopGroup.add("edittext", undefined, "");
        hexEditField.characters = editTextCharacters;
        var colorButton = colorGroup.add("button", undefined, "Color");
    
        var checkboxGroup = win.add("panel", undefined,);
        checkboxGroup.orientation = 'column';
        checkboxGroup.alignChildren = ["fill", "fill"];
        var checkboxTop = checkboxGroup.add("group", undefined, "CB Top");
        checkboxTop.orientation = 'row';
        checkboxTop.alignChildren = ["fill", "fill"];
        var cbStatic = checkboxTop.add("statictext", undefined, "Checkbox values:")
        var cbOnGroup = checkboxTop.add("group", undefined, "CB On Group");
        var cbOn = cbOnGroup.add("statictext", undefined, "On:");
        var cbOnEdit = cbOnGroup.add("edittext", undefined, "100");
        cbOnEdit.characters = 6;
        var cbOffGroup = checkboxTop.add("group", undefined, "CB Off Group");
        var cbOff = cbOffGroup.add("statictext", undefined, "Off:");
        var cbOffEdit = cbOffGroup.add("edittext", undefined, "0");
        cbOffEdit.characters = 6;
        var checkBoxButton = checkboxGroup.add("button", undefined, "Checkbox");
        var comp = app.project.activeItem;


        /**
         * 
         * @param {Object} comp active comp or item in project
         * @returns {number} number of selected properties
         */

        function getSelectedProperties(comp) {

            var selectedProperties = comp.selectedProperties;
            return selectedProperties
        }

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

            if (!(comp && comp instanceof CompItem)) {
                alert("Open a comp first!")
                return
            }

            var selectedProps = getSelectedProperties(comp);

            if (selectedProps == 0) {
                alert("Select a property first!")
                return
            }

            if (sliderEditField.text == "") {
                alert("Please enter a valid integer");
                return
            }

            if (controlLayerName.text) {
                var controlsLayer = getControlLayer(controlLayerName.text);
            } else {
                controlsLayer = getControlLayer("Controls")
            }
            connectPropertyToSlider(comp, selectedProps, parseInt(sliderEditField.text), controlsLayer.name, controlEffectName.text)
            win.close();
            app.endUndoGroup()
        }

        angleButton.onClick = function () {
            app.beginUndoGroup("Angle Controller");

            if (!(comp && comp instanceof CompItem)) {
                alert("Open a comp first!")
                return
            }

            var selectedProps = getSelectedProperties(comp);

            if (selectedProps == 0) {
                alert("Select a property first!")
                return
            }

            if (angleEditField.text == "") {
                alert("Please enter a valid integer");
                return
            }

            if (controlLayerName.text) {
                var controlsLayer = getControlLayer(controlLayerName.text);
            } else {
                controlsLayer = getControlLayer("Controls")
            }
            connectPropertyToAngle(comp, selectedProps, parseInt(angleEditField.text), controlsLayer.name, controlEffectName.text);
            win.close();
            app.endUndoGroup()
        }


        colorButton.onClick = function () {
            app.beginUndoGroup("Color Controller");

            if (!(comp && comp instanceof CompItem)) {
                alert("Open a comp first!")
                return
            }

            var selectedProps = getSelectedProperties(comp);

            if (selectedProps == 0) {
                alert("Select a property first!")
                return
            }


            if (hexEditField.text == "") {
                alert("Please enter a valid integer");
                return
            }

            if (controlLayerName.text) {
                var controlsLayer = getControlLayer(controlLayerName.text);
            } else {
                controlsLayer = getControlLayer("Controls")
            }
            connectPropertyToColor(comp, selectedProps, hexEditField.text, controlsLayer.name, controlEffectName.text);
            win.close()
            app.endUndoGroup()
        }



        checkBoxButton.onClick = function () {
            app.beginUndoGroup("Checkbox");

            if (!(comp && comp instanceof CompItem)) {
                alert("Open a comp first!")
                return
            }

            var selectedProps = getSelectedProperties(comp);

            if (selectedProps == 0) {
                alert("Select a property first!")
                return
            }


            if (cbOffEdit.text == "" || cbOnEdit.text == "") {
                alert("Please enter a valid integer");
                return
            }

            if (controlLayerName.text) {
                var controlsLayer = getControlLayer(controlLayerName.text);
            } else {
                controlsLayer = getControlLayer("Controls")
            }
            connectPropertyToCheckbox(comp, selectedProps, parseInt(cbOffEdit.text), parseInt(cbOnEdit.text), controlsLayer.name, controlEffectName.text);
            win.close();
            app.endUndoGroup()
        }

        // win.layout.layout(true);
        // win.onResizing = win.onResize = function () { win.layout.resize(); }
        // win.onShow = function () { win.minimumSize = win.size }
        // return win;

        win.layout.layout(true);
        win.onResizing = function () {
            win.layout.resize();
        };
        win.show()
        return win

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
    function connectPropertyToSlider(currentComp, properties,sliderVal, controls, propName) {
        var sliderProp = currentComp.layer(controls).property("ADBE Effect Parade").addProperty("ADBE Slider Control");
        if (propName) {
            sliderProp.name = propName
        } else {
            sliderProp.name = properties[0].name;
        }
        sliderProp.property(1).setValue(sliderVal);
        var sliderExpression = 'thisComp.layer("'+controls+'").effect("'+sliderProp.name+'")(1).value';

        var props = properties;
        for (var i = 0; i < props.length; i++) {

                if (props[i].propertyValueType == 6413 || props[i].propertyValueType == 6414) {
                    props[i].expression =
'x = '+sliderExpression+';\
y = '+sliderExpression+';\
z = '+sliderExpression+';\
[x,y,z]';
                }
            
            
                if (props[i].propertyValueType == 6415 || props[i].propertyValueType == 6416) {
                    props[i].expression =
'x = '+ sliderExpression+';\
y = '+ sliderExpression+';\
[x,y]';
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
    function connectPropertyToAngle(currentComp, properties, angleVal, controls, propName) {
        var angleProp = currentComp.layer(controls).property("ADBE Effect Parade").addProperty("ADBE Angle Control");
        if (propName) {
            angleProp.name = propName
        } else {
            angleProp.name = properties[0].name;
        }
        angleProp.property(1).setValue(angleVal);

        var props = properties;
        for (var i = 0; i < props.length; i++){
                props[i].expression =
                    'thisComp.layer("'+controls+'").effect("'+angleProp.name+'")(1).value'
        }
        return 
    }


    function hexToRGB(hexValue) {
        var hexTrim = hexValue.trim();
        var hexString = hexTrim;
        var finalHex = hexString.replace(/[#]/g, "");
        var hexColor = "0x" + finalHex;
        var r = hexColor >> 16;
        var g = (hexColor & 0x00ff00) >> 8;
        var b = hexColor & 0xff;
        
        return [r / 255, g / 255, b / 255]
    } 



    /**
     *
     *
     * @param {string} hexValue string that sets the input hex value as the color control value
     * @param {string} controls a string for the control layer name
     * @param {string} propName a string for property name
     * @returns color value that has selected properties connected to it
     * 
     */
    function connectPropertyToColor(currentComp, properties ,hexValue, controls, propName) {
        var colorProp = currentComp.layer(controls).property("ADBE Effect Parade").addProperty("ADBE Color Control");
        if (propName) {
            colorProp.name = propName
        } else {
            colorProp.name = properties[0].name;
        }
        colorProp.property(1).setValue(hexToRGB(hexValue));
        
        var props = properties;
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
    function connectPropertyToCheckbox(currentComp, properties, minVal, maxVal, controls, propName) {
        var checkboxProp = currentComp.layer(controls).property("ADBE Effect Parade").addProperty("ADBE Checkbox Control");
        if (propName) {
            checkboxProp.name = propName
        } else {
            checkboxProp.name = properties[0].name;
        }
        checkboxProp.property(1).setValue(true);

        var props = properties;
        for (var i = 0; i < props.length; i++) {
            props[i].expression =
                'var checkBoxCtrl = thisComp.layer("'+controls+'").effect("'+checkboxProp.name+'")(1).value\
            checkBoxCtrl == 1 ? '+maxVal+' : '+minVal+''
        }
        return 
    }



})(this);