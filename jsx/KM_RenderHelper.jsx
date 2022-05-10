/**
 * Speeds up render process without having to go through the render queue
 * 
 * @author: Kyle Harter <k.harter@glassandmarker.com>
 * @version 0.1.6
 * 5.9.2022
 * 
 * 
*/


function km_renderHelper(thisObj) {

        /// GLOBAL VARIABLES
        
        var scriptName = "KM-Render Helper";


        var activeSelection = app.project.selection;

    if (!(app.project.activeItem instanceof CompItem)) {
        alert("Select a comp first")
        return
        }
    
        if (activeSelection.length === 0) {
            alert("Select a comp first")
            return
        }
        
    
    
        //// GLOBAL FUNCTIONS
        
        function getActiveSelection() {
            var compNameArray = new Array();
            // var activeItem = app.project.activeItem;
            for (var i = 0; i < activeSelection.length; i++) {
                if (activeSelection[i] instanceof CompItem) {
                    compNameArray.push(activeSelection[i])
                } 
            }
                return compNameArray
        }
    
        function getActiveComp() {
            var activeComp = app.project.activeItem;

            if (activeComp instanceof CompItem){
                return activeComp
            }

        }

    
    alert(getActiveComp().name)
    
        var compsSelected = getComps(activeSelection);

        function addToRenderQueue(compsSelected) {
            var renderQueue = app.project.renderQueue;
            while (renderQueue.numItems > 0) {
                renderQueue.item(1).remove();
            }

            for (var i = 0; i < compsSelected.length; i++) {
                renderQueue.items.add(compsSelected[i]);
            }

        // }

        // app.beginUndoGroup("remove and add items from Render queue");

        // addToRenderQueue()

        // app.endUndoGroup();

                
        function buildUI(thisObj) {

            var w = (thisObj instanceof Panel) ? thisObj : new Window("palette", scriptName)
            var mainWindow = new Window("window", "Render Helper", undefined, { resizeable: true });
            mainWindow.orientation = "column";
            mainWindow.alignment = ["fill", "fill"];

            var saveLocationPanel = mainWindow.add("panel", undefined, "Output Location");
            saveLocationPanel.orientation = 'column';
            saveLocationPanel.size = [250, 100];
            // saveLocationPanel.spacing = 20;
            saveLocationPanel.alignChildren = "left";
            var saveLocationResult = saveLocationPanel.add("group", undefined, "Save Name Bottom");
            saveLocationResult.orientation = 'column';
            saveLocationResult.alignChildren = "left";
            var saveLocationChange = saveLocationResult.add("StaticText", undefined, 'Click Button To Update');
            var folderPath = "~/Desktop";
            saveLocationChange.text = folderPath;

            var saveLocationButtonGroup = saveLocationPanel.add("group", undefined, "Save Location Top");
            saveLocationButtonGroup.alignment = "right"
            var saveLocationButton = saveLocationButtonGroup.add("Button", undefined, "Change");
            saveLocationButton.helpTip = "Click to change output location";

            var renderSettingsButtonPanel = mainWindow.add("panel", undefined, "Output Module");
            renderSettingsButtonPanel.orientation = "column";
            renderSettingsButtonPanel.preferredSize = [250, 50];
            renderSettingsButtonPanel.margins = 20;
            var renderAppGroup = renderSettingsButtonPanel.add("group", undefined, "render app");
            renderAppGroup.orientation = "row";
            var renderInAEButton = renderAppGroup.add('radiobutton', undefined, "Render in AE");
            renderInAEButton.value = true;
            var renderInAMEButton = renderAppGroup.add('radiobutton', undefined, "Render in AME");
            var renderSettingsDropdown = renderSettingsButtonPanel.add("dropdownlist", undefined, "");
            renderSettingsDropdown.alignment = 'center';
            renderSettingsDropdown.selection = 0;
            renderSettingsDropdown.size = [200, 25];

            var saveNamePanel = mainWindow.add("panel", undefined, "Output Name");
            saveNamePanel.orientation = 'column';
            saveNamePanel.preferredSize = [250, 100];
            saveNamePanel.margins = 15;
            saveNamePanel.spacing = 20;
            saveNamePanel.alignChildren = "left";
            var renderNameGroup = saveNamePanel.add("group", undefined, "Render Name Options");
            renderNameGroup.orientation = "column";
            renderNameGroup.alignChildren = "left";
            var compNameButton = renderNameGroup.add("RadioButton", undefined, "Comp Name");
            compNameButton.value = true;
            var customNameButton = renderNameGroup.add("RadioButton", undefined, "Custom Name");
            var renderNameEdit = saveNamePanel.add("EditText", undefined, "Enter a custom render name");
            renderNameEdit.characters = 30;
            var renderNameStatic = saveNamePanel.add("StaticText", undefined, 'Name:');
            var renderNameChange = saveNamePanel.add("StaticText", undefined, '');
            if (compNameButton.value = true) {
                renderNameEdit.text = getComps()[0].name;
            }
            renderNameChange.characters = renderNameEdit.characters;
            renderNameChange.text = renderNameEdit.text;
            renderNameEdit.onChanging = function () { renderNameChange.text = renderNameEdit.text };


            var renderGroup = mainWindow.add("panel", undefined, "Render Me");
            renderGroup.orientation = 'row';
            renderGroup.preferredSize = [250, 75];
            renderGroup.spacing = 10;
            var renderButton = renderGroup.add("button", undefined, "Render");
            renderButton.size = [200, 30];
            renderButton.alignment = ["center", ""];

            var helpGroup = mainWindow.add("group", undefined, "Help Me");
            renderGroup.orientation = 'row';
            helpGroup.alignment = ["right", "top"];
            var helpButton = helpGroup.add("button", undefined, "?");
            helpButton.alignment = ["center", ""];
            helpButton.size = [25, 25];



        


            function renderOutputModules() {
                outputModuleTemplates = [];
                var renderQueue = app.project.renderQueue;
                var outputModules = renderQueue.item(1).outputModule(1).templates;
                for (var i = 0; i < outputModules.length; i++) {
                    outputModuleTemplates.push(outputModules[i])
                }
                return outputModuleTemplates

            }

            function getFolderLoc() {
                var folderLoc = Folder.selectDialog("Select Output Location");
                return folderLoc;
            }

            saveLocationButton.onClick = function () {
                app.beginUndoGroup("output location");
                getFolderLoc().toString();
                saveLocationChange.text = getFolderLoc().toString().replace(/%20/g, " ");
                app.endUndoGroup()
            }

            helpButton.onClick = function () {
                alert("How to use:\nSet your destination folder.\nSelect your Output Module.\nEnter your clip name.\nClick Render.")
            }
        
            function populateOutputModules(renderSettingsDropdown) {
                var outputArray = new Array();
                renderSettingsDropdown.removeAll();

                for (var i = 0; i < renderOutputModules().length; i++) {
                    if (!(renderOutputModules()[i].toString().split(" ")[0] === "_HIDDEN")) {
                        renderSettingsDropdown.add("item", renderOutputModules()[i])
                    }
                }

                renderSettingsDropdown.selection = 0;
            }

            populateOutputModules(renderSettingsDropdown);


            function startRenderProcess(renderSettingsDropdown, compNameButton, renderNameEdit) {

                var renderSettings = renderSettingsDropdown.selection.toString();

        
                var renderQueue = app.project.renderQueue;
                for (var b = 1; b <= renderQueue.numItems; b++) {
                    var outputFolder = saveLocationChange.text;
                    if (compNameButton.value == true) {
                        var outputName = renderQueue.item(b).comp.name;
                    } else {
                        var outputName = renderNameEdit.text + "-" + b;
                    }
                    var outputModule = renderQueue.item(b).outputModule(1);
                    outputModule.applyTemplate(renderSettings);
                    outputModule.file = File(outputFolder + "/" + outputName);
                }


                if (renderInAEButton.value == true) {
                    return renderQueue.render();
                } else {
                    var bt = new BridgeTalk();
                    if (!BridgeTalk.isRunning("ame")) {
                        BridgeTalk.launch("ame", "background");
                    }
                    return renderQueue.queueInAME(true)
                }
            }
    
    
            renderButton.onClick = function () {
                app.beginUndoGroup("render");
                renderButton.active = false;
                if (renderInAEButton.value == true) {
                    startRenderProcess(renderSettingsDropdown, compNameButton, renderNameEdit);
                    mainWindow.close()
                    alert("Render complete!\nComps rendered to:" + "\n" + saveLocationChange.text)
                } else {
                    alert("Launching Adobe Media Encoder\nRendering will start automatically\nComps rendered to:" + "\n" + saveLocationChange.text);
                    mainWindow.close();
                    startRenderProcess(renderSettingsDropdown, compNameButton, renderNameEdit);
                    var renderQueue = app.project.renderQueue;
                    while (renderQueue.numItems > 0) {
                        renderQueue.item(1).remove();
                    }
            
                }
                app.endUndoGroup();
            }
        
            /// RETURN THE WINDOW
            w.layout.layout(true);
            w.onResizing = w.onResize = function () { w.layout.resize };
            w.onShow = function () { w.minimumSize = w.size }
            return w;

            
        }
        
        // Make UI
        var theWindow = buildUI(thisObj);
        if (theWindow instanceof Window) {
            theWindow.center();
            theWindow.show();
        } else {
            theWindow.layout.layout(true);
        }
 }
//// call km_renderhelper

    km_renderHelper(this);

