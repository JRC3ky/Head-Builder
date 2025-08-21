"""
FaceBuilder UI Panels - User interface for the addon
"""

import bpy
from bpy.types import Panel

class FACEBUILDER_PT_main_panel(Panel):
    """Main FaceBuilder panel in 3D viewport sidebar"""
    bl_label = "FaceBuilder"
    bl_idname = "FACEBUILDER_PT_main_panel"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = "FaceBuilder"
    
    def draw(self, context):
        layout = self.layout
        scene = context.scene.facebuilder
        
        # Main operations
        box = layout.box()
        box.label(text="Mesh Operations", icon='MESH_DATA')
        
        row = box.row()
        row.scale_y = 1.5
        row.operator("facebuilder.create_head", icon='ADD')
        
        row = box.row()
        row.operator("facebuilder.refine_mesh", icon='MOD_REMESH')

class FACEBUILDER_PT_photos_panel(Panel):
    """Reference photos management panel"""
    bl_label = "Reference Photos"
    bl_idname = "FACEBUILDER_PT_photos_panel"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = "FaceBuilder"
    bl_parent_id = "FACEBUILDER_PT_main_panel"
    
    def draw(self, context):
        layout = self.layout
        scene = context.scene.facebuilder
        
        # Photo loading
        box = layout.box()
        box.label(text="Load Photos", icon='IMAGE_DATA')
        
        row = box.row()
        row.operator("facebuilder.load_photo", text="Add Reference Photo", icon='FILEBROWSER')
        
        # Photo list
        if len(scene.reference_photos) > 0:
            box = layout.box()
            box.label(text=f"Photos ({len(scene.reference_photos)})", icon='OUTLINER_DATA_IMAGE')
            
            for i, photo in enumerate(scene.reference_photos):
                row = box.row()
                row.label(text=photo.name, icon='IMAGE_DATA')
                row.label(text=photo.view_type)
                if photo.is_aligned:
                    row.label(text="", icon='CHECKMARK')
                else:
                    row.label(text="", icon='X')
        
        # Alignment
        row = layout.row()
        row.operator("facebuilder.auto_align", icon='AUTO')

class FACEBUILDER_PT_parameters_panel(Panel):
    """Face parameters control panel"""
    bl_label = "Face Parameters"
    bl_idname = "FACEBUILDER_PT_parameters_panel"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = "FaceBuilder"
    bl_parent_id = "FACEBUILDER_PT_main_panel"
    
    def draw(self, context):
        layout = self.layout
        scene = context.scene.facebuilder
        
        # Face shape parameters
        box = layout.box()
        box.label(text="Face Shape", icon='MESH_MONKEY')
        
        col = box.column(align=True)
        col.prop(scene, "face_width", slider=True)
        col.prop(scene, "face_height", slider=True)
        
        # Facial features
        box = layout.box()
        box.label(text="Facial Features", icon='DRIVER_ROTATIONAL_DIFFERENCE')
        
        col = box.column(align=True)
        col.prop(scene, "eye_distance", slider=True)
        col.prop(scene, "nose_height", slider=True)
        col.prop(scene, "mouth_width", slider=True)
        col.prop(scene, "chin_height", slider=True)

class FACEBUILDER_PT_mesh_settings_panel(Panel):
    """Mesh settings and generation panel"""
    bl_label = "Mesh Settings"
    bl_idname = "FACEBUILDER_PT_mesh_settings_panel"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = "FaceBuilder"
    bl_parent_id = "FACEBUILDER_PT_main_panel"
    
    def draw(self, context):
        layout = self.layout
        scene = context.scene.facebuilder
        
        # Mesh quality settings
        box = layout.box()
        box.label(text="Mesh Quality", icon='MOD_SUBSURF')
        
        col = box.column()
        col.prop(scene, "mesh_resolution")
        col.prop(scene, "subdivision_level")
        
        # Modifiers
        box = layout.box()
        box.label(text="Modifiers", icon='MODIFIER')
        
        col = box.column()
        col.prop(scene, "enable_mirror")
        col.prop(scene, "enable_smoothing")

class FACEBUILDER_PT_materials_panel(Panel):
    """Materials and texturing panel"""
    bl_label = "Materials & Textures"
    bl_idname = "FACEBUILDER_PT_materials_panel"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = "FaceBuilder"
    bl_parent_id = "FACEBUILDER_PT_main_panel"
    
    def draw(self, context):
        layout = self.layout
        scene = context.scene.facebuilder
        
        # Texture generation
        box = layout.box()
        box.label(text="Texture Generation", icon='MATERIAL')
        
        col = box.column()
        col.prop(scene, "generate_textures")
        col.prop(scene, "auto_align")
        
        row = box.row()
        row.scale_y = 1.3
        row.operator("facebuilder.generate_texture", icon='TEXTURE')

class FACEBUILDER_PT_tools_panel(Panel):
    """Advanced tools panel"""
    bl_label = "Advanced Tools"
    bl_idname = "FACEBUILDER_PT_tools_panel"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = "FaceBuilder"
    bl_parent_id = "FACEBUILDER_PT_main_panel"
    
    def draw(self, context):
        layout = self.layout
        
        # Export options
        box = layout.box()
        box.label(text="Export", icon='EXPORT')
        
        col = box.column()
        col.operator("export_mesh.obj", text="Export as OBJ", icon='MESH_DATA')
        col.operator("export_mesh.fbx", text="Export as FBX", icon='OUTLINER_OB_MESH')
        
        # Quick actions
        box = layout.box()
        box.label(text="Quick Actions", icon='SETTINGS')
        
        col = box.column()
        col.operator("object.shade_smooth", text="Smooth Shading", icon='MOD_SMOOTH')
        col.operator("mesh.faces_shade_flat", text="Flat Shading", icon='MESH_DATA')

def register():
    """Register panels"""
    bpy.utils.register_class(FACEBUILDER_PT_main_panel)
    bpy.utils.register_class(FACEBUILDER_PT_photos_panel)
    bpy.utils.register_class(FACEBUILDER_PT_parameters_panel)
    bpy.utils.register_class(FACEBUILDER_PT_mesh_settings_panel)
    bpy.utils.register_class(FACEBUILDER_PT_materials_panel)
    bpy.utils.register_class(FACEBUILDER_PT_tools_panel)

def unregister():
    """Unregister panels"""
    bpy.utils.unregister_class(FACEBUILDER_PT_tools_panel)
    bpy.utils.unregister_class(FACEBUILDER_PT_materials_panel)
    bpy.utils.unregister_class(FACEBUILDER_PT_mesh_settings_panel)
    bpy.utils.unregister_class(FACEBUILDER_PT_parameters_panel)
    bpy.utils.unregister_class(FACEBUILDER_PT_photos_panel)
    bpy.utils.unregister_class(FACEBUILDER_PT_main_panel)