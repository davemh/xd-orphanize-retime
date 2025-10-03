// XD Orphanize-Retime v1.0.0
// Release Date 2025-Oct-03
// AE script that run xd-orphanize-layers followed by xd-comp-retimer.
// 1. This looks through all 60fps comps and batch-deletes unnecessary shape layers set up as parents.
// 2. Then for every comp with a framerate of 60fps, it changes the framerate to 24fps.
//
// Handy when making sense of comps built by Adobe XD's "Export to After Effects" feature,
// which may dozens of parent shape layers that serve no purpose,
// and an unweildy number of precomps, all set to 60fps.
//
// by Dave Hess https://github.com/davemh
//
// Install via File -> Scripts -> Install Script File...

// 1. Define the main function from xd-orphanize-layers (placing it in its own undoGroup).
// We'll identify all 60fps comps (presumed to be imported from XD), then delete all shape layers with names that start with "Artwork or "Group".

function orphanizeLayers() {
    var project = app.project;
    app.beginUndoGroup("Delete Shape Layers in 60fps Comps");

    for (var i = 1; i <= project.numItems; i++) {
        var item = project.item(i);
        if (item instanceof CompItem && item.frameRate === 60) {
            // Collect layer indices to delete in reverse order
            var layerIndicesToDelete = [];

            // First pass: Identify layer indices to delete
            for (var j = item.numLayers; j >= 1; j--) {
                try {
                    var layer = item.layer(j);
                    
                    // Check if layer is a shape layer
                    if (layer.matchName === "ADBE Vector Layer") {
                        var layerName = layer.name || "";
                        
                        // Check if the layer starts with "Group" or "Artwork"
                        if (layerName.indexOf("Group") === 0 || layerName.indexOf("Artwork") === 0) {
                            layerIndicesToDelete.push(j);
                        }
                    }
                } catch (layerError) {
                    $.writeln("Error accessing layer " + j + ": " + layerError.toString());
                }
            }

            // Second pass: Delete identified layers
            for (var k = 0; k < layerIndicesToDelete.length; k++) {
                try {
                    var layerToDelete = item.layer(layerIndicesToDelete[k]);
                    if (layerToDelete && layerToDelete.enabled) {
                        $.writeln("Deleting layer: " + layerToDelete.name + " at index " + layerIndicesToDelete[k]);
                        layerToDelete.remove();
                    }
                } catch (deleteError) {
                    $.writeln("Could not delete layer at index " + layerIndicesToDelete[k] + ": " + deleteError.toString());
                }
            }
        }
    }

    app.endUndoGroup();
}

// 2. Define the main function from xd-comp-retimer (placing it in its own undoGroup).
// We'll identify all 60fps comps, then change their framerates to 24fps.
function changeCompFramerateTo24fps() {
    var project = app.project;
    app.beginUndoGroup("Change Framerate of 60fps Comps to 24fps");

    for (var i = 1; i <= project.numItems; i++) {
        var item = project.item(i);
        if (item instanceof CompItem && item.frameRate === 60) {
            item.frameRate = 24;
        }
    }

    app.endUndoGroup();
}

// Execute main function from xd-orphanize-layers, followed by main function from xd-comp-retimer
orphanizeLayers();
changeCompFramerateTo24fps();