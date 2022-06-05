/**
 * Speeds up render process without having to go through the render queue
 * 
 * @author: Kyle Harter <k.harter@glassandmarker.com>
 * @version 0.2.3
 * 5.31.2022
 * 
 * 
*/


(function km_renderHelper(thisObj) {

    createUI(thisObj)

    function createUI(thisObj) {
        var scriptName = "KM_Render Helper";
        var panelWidth = 200;
        var textFieldHeight = 30;
        var renderHelperHeader = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\u00C4\x00\x00\x00\x1C\b\x06\x00\x00\x00>\u00CB\x10)\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x03#IDATx\u009C\u00ED\u009B\u00ED\u0091\u00DA0\x10\u0086\u0097L\x1A %@\tw%8%\u00A4\x05\u00AE\x04S\x02\u0094\u00C0\u0095\u0090\u0094\x00%$%@\tP\u00823\u00C7\u00C9\u00DC\u00F2\u009E\u00ACo\u00D9\u00C7\u00CC\u00FB\u00CC\u00E8\x07ckW\u00DA\u00D5J+\u00C9\u00CC\u00BA\u00AE\x13B\u00C8;\u00DFh\x07B>`@\x10\u00A2`@\x10\u00A2\u00D0\x01\u00D1y\u00CAYD~\u008B\u00C8j\u00C0\u0080\u00BE\u00FAX\\u\u00F7\x03:\u00DA\b\x196\u0099\x1B\x11Y8\x06@\u00C9>`\u00F1\u00D9\u00CF\u0085K\u00AF\u00AB\r\u00B5\u00FA\u0096\u00DAn,Gc\u0093&\u00B1\u00FEP\u00BBB\u00DE\u00B5\u00EB~\u00DBT\u009B\x12\u00C3N\u00D5K\u00A9\u00DF\x05\u00D4m,:\u00DAH\x19C\u00B4\x16\u00D95\u00FA0\u0084\u00CD~\u00AE\u00E2\u00D2\u00EBjC\u00AD\u00BE\u00A5\u00B6\u00DB\u00C5\u00A6\u00A0?b\u00B9\u00F9#5eZ%\u00CEt1\u00EC*\u00CA\u00DE\u0098\u00D5f*\u00C6\u00B0\u00DF\u00A3\u00D1:V\u008A\u00DA\u00DC\u00FC\u00E1\n\u0088\u0099*?D\u00E4\x15\u009E\u00FF\u00F24r\u00E6)>\x16\u0099\u0083V\u00EB\x7F\x16\u0091?\u00F0\u00FC-(\u00E6\x15\u00FB\u0090k\u00BF\u00DA\u00E4\u00FA'\x05-\x7F)\"\x07\u0090\u00E1\u009B$R\u00DB\u008C\u00EF-\u0087\u00FC\u00A1\u00EF!07\u00B4)p\u00BD\x13R\x7F\u0088\u00A1\u00BC\u00F4b\x1A\x7F1\u00BF[3\u0090S\u00F5\u00EFa\x16Z\u008B\u00C8\u00B6R\x1Fb\u00ED\u0097+\u00DB\u00F7^\u00ED\u00BE\u00A5\u00D4[\u0098\\\u00BE\u00E7b&\u008F\u00DAz\u00C5L\u0086g|\u00EF+\u009E2\u00E9Yc^8\u00B5\u00C1Ya\u00AA%\u009A\u00BCs\x02;\u00F8V\u00EC\u0092\\l\u00B2b\x02\x02\x07\u00E6\u00BFJ\r=@P\u00B4\u009E\u0093\u00A1X\u00D9\u009A\u00A7BrC\x18\u00CB~\u008F\x04\u00FA\u00D5:H+a\u00F5\u00C7w\u0087.}\u00F49\u00B7\f\x1E\u00CC\u00C9\u0091\u00A14\u00E8\u00A7e`\"[\u0098\u00BDw\u00A6^.hp\u00DF\u008C\u0094\u00D3\u0087\\\u00FB\u00A5\u00B4\u00AB\u0084\u008C\u0090\u00BE\u0095`a98\u00F1\u00E9Mm3\x1E\u00E3/,\u00C1x\u00F5\u0087+ \\\u00E9\u00C4\x01r\u00EF\u00D2\u00F4\u00ABD\u00DF\u0086\u00E6\x01\u00D3\u009B)\u00ED\u00F7U\u00F1\x052\u00A6\u00B4\u00A5\u00F0\u008D\u009D\u009B?R\u00F6\x10\u00EBB\u00B3\u00B5\u008F\x17x^b/\u0081+\u00C2\u0098Kt\u00CFX\u00F6{4\u00B6#\u00ADL\u00C8\u009D?\\+D\u00BF3_\u00C1\u00D2\x16\u009A\u00CF\u00E7\x1E\u00DD\u009D\u008C\u0091\u00FA@(\u00B1B\u00A0\f_\x1E\u009F\u00D3\u0087\\\u00FB\u0085\u00C8FbR\u00A9ZG\u00AB1\u009C\u008C\x0F^\x03\u0083!\u00B5\u00CD\u00BA\u00DE\x11|p\u00EF\u008F\u00C0\u00DB\u00C8#<\u00B3\u00DD\"\u00A7\u00DEfb]}\u008B<\u00EF\u00BA\u00EE\x1Cp3\x19\u00AA\x7F\u00EF\u00D0U\u00B2\x0F)\u00F6\x1B\u00FB\u00A6\u00BA\u0086\u00FE\u0092c\u00A2\u0096\u00DE\u00C6\u00F2\u00FC\u00E6\u008F\u00D0\u0094\t\u00F3\u00DD\u00B1ny/\u0085r\u00ED\u00A7\u0081ofj\u00E5\u00AC\u00C8T\u00F6#\u009F9X\x0E4n\u00FE\b\r\b\\\u00D2\u009A\u0080[E\u00DF\u00C7U\u00A1)\u00D0\u00D6r^\x1D\u0082\u00D6\u00F5\u00D7r3\u00BC\x0E\u00D8C\u0094\u00EAC\u008A\u00FDj\u0093\u00D37\u00DFG\u0094\u00B5(\u00E5\u008F\x17\u00F0}\x13\u00F2\u00E9\x06\u0082\u00B3\\\u00C8\u00A7\x0F\u00A5\u00C0\rv.xC=\x06S\u00DA\u008F\u00DCc\u00CB<\u00AE\u00FE\u0088\t\b\u00BC0\u009B\u00C3g\x145A\u00DD)\u00F4Gk\u00CB\u0089\u008E<\u00A7\u00B4\x1F\u00F9\f\u009Ej]\u00FD\u00C1\u00FFT\x13\u00A2\u00E0?\u00E6\bQ0 \bQ0 \bQ0 \bQ0 \bQ0 \bQ0 \b\u00E9\x11\u0091\u00FFQ\u00F2\u0081g\u00A4b\u00CA\u00EB\x00\x00\x00\x00IEND\u00AEB`\u0082";
        var gmLogo = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00%\x00\x00\x00$\b\x06\x00\x00\x00\x0E\u00C2\u00F3\u00A6\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x01#IDATX\u0085\u00C5\u00D8\u00DB\r\u00C20\f\x05P\u008B\t\x18\u0081\x11\x18\u0085\x11:\n\u00A3\u00C0&\u008C\u00C0\b\u008CP&0B\"R\u0089b\u00E7\u00FA\u0091&R\x7F\u00AA\u00DA:\u00AD\x1BW51s\u00C6qf\u00E6\u0095\u0099\u0097\u008C|\u0099\u00A0\u00B2\u00C2\u00B0l\u0090\x15\u00F6\u008D?f\u00A2$\x10\n+\u00F1\u00CF\x1A6\n\u00D4\u0083\u00D5\u00F1\x7F\u00B0L\u00D0\x0B\u0084I\u00F1W/JJX\u00EEt\u00A9\u00CE\u00AF\u00BF\u0098^\u00FC\u00CD[\u00BE\x1E\u00A8\\W`.\u0090\x05\u0085\u0082\u00B60\x17\bEYAh|\x13\u0084\u00A0F\u0081\x1EZ\u00DC\fPYb\x1F\u009B\x05Ra{\u0097\f\u0082\u00ED\u00FDR\u00D7}\u00AC\t\u009B\u00B1\u00CB\u00BA\u00B0Y\u00DB^\u0085e\u0080H\u00F8\u00EE\u0089}\u00A8\x07;P\u00CE\u00BA\x10\u00D1{\u0093\u00E9ND\u008B;sR\u00F9\u00B69zO\b*_&\u00EC\x14\x05\u008Dh\taP\x0B5\x12\x06\u0081$\u00D4\b\x18\f\u00D2P\u00990\x13\u00A8\u0087\u00CA\u0080\u0099A\b*\x02s\u0081P\u0094\x07\u00E6\x06YP\x16X\bdE!\u00B00\u00C8\u0083\u00D2`\u00E8\u00CF\u00E8\x10\u0094\x06\x0B\u0083\"(\x04\u00E6\x1E\tEP\x1A,4\u00A3\u008A\u00A2Z\u00B0\u00E9C\u00B3\x1A\x16\x1F/2\u00D3\x07\f\u00CB\u00B3\x12\u008933=\x00\x00\x00\x00IEND\u00AEB`\u0082";

        var win = thisObj instanceof Panel
            ? thisObj
            : new Window("palette", scriptName, undefined, {
                resizeable: true
            })

        win.orientation = 'column';
        win.alignChildren = ["fill", "top"];


        var headerGroup = win.add("group", undefined, "headerGroup")
        headerGroup.orientation = "row";
        var headerButton = headerGroup.add("image", undefined, renderHelperHeader);
        var logoButton = headerGroup.add("image", undefined, gmLogo);


        var addRenderQuePanel = win.add("panel", undefined, "Add to Render Que");
        addRenderQuePanel.alignChildren = ["fill", "top"];
        var addRQButton = addRenderQuePanel.add("button", undefined, "Add to Render Queue");

        // ----- A panel  for setting the save location of your render ------
        var saveLocationPanel = win.add("panel", undefined, "Output Location");
        saveLocationPanel.orientation = 'row';
        saveLocationPanel.alignChildren = ["fill", "top"];
        var saveLocationChange = saveLocationPanel.add("statictext", undefined, 'Click Button To Update');
        saveLocationChange.preferredSize = [panelWidth, textFieldHeight];
        if ($.os.indexOf("Windows") != -1) {
            folderPath = "C:\\Users\\" + system.userName + "\\Desktop"
        } else {
            var folderPath = "~/Desktop";
        }

        saveLocationChange.text = folderPath;

        var changeLocationButtonGroup = saveLocationPanel.add("group", undefined, "Save Location Top");
        changeLocationButtonGroup.alignChildren = ["right", "top"];
        var changeLocationButton = changeLocationButtonGroup.add("Button", undefined, "Change");
        
        changeLocationButton.helpTip = "Click to change output location";


        // ----- A panel for setting the output modules and application used for your render ------

        var renderSettingsButtonPanel = win.add("panel", undefined, "Output Module");
        renderSettingsButtonPanel.orientation = "column";
        renderSettingsButtonPanel.alignChildren = ["fill", "top"]
        var renderAppGroup = renderSettingsButtonPanel.add("group", undefined, "render app");
        renderAppGroup.orientation = "row";
        var renderInAEButton = renderAppGroup.add('radiobutton', undefined, "Render in AE");
        renderInAEButton.value = true;
        var renderInAMEButton = renderAppGroup.add('radiobutton', undefined, "Render in AME");
        var renderSettingsDropdown = renderSettingsButtonPanel.add("dropdownlist", undefined, "");
        renderSettingsDropdown.selection = 0;
        renderSettingsDropdown.size = [200, textFieldHeight];


        // ----- A panel for setting the output name used for your render ------

        var saveNamePanel = win.add("panel", undefined, "Output Name");
        saveNamePanel.orientation = 'column';
        saveNamePanel.alignChildren = ["fill", "top"]
        var renderNameGroup = saveNamePanel.add("group", undefined, "Render Name Options");
        renderNameGroup.orientation = "column";
        renderNameGroup.alignChildren = "left";
        var renderNameButtonGroup = renderNameGroup.add("group", undefined, "Render Name Buttons")
        var compNameButton = renderNameButtonGroup.add("RadioButton", undefined, "Comp Name");
        compNameButton.value = true;
        var customNameButton = renderNameButtonGroup.add("RadioButton", undefined, "Custom Name");
        var renderNameEdit = saveNamePanel.add("EditText", [0, 0, panelWidth, textFieldHeight], "");
        renderNameEdit.characters = 25;
        var renderNameChange = saveNamePanel.add("StaticText", undefined, '');
        renderNameChange.characters = renderNameEdit.characters;
        renderNameChange.text = renderNameEdit.text;
        

        var renderGroup = win.add("panel", undefined, "Render Me");
        renderGroup.orientation = 'row';
        renderGroup.alignChildren = ["fill", "top"];
        var renderButton = renderGroup.add("button", undefined, "Render");


        var helpGroup = win.add("group", undefined, "Help Me");
        renderGroup.orientation = 'row';
        helpGroup.alignment = ["right", "top"];
        var helpButton = helpGroup.add("button", undefined, "?");
        helpButton.alignment = ["center", ""];
        helpButton.size = [25, 25];

        changeLocationButton.onClick = function () {
            app.beginUndoGroup("output location");
            var folderLoc = Folder.selectDialog("Select Output Location");
            if (folderLoc != null) {
                saveLocationChange.text = folderLoc.toString().replace(/%20/g, " ");
                return saveLocationChange.text;
            }
            app.endUndoGroup()
        }


        helpButton.onClick = function () {
            alert("How to use:\nSelect comps\nClick Add to Render Que Button\nSet your destination folder.\nSelect your Output Module.\nEnter your clip name.\nClick Render.")
        }


        var activeSelection = app.project.selection;
    

        function getActiveSelection() {
            var compNameArray = new Array();

            for (var i = 0; i < activeSelection.length; i++) {
                if (activeSelection[i] instanceof CompItem) {
                    compNameArray.push(activeSelection[i])
                }
            }
            return compNameArray
        }

        var compSelection = getActiveSelection();

        var activeComp = app.project.activeItem;
        
        var renderQueue = app.project.renderQueue;


   function renderOutputModules() {
            var outputModuleTemplates = [];        
                var outputModules = renderQueue.item(1).outputModule(1).templates
            for (var i = 0; i < outputModules.length; i++) {
                outputModuleTemplates.push(outputModules[i])
            }
            return outputModuleTemplates
   }
        
        


        function addToRenderQueue(compsSelected) {
            while (renderQueue.numItems > 0) {
                renderQueue.item(1).remove();
            }

            if (compsSelected.length > 1) {
                for (var i = 0; i < compsSelected.length; i++) {
                    if (compsSelected[i] instanceof CompItem) {
                        renderQueue.items.add(compsSelected[i]);
                    }
                }
            } else if (activeComp && activeComp instanceof CompItem) {
                renderQueue.items.add(activeComp)
            }

            return renderQueue

        }



        addRQButton.onClick = function () {
            app.beginUndoGroup("Add To Render Que");

            if (!activeSelection) {
                alert("Select one or more comps in your project panel first");
                return
            }

            renderNameEdit.text = compSelection[0].name;
            renderInAEButton.value = true;

            addToRenderQueue(compSelection);
            populateOutputModules(renderSettingsDropdown);
            renderSettingsDropdown.selection = 0;

            app.endUndoGroup();
        }

        
        function populateOutputModules(renderSettingsList) {
            renderSettingsList.removeAll();
            for (var i = 0; i < renderOutputModules().length; i++) {
                if (!(renderOutputModules()[i].toString().split(" ")[0] === "_HIDDEN")) {
                    renderSettingsList.add("item", renderOutputModules()[i])
                }
            }

            return renderSettingsList
        }
  
        if (renderQueue.numItems > 0) {
            populateOutputModules(renderSettingsDropdown)
            renderSettingsDropdown.selection = 0
        }

        renderInAEButton.onClick = function () {
            populateOutputModules(renderSettingsDropdown);
            renderSettingsDropdown.selection = 0
        }

        renderInAMEButton.onClick = function () {
            renderSettingsDropdown.removeAll()
            renderSettingsDropdown.add("item", ["Recent render settings in AME"])
            renderSettingsDropdown.selection = 0
        }

        compNameButton.onClick = function () {
            renderNameEdit.text = renderQueue.item(1).comp.name;
        }

        customNameButton.onClick = function () {
            renderNameEdit.text = "Enter a custom render file name"
        }

        renderNameEdit.onChanging = function () { renderNameChange.text = renderNameEdit.text };
        
        renderButton.onClick = function () {
            if (renderInAEButton.value == true) {
                startRenderProcess(renderSettingsDropdown, compNameButton.value, renderNameEdit.text, saveLocationChange.text, renderInAEButton.value);
                alert("Render complete!\nComps rendered to:" + "\n" + saveLocationChange.text)
                win.close()
                return
            } else {
                win.close();
                startRenderProcess(renderSettingsDropdown, compNameButton.value, renderNameEdit.text, saveLocationChange.text, renderInAEButton.value);
                while (renderQueue.numItems > 0) {
                    renderQueue.item(1).remove();
                }
                return

            }

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
     *
     * @param {Object} renderSettingsList
     * @param {string} compNameOutput
     * @param {string} customOutput
     * @param {string} saveLocation
     * @param {Object} AERender
     * @return starts render process
     *  
     */
    function startRenderProcess(renderSettingsList, compNameOutput, customOutput, saveLocation, AERender) {

        var renderQueue = app.project.renderQueue;
        for (var b = 1; b <= renderQueue.numItems; b++) {
            var outputFolder = saveLocation;
            if (compNameOutput == true) {
                var outputName = renderQueue.item(b).comp.name;
            } else {
                outputName = customOutput
            }
            var outputModule = renderQueue.item(b).outputModule(1);

            if (AERender == true) {
                var renderSettingsName = renderSettingsList.selection.toString();
            } else {
                renderSettingsName = outputModule.templates[0]
            }
            outputModule.applyTemplate(renderSettingsName);
            outputModule.file = File(outputFolder + "/" + outputName);
        }


        if (AERender == true) {
            return renderQueue.render();
        } else {
            alert("Launching Adobe Media Encoder\nRendering will start automatically\nComps rendered to:" + "\n" + saveLocation);
            var bt = new BridgeTalk();
            if (!BridgeTalk.isRunning("ame")) {
                BridgeTalk.launch("ame", "background");
            }
            return renderQueue.queueInAME(true)
        }
    }

})(this)
