# xd-orphanize-retime
Single script that runs **xd-orphanize-layers**, followed by **xd-comp-retimer** (each in its own undoGroup). I run this as the first step in my day-to-day work of having to make sense of AE comps built by Adobe XD's "Export to After Effects..." feature.

[xd-orphanize-layers](https://github.com/davemh/xd-orphanize-layers): Headless AE script that batch-deletes unnecessary shape layers set up as parents, in all 60fps comps in a project.

[xd-comp-retimer](https://github.com/davemh/xd-comp-retimer): Headless AE script that batch-converts all 60fps comps in an AE project to 24fps.

# Method
Step 1. **xd-orphanize-layers** For every 60fps comp, the script searches for shape layers whose names start with "Artwork" or "Group", and deletes those layers.
Step 2. **xd-comp-retimer** For every 60fps comp, the script changes the framerate to 24fps.

# Installation & Usage
Install via File > Scripts > Install Script File...
Run via File > Scripts > xd-orphanize-layers_[version]
Run without installation via File > Scripts > Run Script...
