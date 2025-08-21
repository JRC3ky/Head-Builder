"""
Head Builder UI Panels
======================

This file contains UI panels that appear in Blender's interface.
Panels provide the user interface for accessing addon functionality.

Template for Head Builder UI panels.
"""

import bpy


class HeadBuilderPanel(bpy.types.Panel):
    """Main panel for Head Builder tools"""
    bl_label = "Head Builder"
    bl_idname = "VIEW3D_PT_head_builder"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = "Head Builder"

    def draw(self, context):
        """Draw the panel UI"""
        layout = self.layout
        
        # Example button layout
        layout.label(text="Head Building Tools:")
        layout.operator("mesh.head_builder_example", text="Create Head")
        
        # TODO: Add more UI elements as functionality is developed
        layout.separator()
        layout.label(text="Settings:")
        # Add property controls here


# List of panel classes to register  
classes = [
    HeadBuilderPanel,
]


def register():
    """Register panel classes"""
    for cls in classes:
        bpy.utils.register_class(cls)


def unregister():
    """Unregister panel classes"""
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)