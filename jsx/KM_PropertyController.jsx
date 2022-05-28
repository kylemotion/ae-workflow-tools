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

    //// global UI variables
    var editTextCharacters = 20;


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

        var controlLayerGroup = win.add("panel", undefined,);
        controlLayerGroup.orientation = 'row';
        controlLayerGroup.alignChildren = ["fill", "fill"];
        var controlLayerStatic = controlLayerGroup.add("statictext", undefined, "Control Layer Name:");
        var controlLayerName = controlLayerGroup.add("edittext", undefined, "Enter control layer name");
        controlLayerName.characters = editTextCharacters;


        var controlEffectGroup = win.add("panel", undefined,);
        controlEffectGroup.orientation = 'row';
        controlEffectGroup.alignChildren = ["fill", "fill"];
        var controlEffectStatic = controlEffectGroup.add("statictext", undefined, "Control Effect Name:");
        var controlEffectName = controlEffectGroup.add("edittext", undefined, "Enter control effect name");
        controlEffectName.characters = editTextCharacters;

        var editGroup = win.add("panel", undefined,);
        editGroup.orientation = 'row';
        editGroup.alignChildren = ["fill", "fill"];
        var staticText = editGroup.add("statictext", undefined, "Number or Degrees:");
        var editField = editGroup.add("edittext", undefined, "Enter an integer");
        editField.characters = editTextCharacters;

        var colorGroup = win.add("panel", undefined,);
        colorGroup.orientation = 'row';
        colorGroup.alignChildren = ["fill", "fill"];
        var colorStaticText = colorGroup.add("statictext", undefined, "Color hex code: ");
        var hexEditField = colorGroup.add("edittext", undefined, "Enter an hex code");
        hexEditField.characters = editTextCharacters; 


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
        
            function hexToRgb(hex) {
                var bigint = parseInt(hex, 16);
                var r = (bigint >> 16) & 255;
                var g = (bigint >> 8) & 255;
                var b = bigint & 255;

                return (r / 255).toFixed(1) + "," + (g / 255).toFixed(1) + "," + (b / 255).toFixed(1);
            }

            var hexCode = hexToRgb(hexEditField.text);


        colorButton.onClick = function () {
            app.beginUndoGroup("Color Controller");


            alert(hexCode)

            connectPropertyToColor(hexCode);
            win.close()
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




    function connectPropertyToColor(hexCodeRGB) {
        var colorProp = controlsLayer.property("ADBE Effect Parade").addProperty("ADBE Color Control");
        colorProp.name = selectedProps[0].name;
        colorProp.property(1).setValue([hexCodeRGB]);
        

        var props = selectedProps;
        for (var i = 0; i < props.length; i++){
                props[i].expression =
                    'thisComp.layer("'+controlsLayer.name+'").effect("'+colorProp.name+'")(1).value'
        }
        return 
    }


    

})(this);