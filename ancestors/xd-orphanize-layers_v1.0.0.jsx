// XD Orphanize Layers v1.0.0
// Release Date 2025-Sept-30
// AE script that batch-deletes unnecessary shape layers set up as parents, in all 60fps comps in a project.
// For every 60fps comp, the script searches for shape layers whose names start with "Artwork" or "Group", and batch deletes.
//
// Handy when exporting layouts to AE from Adobe XD,
// where there can be dozens of empty parent shape layers meant to identify
// instances where the designer has imported artwork or used cmd/ctrl + G to group elements in XD.
// Run before xd-comp-retimer, as the script uses a framerate of 60fps to filter comps to execute in.
//
// by Dave Hess https://github.com/davemh
//
// Install via File -> Scripts -> Install Script File...

// Function to identify all 60fps comps (presumed to be imported from XD), and delete all shape layers with names that start with "Artwork or "Group".
function orphanizeLayers() {
    var project = app.project;
    app.beginUndoGroup("Orphanize Layers in 60fps Comps");

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
