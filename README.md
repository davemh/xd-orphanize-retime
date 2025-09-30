# xd-orphanize-layers
Headless AE script that batch-deletes unnecessary shape layers set up as parents, in all 60fps comps in a project.

# Method
For every 60fps comp, the script searches for shape layers whose names start with "Artwork" or "Group", and batch deletes.

Handy when exporting layouts to AE from Adobe XD, where XD's "Export to After Effects..." option may generate dozens of unnecessary empty parent shape layers meant to identify instances where the designer imported artwork and placed in on an XD canvas, or used cmd/ctrl + G to group elements in XD.

Run before [xd-comp-retimer](https://github.com/davemh/xd-comp-retimer), as **xd-orphanize-layers** begins by checking for a framerate of 60fps, to filter comps to execute in.

# Installation & Usage

Install via File > Scripts > Install Script File...
Run via File > Scripts > xd-orphanize-layers_[version]
Run without installation via File > Scripts > Run Script...
