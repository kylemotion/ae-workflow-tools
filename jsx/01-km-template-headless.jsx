/**
 * 
 * a headless script to do something really fucking cool in AE
 * @author: Kyle Harter <kylenmotion@gmail.com>
 * @version 0.1.1
 * 
 * 
 * 
*/


(function(){

    try {
        app.beginUndoGroup("what does this script do?");
        var activeComp = app.project.activeItem;

        hello(activeComp)
      } catch(error) {
        alert(error)

      } finally {
        // this always runs no matter what
        app.endUndoGroup()
      }
      
      

    function hello(comp){
      if(!(comp && comp instanceof CompItem)){
        return alert("Open up a comp first")
      }
    }

}())
