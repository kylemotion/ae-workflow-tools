/**
 * 
 * a script to do something amazing
 * @author: Kyle Harter <kylenmotion@gmail.com>
 * @version 0.1.0
 * 
 * 
 * 
*/


(function(thisObj){
    
// @include './library/km_functionLibrary.jsx';


    var scriptName = "Script Name";

    createUI(thisObj)

    function createUI(thisObj){
        var win = thisObj instanceof Panel
        ? thisObj
        : new Window("window", scriptName, undefined, {
            resizeable: true
        })

    win.orientation = 'column';
    win.alignChildren = ["left", "top"];

    var mainGroup = win.add("group", undefined, "Main Group");
    mainGroup.orientation = 'column';


    var applyGroup = mainGroup.add("group", undefined, "Apply Group");
    applyGroup.orientation = 'row';
    var applyButton = applyGroup.add("button", undefined, "Apply");
    applyButton.preferredSize = [-1,30];
    applyButton.helpTip = "Click: Apply markers to selected layers.\rShift+Click: Apply markers to beginning of a comp."


    applyButton.onClick = function(){
    try {
        app.beginUndoGroup("What script does");

        var activeComp = app.project.activeItem;
        var curLayerSel = activeComp.selectedLayers;

        if(!(activeComp && activeComp instanceof CompItem)){
            alert("Please open a comp first")
            return
        }

        // if(!curLayerSel.length){
        //     alert("Select atleast 1 layer first");
        //     return
        // }

        name('#98745d')

      } catch(error) {
        alert(error)
      } finally {
        // this always runs no matter what
        app.endUndoGroup()
      }
      
    }

    
    function name(hexCode){
        return alert(hexToRGB(hexCode))
        
    }

    win.onResizing = win.onResize = function (){
        this.layout.resize();
    };

    if(win instanceof Window){
        win.center();
        win.show();
    } else {
        win.layout.layout(true);
        win.layout.resize();
    }


    }

}(this))
