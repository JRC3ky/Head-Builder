"""
Head Builder Addon for Blender
===============================

This addon provides tools for building and customizing character heads in Blender.

Features:
- Base head mesh generation
- Facial feature customization  
- Texture and material application
- Export options for various formats
"""

bl_info = {
    "name": "Head Builder",
    "description": "Tools for building and customizing character heads in Blender",
    "author": "Head Builder Team",
    "version": (1, 0, 0),
    "blender": (3, 0, 0),
    "location": "View3D > Tools > Head Builder",
    "warning": "This addon is currently in development",
    "doc_url": "https://github.com/JRC3ky/Head-Builder",
    "category": "Mesh",
}

# Import addon modules
if "bpy" in locals():
    import importlib
    if "operators" in locals():
        importlib.reload(operators)
    if "panels" in locals():
        importlib.reload(panels)
else:
    from . import operators
    from . import panels

import bpy


def register():
    """Register addon classes and properties"""
    operators.register()
    panels.register()
    print("Head Builder addon registered successfully")


def unregister():
    """Unregister addon classes and properties"""
    panels.unregister()
    operators.unregister()
    print("Head Builder addon unregistered")


if __name__ == "__main__":
    register()