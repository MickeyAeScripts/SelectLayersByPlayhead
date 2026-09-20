// SelectFollowingLayers.jsx
// Selects every layer that starts at or after the playhead (its in point is to
// the right of the time cursor). Layers that straddle the playhead and layers
// that already ended are left out - see CFG.
(function () {
    // ---- config (tweak here for future variations) -------------------------
    var CFG = {
        DIRECTION: 1,               // 1 = following (right), -1 = previous (left)
        INCLUDE_STRADDLING: false,  // true = also take layers the playhead sits inside
        ADD_TO_SELECTION: false,    // true = keep the current selection and add to it
        SKIP_LOCKED: true           // locked layers can't be selected by AE anyway
    };
    // -----------------------------------------------------------------------

    var comp = app.project.activeItem;
    if (!(comp && comp instanceof CompItem)) return;

    var t = comp.time;
    var EPS = comp.frameDuration / 4;

    function isMatch(layer) {
        if (CFG.DIRECTION > 0) {
            // starts after the playhead, or (optionally) is still running at it
            return CFG.INCLUDE_STRADDLING ? (layer.outPoint > t + EPS)
                                          : (layer.inPoint >= t - EPS);
        }
        // ends before the playhead, or (optionally) started before it
        return CFG.INCLUDE_STRADDLING ? (layer.inPoint < t - EPS)
                                      : (layer.outPoint <= t + EPS);
    }

    app.beginUndoGroup(CFG.DIRECTION > 0 ? "Select Following Layers" : "Select Previous Layers");
    try {
        for (var i = 1; i <= comp.numLayers; i++) {
            var layer = comp.layer(i);
            if (CFG.SKIP_LOCKED && layer.locked) continue;
            var want = isMatch(layer);
            if (CFG.ADD_TO_SELECTION && !want) continue;
            try { layer.selected = want; } catch (e) {}
        }
    } finally {
        app.endUndoGroup();
    }
})();
