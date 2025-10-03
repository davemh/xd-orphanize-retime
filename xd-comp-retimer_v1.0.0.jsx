// XD Comp Retimer v1.0.0
// Release Date 2025-Sept-19
// Batch-changes all comp frame rates to 24fps without opening them.
//
// Handy when exporting layouts to AE from Adobe XD,
// where there can be hundreds of precomps, and the defaults
// wrongly assume that all comp framerates should be set to 60fps.
//
// by Dave Hess https://github.com/davemh
//
// Install via File -> Scripts -> Install Script File...

(function changeCompFramerate() {
    var targetFramerate = 24; // <-- specify desired framerate for all comps here
    var changedCount = 0;

    app.beginUndoGroup("Change Comp Framerates");

    var project = app.project;
    if (!project) {
        alert("No project open.");
        return;
    }

    for (var i = 1; i <= project.numItems; i++) {
        var item = project.item(i);
        if (item instanceof CompItem) {
            if (item.frameRate !== targetFramerate) {
                item.frameRate = targetFramerate;
                changedCount++;
            }
        }
    }

    app.endUndoGroup();

    alert("Updated " + changedCount + " comps to " + targetFramerate + " fps.");
})();
