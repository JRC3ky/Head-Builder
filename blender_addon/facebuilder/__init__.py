"""
FaceBuilder for Blender - Professional Face Modeling Addon
Version: 1.0.0
Author: Emergent AI
Description: Create photorealistic 3D faces from photos with advanced mesh controls
"""

bl_info = {
    "name": "FaceBuilder for Blender",
    "author": "Emergent AI",
    "version": (1, 0, 0),
    "blender": (3, 0, 0),
    "location": "3D Viewport > Sidebar > FaceBuilder",
    "description": "Create photorealistic 3D faces from photos with advanced mesh controls",
    "category": "Mesh",
    "doc_url": "https://github.com/emergent-ai/facebuilder",
    "tracker_url": "https://github.com/emergent-ai/facebuilder/issues",
}

import bpy
from . import operators
from . import panels
from . import properties
from . import utils

# Registration functions
def register():
    """Register all addon components"""
    properties.register()
    operators.register()
    panels.register()
    
    print("FaceBuilder for Blender addon registered successfully!")

def unregister():
    """Unregister all addon components"""
    panels.unregister()
    operators.unregister()
    properties.unregister()
    
    print("FaceBuilder for Blender addon unregistered successfully!")

if __name__ == "__main__":
    register()