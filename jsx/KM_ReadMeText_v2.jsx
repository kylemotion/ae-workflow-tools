/*
 * Adds a text layer with a custom Read Me message
 * 
 * @author: Kyle Harter <k.harter@glassandmarker.com>
 * @version 0.2.0
 * 4.26.2022
 * 
 * 
*/

(function readMeTextLayer() {
    var mainWindow = new Window("window", "Read Me", undefined);
    mainWindow.orientation = "column";

    var mainTextGroup = mainWindow.add("group", undefined, "Main Text Group");
    mainTextGroup.orientation = "row";
    var editTextGroup = mainTextGroup.add("group", undefined, "Edit Text Group");
    editTextGroup.orientation = "column";
    var editTextStatic = editTextGroup.add("StaticText", undefined, "Enter Read Me Text:");
    editTextStatic.alignment = "left"
    var editTextField = editTextGroup.add("EditText", undefined, "", { multiline: true, scrolling: true });
    editTextField.text = 'If there are concerns or questions about the code used in this project, ping Kyle Harter on Slack';

    var charLenGroup = mainTextGroup.add("panel", undefined, "Line Length:");
    charLenGroup.orientation = "column";
    charLenGroup.alignment = "fill";
    charLenGroup.alignChildren = ["center","center"];
    // var charAmtTitle = charLenGroup.add("StaticText", undefined, "Line Length:");
    var charAmtGroup = charLenGroup.add("group", undefined, "Character Amount Group");
    charAmtGroup.orientation = "row"
    var charAmtEdit = charAmtGroup.add('edittext{text: "50", characters: 4, justify: "center"}');
    var charAmtStatic = charAmtGroup.add("StaticText", undefined, "characters");
    
    var createTextGroup = mainWindow.add("group", undefined, "Create Text Button");
    createTextGroup.orientation = "row";
    var questionMarkButton = createTextGroup.add("Button", undefined, "?");
    questionMarkButton.preferredSize = [30, 30];
    questionMarkButton.helpTip = "Adds a text layer with a custom Read Me message in the\rbottom of the comp. Will not be in final render."
    var createTextButton = createTextGroup.add("Button", undefined, "Create Read Me Text");
    createTextButton.preferredSize = [-1, 30];

    mainWindow.show()
    mainWindow.center();


    createTextButton.onClick = function () {
        app.beginUndoGroup("Helper Text");

        helperTextLayer(editTextField,charAmtEdit)
        mainWindow.close();

        app.endUndoGroup()
    };

    function getCurrentComp() {
        var comp = app.project.activeItem;
        if (comp && comp instanceof CompItem) {
            return comp
        } else {
            return alert("Select or open a comp to place the layer in")
        }
    }

    function helperTextLayer(editTextField,charAmtEdit) {
        var comp = getCurrentComp();
        var helperLayer = comp.layers.addText(editTextField.text);
        helperLayer.name = "READ ME";

        var helperLayerTextProp = helperLayer.property("ADBE Text Properties");
        var helperLayerTextDoc = helperLayerTextProp.property("ADBE Text Document");
        var helperLayerTextPropDoc = helperLayerTextDoc.value;
        helperLayerTextPropDoc.font = "ArialMT";
        helperLayerTextPropDoc.fontSize = 40;
        helperLayerTextPropDoc.applyFill = true;
        helperLayerTextPropDoc.fillColor = [1, 1, 1];
        helperLayerTextPropDoc.applyStroke = false;
        helperLayerTextPropDoc.justification = ParagraphJustification.LEFT_JUSTIFY;
        helperLayerTextPropDoc.autoLeading = true;
        helperLayerTextDoc.setValue(helperLayerTextPropDoc);

        helperLayer.text.sourceText.expression =
'txt = value;\
n = '+parseFloat(charAmtEdit.text)+';\
outStr = "";\
newLine = ""\
splt = txt.split(" ")\
for (i = 0; i < splt.length; i++) {\
    if ((newLine + " " + splt[i]).length > n) {\
        if (outStr != "") outStr += "\\r";\
        outStr += newLine;\
        newLine = splt[i];\
    } else {\
        if (newLine != "") newLine += " ";\
        newLine += splt[i];\
    }\
}\
if (newLine != "") {\
    if (outStr != "") outStr += "\\r";\
    outStr += newLine;\
}\
outStr';

        var textTrans = helperLayer.property("ADBE Transform Group");
        textTrans.property("ADBE Anchor Point").expression =
            'l = thisLayer.sourceRectAtTime();\
x = l.left;\
y = l.top + l.height;\
[x,y]';
    
        textTrans.property("ADBE Position").expression =
            'x = 0;\
y = thisComp.height;\
[x,y]';
    
    
        helperLayer.moveToBeginning();
        helperLayer.guideLayer = true;
        helperLayer.locked = true;
    }
})();