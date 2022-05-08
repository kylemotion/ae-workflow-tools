/*
 * Select a dropdown menu control and return an array onto a text layers source text
 * 
 * @author: Kyle Harter <k.harter@glassandmarker.com>
 * @version 0.1.2
 * 
 * 
 * 
*/

(function dropDownToSourceArray(){
    var mainWindow = new Window("window", "Dropdown SourceText", undefined);
    mainWindow.orientation = "column";

    var mainTextGroup = mainWindow.add("group", undefined, "Main Text Group");
    mainTextGroup.orientation = "row";
    var editTextGroup = mainTextGroup.add("group", undefined, "Edit Text Group");
    editTextGroup.orientation = "column";
    var editTextStatic = editTextGroup.add("StaticText", undefined, "Enter Read Me Text:");
    editTextStatic.alignment = "left"
    var editTextField = editTextGroup.add("EditText", undefined, "", { multiline: true, scrolling: true });
    editTextField.text = 'Fill in array line by line';
    editTextField.preferredSize = [150,100];

    
    var createTextGroup = mainWindow.add("group", undefined, "Create Text Button");
    createTextGroup.orientation = "row";
    var questionMarkButton = createTextGroup.add("Button", undefined, "?");
    questionMarkButton.preferredSize = [30, 30];
    questionMarkButton.helpTip = "Adds a text layer with a custom Read Me message in the\rbottom of the comp. Will not be in final render."
    var createTextButton = createTextGroup.add("Button", undefined, "Create Read Me Text");
    createTextButton.preferredSize = [-1, 30];

    mainWindow.show()
    mainWindow.center();


createTextButton.onClick = function(){
app.beginUndoGroup("Dropdown");

compSelectedPropertiesLayers(editTextField)

app.endUndoGroup();
}



function getCurrentComp() {
    var comp = app.project.activeItem;
    if (comp && comp instanceof CompItem) {
        return comp
    } else {
        return alert("Select or open a comp to place the layer in")
    }
}

function dropDownArray(editTextField){
    var lineArray = new Array();
    var lineAmount = editTextField.text.split("\n");
    for(var i = 0; i<lineAmount.length; i++){
        lineArray.push(lineAmount[i])
    }
    
    return lineArray
}


function compSelectedPropertiesLayers(editTextField){
    var comp = getCurrentComp();
    var compProps = comp.selectedProperties;
    var dropdownArrayList = dropDownArray(editTextField);

    for(var i = 0; i <compProps.length; i++){
            compProps[i].setPropertyParameters(dropdownArrayList)
            }
    }

})();