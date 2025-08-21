"""
Head Builder Operators
======================

This file contains Blender operators (actions that can be performed).
Operators are the actions users can trigger through buttons, menus, or shortcuts.

Template for Head Builder operators.
"""

import bpy


class HeadBuilderOperator(bpy.types.Operator):
    """Template operator for Head Builder functionality"""
    bl_idname = "mesh.head_builder_example"
    bl_label = "Head Builder Example"
    bl_description = "Example operator for Head Builder addon"
    bl_options = {'REGISTER', 'UNDO'}

    def execute(self, context):
        """Execute the operator"""
        # TODO: Implement head building functionality
        self.report({'INFO'}, "Head Builder operator executed")
        return {'FINISHED'}

    @classmethod
    def poll(cls, context):
        """Check if operator can be executed in current context"""
        return context.mode == 'OBJECT'


# List of operator classes to register
classes = [
    HeadBuilderOperator,
]


def register():
    """Register operator classes"""
    for cls in classes:
        bpy.utils.register_class(cls)


def unregister():
    """Unregister operator classes"""
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)