/**
 * Kyle Harter function library
 * @author kylenmotion@gmail.com
 */


/**
 * @param {string} mainColor 6-digit hex code
 * @return {Object} RGB values from a hex code input 
 */



// Function to convert hex value to an RGB value that After Effects can read
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

// Function to select properties on a layer that have keyframes. 
function getPropertySelection(comp, meta) {
      
  if(!(comp && comp instanceof CompItem)){
    return alert("Please open a comp first")
}

var selectedLayers = comp.selectedLayers;
if(selectedLayers.length == 0){
  return alert("Please select properties on a layer first")
}

var selectedProps = new Array();

for(var j = 0; j < selectedLayers.length; j++){
  var curProps = selectedLayers[j].selectedProperties;
    for(var i = 0; i < curProps.length; i++){
      if(curProps[i].numKeys > 0){
        selectedProps.push(curProps[i])
      }
   
  }

  }

  if(meta){
    return selectedProps
  } else {
    return selectedProps.reverse()
  }
}


// Function to collect keyframe properties, and return an array of those keyframes and their properties
function collectKeyframes(props){
        
    var selProps = props;



      var keyIndexList, curKeyIndex, curKeyValue, inin, outin, ab, cb, ie, oe, sab, scb, ist, ost, rov, twoDS, threeDS;
      twoDS = PropertyValueType.TwoD_SPATIAL;
      threeDS = PropertyValueType.ThreeD_SPATIAL;

      keyIndexList = new Array();
      
      for(var i = 0; i<selProps.length; i++){
        var selectedProps = selProps[i];
        for(var j=1; j <= selectedProps.numKeys; j++){
          var curKeyTime = selectedProps.keyTime(j);
          curKeyIndex = j;
          curKeyValue = selectedProps.keyValue(j);
          inin = selectedProps.keyInInterpolationType(curKeyIndex);
          outin = selectedProps.keyOutInterpolationType(curKeyIndex);

          if(inin == KeyframeInterpolationType.BEZIER && outin==KeyframeInterpolationType.BEZIER){
            ab = selectedProps.keyTemporalAutoBezier(curKeyIndex);
            cb = selectedProps.keyTemporalContinuous(curKeyIndex);
          }

          if(inin != KeyframeInterpolationType.HOLD || outin != KeyframeInterpolationType.HOLD){
            ie = selectedProps.keyInTemporalEase(curKeyIndex);
            oe = selectedProps.keyOutTemporalEase(curKeyIndex);
          }

          if(selectedProps.propertyValueType == twoDS || selectedProps.propertyValueType == threeDS){
            sab = selectedProps.keySpatialAutoBezier(curKeyIndex);
            scb = selectedProps.keySpatialContinuous(curKeyIndex);
            ist = selectedProps.keyInSpatialTangent(curKeyIndex);
            ost = selectedProps.keyOutSpatialTangent(curKeyIndex);
            rov = selectedProps.keyRoving(curKeyIndex);
          }

          keyIndexList[keyIndexList.length] = {'curKeyTime': curKeyTime, 'curKeyIndex':curKeyIndex,'curKeyValue':curKeyValue,'inin':inin,'outin':outin,'ab':ab,'cb':cb,'ie':ie,'oe':oe,'sab':sab,'scb':scb,'ist':ist,'rov':rov};
        }
      }

      return keyIndexList
  }


// Function to sequence keyframe properties. Works in conjunction with collectKeyframes() function;
  function sequenceKeyframes(props, keysArray, comp, frames){
    try{
      var compFrameRate = comp.frameDuration;
      var frameDelay = compFrameRate * parseInt(frames);

      if(isNaN(frames) || frames.trim() == ''){
        return alert("Please enter a number in the text field")
      }


      var propSelection = props;
      

      // remove keyframes on properties
      for(var i = 0; i< propSelection.length; i++){
         while(propSelection[i].numKeys > 0){
            propSelection[i].removeKey(1);
          }
      }

      // paste keyframes and sequence them
      var newKeyTime, addNewKey, newKeyIndex;
      var keyArrayLength = keysArray.length;
      for(var j = 0; j < propSelection.length; j++){
        var propSel = propSelection[j];
        for(var k = 0; k< keyArrayLength; k++){
          addNewKey = propSel.addKey(keysArray[k].curKeyTime + (frameDelay * j));
          newKeyIndex = addNewKey;
          propSel.setValueAtKey(newKeyIndex, keysArray[k].curKeyValue);

          propSel.setInterpolationTypeAtKey(newKeyIndex, keysArray[k].inin, keysArray[k].outin);
          if(keysArray[k].inin == KeyframeInterpolationType.BEZIER && keysArray[k].outin == KeyframeInterpolationType.BEZIER && keysArray[k].cb){
            propSel.setTemporalContinuousAtKey(newKeyIndex, keysArray[k].cb);
            propSel.setTemporalAutoBezierAtKey(newKeyIndex, keysArray[k].ab);
          };

          if(propSel.propertyValueType == PropertyValueType.TwoD_SPATIAL || propSel.propertyValueType == PropertyValueType.ThreeD_SPATIAL){
            propSel.setSpatialContinuousAtKey(newKeyIndex, keysArray[k].scb);
            propSel.setSpatialAutoBezierAtKey(newKeyIndex, keysArray[k].sab);
            propSel.setSpatialTangentsAtKey(newKeyIndex, keysArray[k].ist, keysArray[k].ost);
            propSel.setRovingAtKey(newKeyIndex, keysArray[k].rov)
          };

        }
      }

      return

    } catch(err){
      alert(err.line.toString() + "\r" + err.toString());
    }
  }



