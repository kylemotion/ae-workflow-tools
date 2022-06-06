/**
 * Set Anchor Point of Position Property in Shape Group 
 * apply roundness expression for rounded corners
 * dockable: yes
 * 
 * 
 * @author: Kyle Harter <k.harter@glassandmarker.com>
 * @version 0.3.0
 * 6.6.2022
 * 
 * 
*/

(function km_shapeAnchor(thisObj){

    createUI(thisObj);


    function createUI(thisObj) {
        var win = thisObj instanceof Panel
            ? thisObj
            : new Window("window", "km_shapeAnchor", undefined, {
                resizeable: true
            })

        
        win.orientation = 'column';
        win.alignChildren = ["fill", "top"];
        
        var mainWindow = win.add("group", undefined, "main window")
        mainWindow.orientation = "column";

        var buttonsGroup = mainWindow.add("panel", undefined, "Shape Anchor Position");
        buttonsGroup.orientation = "column";
        buttonsGroup.spacing = 10;
        var topRowButtonsGroup = buttonsGroup.add("group", undefined, "Top Row Group");
        var topLeftButton = topRowButtonsGroup.add("Button", undefined, "TL");
        topLeftButton.preferredSize = [25, 25];
        topLeftButton.helpTip = "Top Left";
        var topMiddleButton = topRowButtonsGroup.add("Button", undefined, "TM");
        topMiddleButton.preferredSize = [25, 25];
        topMiddleButton.helpTip = "Top Middle";
        var topRightButton = topRowButtonsGroup.add("Button", undefined, "TR");
        topRightButton.preferredSize = [25, 25];
        topRightButton.helpTip = "Top Right";

        var midRowButtonsGroup = buttonsGroup.add("group", undefined, "Mid Row Group");
        var midLeftButton = midRowButtonsGroup.add("Button", undefined, "ML");
        midLeftButton.preferredSize = [25, 25];
        midLeftButton.helpTip = "Middle Left";
        var middleButton = midRowButtonsGroup.add("Button", undefined, "MM");
        middleButton.preferredSize = [25, 25];
        middleButton.helpTip = "Middle";
        var midRightButton = midRowButtonsGroup.add("Button", undefined, "MR");
        midRightButton.preferredSize = [25, 25];
        midRightButton.helpTip = "Middle Right";

        var botRowButtonsGroup = buttonsGroup.add("group", undefined, "Bottom Row Group");
        var botLeftButton = botRowButtonsGroup.add("Button", undefined, "BL");
        botLeftButton.preferredSize = [25, 25];
        botLeftButton.helpTip = "Bottom Left";
        var botMiddleButton = botRowButtonsGroup.add("Button", undefined, "BM");
        botMiddleButton.preferredSize = [25, 25];
        botMiddleButton.helpTip = "Bottom Middle";
        var botRightButton = botRowButtonsGroup.add("Button", undefined, "BR");
        botRightButton.preferredSize = [25, 25];
        botRightButton.helpTip = "Bottom Right"
            
        var bottomRoundnessGroup = mainWindow.add("panel", undefined, "Roundness Expression");
        var roundnessButton = bottomRoundnessGroup.add("Button", undefined, "");
        roundnessButton.text = 'Roundness';
        roundnessButton.preferredSize = [100, 25];
        roundnessButton.helpTip = "Apply to Roundness property on parametric shape"
            
        var bottomHelpGroup = mainWindow.add("panel", undefined, "Help");
        bottomHelpGroup.orientation = "column";
        var questionButton = bottomHelpGroup.add("Button", undefined, "What do I do?");
        questionButton.preferredSize = [100, 25];
        questionButton.helpTip = "This script applies expressions to the position property of a parametric shape group. It's ideal for rectangles and ellipses."
        var howWorkButton = bottomHelpGroup.add("Button", undefined, "How do I work?");
        howWorkButton.preferredSize = [100, 25];
        howWorkButton.helpTip = "Select the position properties inside of the shape groups that you wish to apply the position to. Click your desired button to apply the expression to.";


        /**
            *
            *
            * @return array of selected properties 
            */

        function compSelectedProperties(currentComp) {
            var propArray = new Array();
            var compProps = currentComp.selectedProperties;
            for (var m = 0; m < compProps.length; m++) {
                propArray.push(compProps[m]);
            }

            return propArray;
        }

 
        topLeftButton.onClick = function () {
            app.beginUndoGroup("Top Left");


            var comp = app.project.activeItem;

            if (!(comp && comp instanceof CompItem)) {
                alert("Select or open a comp first!")
                return
            }

            var propArray = compSelectedProperties(comp);
            
            if (comp.selectedLayers < 1) {
                alert("Select the Position property in your shape group first");
                return
            }

            topLeftPos(propArray);
            win.close();
            app.endUndoGroup()
        }

        topMiddleButton.onClick = function () {
            app.beginUndoGroup("Top Middle");

            var comp = app.project.activeItem;

            if (!(comp && comp instanceof CompItem)) {
                alert("Select or open a comp first!")
                return
            }

            var propArray = compSelectedProperties(comp);

            if (comp.selectedLayers < 1) {
                alert("Select the Position property in your shape group first");
                return
            }


            topMiddlePos(propArray);
            win.close();
            app.endUndoGroup()
        }

        topRightButton.onClick = function () {
            app.beginUndoGroup("Top Right");


            var comp = app.project.activeItem;

            if (!(comp && comp instanceof CompItem)) {
                alert("Select or open a comp first!")
                return
            }

            var propArray = compSelectedProperties(comp);

            if (comp.selectedLayers < 1) {
                alert("Select the Position property in your shape group first");
                return
            }

            topRightPos(propArray);
            win.close();
            app.endUndoGroup()
        }

        midLeftButton.onClick = function () {
            app.beginUndoGroup("Mid Left");

            var comp = app.project.activeItem;

            if (!(comp && comp instanceof CompItem)) {
                alert("Select or open a comp first!")
                return
            }

            var propArray = compSelectedProperties(comp);

            if (comp.selectedLayers < 1) {
                alert("Select the Position property in your shape group first");
                return
            }


            midLeftPos(propArray);
            win.close();
            app.endUndoGroup()
        }

        middleButton.onClick = function () {
            app.beginUndoGroup("Mid");

            var comp = app.project.activeItem;

            if (!(comp && comp instanceof CompItem)) {
                alert("Select or open a comp first!")
                return
            }

            var propArray = compSelectedProperties(comp);

            if (comp.selectedLayers < 1) {
                alert("Select the Position property in your shape group first");
                return
            }

            midPos(propArray);
            win.close();
            app.endUndoGroup()
        }

        midRightButton.onClick = function () {
            app.beginUndoGroup("Mid Right");

            var comp = comp;

            var comp = app.project.activeItem;

            if (!(comp && comp instanceof CompItem)) {
                alert("Select or open a comp first!")
                return
            }

            var propArray = compSelectedProperties(comp);

            if (comp.selectedLayers < 1) {
                alert("Select the Position property in your shape group first");
                return
            }

            midRightPos(propArray);
            win.close();
            app.endUndoGroup()
        }

        botLeftButton.onClick = function () {
            app.beginUndoGroup("Top Right");

            var comp = comp;

            var comp = app.project.activeItem;

            if (!(comp && comp instanceof CompItem)) {
                alert("Select or open a comp first!")
                return
            }

            var propArray = compSelectedProperties(comp);

            if (comp.selectedLayers < 1) {
                alert("Select the Position property in your shape group first");
                return
            }

            botLeftPos(propArray);
            win.close();
            app.endUndoGroup()
        }

        botMiddleButton.onClick = function () {
            app.beginUndoGroup("Bot Mid");

            var comp = app.project.activeItem;

            if (!(comp && comp instanceof CompItem)) {
                alert("Select or open a comp first!")
                return
            }

            var propArray = compSelectedProperties(comp);

            if (comp.selectedLayers < 1) {
                alert("Select the Position property in your shape group first");
                return
            }

            botMidPos(propArray);
            win.close();
            app.endUndoGroup()
        }

        botRightButton.onClick = function () {
            app.beginUndoGroup("Bot Right");

            var comp = app.project.activeItem;

            if (!(comp && comp instanceof CompItem)) {
                alert("Select or open a comp first!")
                return
            }

            var propArray = compSelectedProperties(comp);

            if (comp.selectedLayers < 1) {
                alert("Select the Position property in your shape group first");
                return
            }

            botRightPos(propArray);
            win.close();
            app.endUndoGroup()
        }

        questionButton.onClick = function () {
            alert(questionButton.helpTip)
        }

        howWorkButton.onClick = function () {
            alert(howWorkButton.helpTip)
        }

        roundnessButton.onClick = function () {
            app.beginUndoGroup("roundness");

            var comp = app.project.activeItem;

            if (!(comp && comp instanceof CompItem)) {
                alert("Select or open a comp first!")
                return
            }

            var propArray = compSelectedProperties(comp);

            if (comp.selectedLayers < 1) {
                alert("Select the Position property in your shape group first");
                return
            }


            roundnessExpression(propArray);
            win.close();
            app.endUndoGroup()
        }
            

        win.onResizing = win.onResize = function () {
            this.layout.resize();
        };

        if (win instanceof Window) {
            win.center();
            win.show();
        } else {
            win.layout.layout(true);
            win.layout.resize();
        }


    }
            

    
    
        /**
         *
         * @returns top left position expression
         */
    
    function topLeftPos(selectedProps){
        var props = selectedProps;    
            for(var i = 0; i<props.length; i++){
                props[i].expression = 
        'var shapeGroup = thisProperty.propertyGroup(1);\
        var shapeSize = shapeGroup.size;\
        x = shapeSize[0]/2;\
        y = shapeSize[1]/2;\
        [x,y]'
            }
        }

        /**
         *
         * @returns top mid position expression
         */
    
    function topMiddlePos(selectedProps){
            var props = selectedProps;    
            for(var i = 0; i<props.length; i++){
                props[i].expression = 
        'var shapeGroup = thisProperty.propertyGroup(1);\
        var shapeSize = shapeGroup.size;\
        x = 0;\
        y = shapeSize[1]/2;\
        [x,y]'
            }
        }

        /**
         *
         * @returns top right position expression
         */
    
    function topRightPos(selectedProps){
            var props = selectedProps;    
            for(var i = 0; i<props.length; i++){
                props[i].expression = 
        'var shapeGroup = thisProperty.propertyGroup(1);\
        var shapeSize = shapeGroup.size;\
        x = shapeSize[0]/-2;\
        y = shapeSize[1]/2;\
        [x,y]'
            }
        }

        /**
         *
         * @returns mid left position expression
         */
    
    function midLeftPos(selectedProps){
        var props = selectedProps;    
            for(var i = 0; i<props.length; i++){
                props[i].expression = 
        'var shapeGroup = thisProperty.propertyGroup(1);\
        var shapeSize = shapeGroup.size;\
        x = shapeSize[0]/2;\
        y = 0;\
        [x,y]'
            }
        }

        /**
         *
         * @returns middle position expression
         */
    
    function midPos(selectedProps){
            var props = selectedProps;    
            for(var i = 0; i<props.length; i++){
                props[i].expression = 
        'x = 0;\
        y = 0;\
        [x,y]'
            }
        }

    
        /**
         *
         * @returns mid right position expression
         */
    
    function midRightPos(selectedProps){
        var props = selectedProps;    
            for(var i = 0; i<props.length; i++){
                props[i].expression = 
        'var shapeGroup = thisProperty.propertyGroup(1);\
        var shapeSize = shapeGroup.size;\
        x = shapeSize[0]/-2;\
        y = 0;\
        [x,y]'
            }
        }

        /**
         *
         * @returns bot left position expression
         */
    
    function botLeftPos(selectedProps){
        var props = selectedProps;    
            for(var i = 0; i<props.length; i++){
                props[i].expression = 
        'var shapeGroup = thisProperty.propertyGroup(1);\
        var shapeSize = shapeGroup.size;\
        x = shapeSize[0]/2;\
        y = shapeSize[1]/-2;\
        [x,y]'
            }
        }

        /**
         *
         * @returns bot mid position expression
         */
    
    function botMidPos(selectedProps){
        var props = selectedProps;    
            for(var i = 0; i<props.length; i++){
                props[i].expression = 
        'var shapeGroup = thisProperty.propertyGroup(1);\
        var shapeSize = shapeGroup.size;\
        x = 0; \
        y = shapeSize[1]/-2;\
        [x,y]'
            }
        }

        /**
         *
         * @returns bot right position expression
         */
    
    function botRightPos(selectedProps){
        var props = selectedProps;    
            for(var i = 0; i<props.length; i++){
                props[i].expression = 
        'var shapeGroup = thisProperty.propertyGroup(1);\
        var shapeSize = shapeGroup.size;\
        x = shapeSize[0]/-2;\
        y = shapeSize[1]/-2;\
        [x,y]'
            }
        }
            
    
        /**
         *
         * @returns roundness expression
         */
    

    function roundnessExpression(selectedProps) {
            var props = selectedProps;
            for (var i = 0; i < props.length; i++) {
                props[i].expression =
        'shapeRoundness = value;\
        var shapeGroup = thisProperty.propertyGroup(1);\
        var shapeSize = shapeGroup.size;\
        xSize = shapeSize[0];\
        ySize = shapeSize[1];\
        smallestSize = Math.min(xSize, ySize);\
        (smallestSize / 2) * shapeRoundness * .01'
            }

        }    
    

})(this);