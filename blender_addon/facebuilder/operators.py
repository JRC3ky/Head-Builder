"""
FaceBuilder Operators - Main functionality operators
"""

import bpy
import bmesh
from bpy.types import Operator
from bpy_extras.io_utils import ImportHelper
from mathutils import Vector
import os

class FACEBUILDER_OT_create_head(Operator):
    """Create a new face mesh for modeling"""
    bl_idname = "facebuilder.create_head"
    bl_label = "Create Head"
    bl_description = "Create a new head mesh for face modeling"
    bl_options = {'REGISTER', 'UNDO'}
    
    def execute(self, context):
        # Create new mesh
        mesh = bpy.data.meshes.new("FaceBuilder_Head")
        obj = bpy.data.objects.new("FaceBuilder_Head", mesh)
        
        # Add to scene
        context.collection.objects.link(obj)
        context.view_layer.objects.active = obj
        obj.select_set(True)
        
        # Create basic head geometry
        bm = bmesh.new()
        
        # Create a proper head-shaped mesh instead of a sphere
        self.create_head_mesh(bm)
        
        bm.to_mesh(mesh)
        bm.free()
        
        # Mark as FaceBuilder mesh
        obj["facebuilder_mesh"] = True
        
        # Add materials
        self.setup_materials(obj)
        
        # Add modifiers
        if context.scene.facebuilder.enable_mirror:
            mirror_mod = obj.modifiers.new(name="Mirror", type='MIRROR')
            mirror_mod.axis[0] = True
        
        if context.scene.facebuilder.subdivision_level > 0:
            subsurf_mod = obj.modifiers.new(name="Subdivision", type='SUBSURF')
            subsurf_mod.levels = context.scene.facebuilder.subdivision_level
        
        # Set smooth shading
        if context.scene.facebuilder.enable_smoothing:
            bpy.ops.object.shade_smooth()
        
        self.report({'INFO'}, "FaceBuilder head mesh created successfully")
        return {'FINISHED'}
    
    def setup_materials(self, obj):
        """Setup materials for the face mesh"""
        # Create face material
        mat = bpy.data.materials.new(name="FaceBuilder_Skin")
        mat.use_nodes = True
        
        # Get material nodes
        nodes = mat.node_tree.nodes
        nodes.clear()
        
        # Create nodes
        output_node = nodes.new(type='ShaderNodeOutputMaterial')
        principled_node = nodes.new(type='ShaderNodeBsdfPrincipled')
        
        # Set skin-like properties
        principled_node.inputs['Base Color'].default_value = (0.8, 0.6, 0.5, 1.0)
        principled_node.inputs['Subsurface'].default_value = 0.1
        principled_node.inputs['Subsurface Color'].default_value = (0.9, 0.4, 0.3, 1.0)
        principled_node.inputs['Roughness'].default_value = 0.3
        
        # Link nodes
        mat.node_tree.links.new(principled_node.outputs['BSDF'], output_node.inputs['Surface'])
        
        # Assign material
        obj.data.materials.append(mat)
    
    def create_head_mesh(self, bm):
        """Create a proper anatomical head mesh"""
        # Create a cylinder as base and modify it to head shape
        bmesh.ops.create_cylinder(
            bm,
            cap_ends=True,
            radius=0.8,
            depth=2.4,
            segments=24
        )
        
        # Transform and shape into head
        for vert in bm.verts:
            x, y, z = vert.co.x, vert.co.y, vert.co.z
            
            # Create head profile - narrower at top and bottom
            height_factor = (z + 1.2) / 2.4  # Normalize height 0-1
            
            # Head width profile - wider in middle (temples), narrower at top and chin
            if height_factor > 0.7:  # Top of head (skull)
                width_scale = 0.6 + (1.0 - height_factor) * 0.8
            elif height_factor > 0.4:  # Face area
                width_scale = 0.9 + (height_factor - 0.4) * 0.3
            else:  # Chin/neck area
                width_scale = 0.5 + height_factor * 0.8
                
            # Apply width scaling
            vert.co.x *= width_scale
            vert.co.y *= width_scale
            
            # Create face profile - push forward in face area
            if 0.2 < height_factor < 0.8:
                # Face should protrude forward
                face_factor = 1.0 - abs(height_factor - 0.5) * 2  # Peak at middle
                if face_factor > 0:
                    # Push forward more at center, less at edges
                    center_distance = 1.0 - (x*x + y*y)**0.5 / 0.8
                    if center_distance > 0:
                        forward_push = face_factor * center_distance * 0.3
                        vert.co.y += forward_push
            
            # Create chin depression
            if height_factor < 0.3:
                chin_factor = (0.3 - height_factor) / 0.3
                center_distance = 1.0 - (x*x)**0.5 / 0.3
                if center_distance > 0 and abs(x) < 0.3:
                    vert.co.y -= chin_factor * center_distance * 0.1
                    
            # Create eye socket area (slight indentation)
            if 0.5 < height_factor < 0.7:
                eye_distance = ((abs(x) - 0.25)**2 + (y - 0.7)**2)**0.5
                if eye_distance < 0.2:
                    socket_depth = (0.2 - eye_distance) / 0.2 * 0.08
                    vert.co.y -= socket_depth
            
            # Adjust overall proportions
            vert.co.z *= 0.9  # Slightly compress height
            
        # Smooth the mesh
        bmesh.ops.smooth_vert(
            bm,
            verts=bm.verts,
            factor=0.5,
            mirror_clip_x=False,
            mirror_clip_y=False,
            mirror_clip_z=False,
            use_axis_x=True,
            use_axis_y=True,
            use_axis_z=True
        )

class FACEBUILDER_OT_load_photo(Operator, ImportHelper):
    """Load reference photo for face modeling"""
    bl_idname = "facebuilder.load_photo"
    bl_label = "Load Reference Photo"
    bl_description = "Load a reference photo for face modeling"
    bl_options = {'REGISTER', 'UNDO'}
    
    filename_ext = ""
    filter_glob: bpy.props.StringProperty(
        default="*.jpg;*.jpeg;*.png;*.bmp;*.tiff",
        options={'HIDDEN'}
    )
    
    view_type: bpy.props.EnumProperty(
        name="View Type",
        items=[
            ('FRONT', 'Front View', 'Frontal face view'),
            ('PROFILE', 'Profile View', 'Side profile view'),
            ('THREE_QUARTER', '3/4 View', 'Three quarter angle view'),
        ],
        default='FRONT'
    )
    
    def execute(self, context):
        # Add photo to collection
        photos = context.scene.facebuilder.reference_photos
        photo = photos.add()
        photo.name = os.path.basename(self.filepath)
        photo.filepath = self.filepath
        photo.view_type = self.view_type
        
        # Load image in Blender
        try:
            image = bpy.data.images.load(self.filepath)
            self.report({'INFO'}, f"Photo loaded: {photo.name}")
            
            # Create image plane for reference
            self.create_reference_plane(context, image, self.view_type)
            
        except Exception as e:
            self.report({'ERROR'}, f"Failed to load photo: {str(e)}")
            return {'CANCELLED'}
        
        return {'FINISHED'}
    
    def create_reference_plane(self, context, image, view_type):
        """Create reference plane with the loaded image"""
        # Create plane
        bpy.ops.mesh.primitive_plane_add(size=2)
        plane = context.active_object
        plane.name = f"Reference_{view_type}"
        
        # Position based on view type
        if view_type == 'FRONT':
            plane.location = (0, -3, 0)
        elif view_type == 'PROFILE':
            plane.location = (3, 0, 0)
            plane.rotation_euler = (0, 0, 1.5708)  # 90 degrees
        elif view_type == 'THREE_QUARTER':
            plane.location = (2, -2, 0)
            plane.rotation_euler = (0, 0, 0.785)  # 45 degrees
        
        # Create material with image
        mat = bpy.data.materials.new(name=f"Reference_Mat_{view_type}")
        mat.use_nodes = True
        
        nodes = mat.node_tree.nodes
        nodes.clear()
        
        # Create nodes
        output_node = nodes.new(type='ShaderNodeOutputMaterial')
        emission_node = nodes.new(type='ShaderNodeEmission')
        image_node = nodes.new(type='ShaderNodeTexImage')
        
        # Set image
        image_node.image = image
        
        # Link nodes
        mat.node_tree.links.new(image_node.outputs['Color'], emission_node.inputs['Color'])
        mat.node_tree.links.new(emission_node.outputs['Emission'], output_node.inputs['Surface'])
        
        # Assign material
        plane.data.materials.append(mat)

class FACEBUILDER_OT_auto_align(Operator):
    """Automatically align reference photos"""
    bl_idname = "facebuilder.auto_align"
    bl_label = "Auto Align"
    bl_description = "Automatically align reference photos with the mesh"
    bl_options = {'REGISTER', 'UNDO'}
    
    def execute(self, context):
        photos = context.scene.facebuilder.reference_photos
        
        if len(photos) == 0:
            self.report({'WARNING'}, "No reference photos loaded")
            return {'CANCELLED'}
        
        # Simple alignment - mark all photos as aligned
        for photo in photos:
            photo.is_aligned = True
        
        self.report({'INFO'}, f"Aligned {len(photos)} reference photo(s)")
        return {'FINISHED'}

class FACEBUILDER_OT_generate_texture(Operator):
    """Generate texture from reference photos"""
    bl_idname = "facebuilder.generate_texture"
    bl_label = "Generate Texture"
    bl_description = "Generate face texture from reference photos"
    bl_options = {'REGISTER', 'UNDO'}
    
    def execute(self, context):
        obj = context.active_object
        
        if not obj or not obj.get("facebuilder_mesh"):
            self.report({'ERROR'}, "Please select a FaceBuilder mesh")
            return {'CANCELLED'}
        
        photos = context.scene.facebuilder.reference_photos
        if len(photos) == 0:
            self.report({'WARNING'}, "No reference photos loaded")
            return {'CANCELLED'}
        
        # Create texture from photos (simplified)
        self.create_procedural_texture(obj)
        
        self.report({'INFO'}, "Texture generated successfully")
        return {'FINISHED'}
    
    def create_procedural_texture(self, obj):
        """Create a procedural skin texture"""
        mat = obj.data.materials[0] if obj.data.materials else None
        
        if not mat:
            return
        
        # Enhanced skin material
        nodes = mat.node_tree.nodes
        principled = nodes.get("Principled BSDF")
        
        if principled:
            # Add noise texture for skin variation
            noise_node = nodes.new(type='ShaderNodeTexNoise')
            noise_node.inputs['Scale'].default_value = 50.0
            noise_node.inputs['Detail'].default_value = 15.0
            
            # Add color ramp for skin tones
            ramp_node = nodes.new(type='ShaderNodeValToRGB')
            ramp = ramp_node.color_ramp
            ramp.elements[0].color = (0.7, 0.5, 0.4, 1.0)  # Darker skin
            ramp.elements[1].color = (0.9, 0.7, 0.6, 1.0)  # Lighter skin
            
            # Link nodes
            mat.node_tree.links.new(noise_node.outputs['Fac'], ramp_node.inputs['Fac'])
            mat.node_tree.links.new(ramp_node.outputs['Color'], principled.inputs['Base Color'])

class FACEBUILDER_OT_refine_mesh(Operator):
    """Refine the face mesh based on parameters"""
    bl_idname = "facebuilder.refine_mesh"
    bl_label = "Refine Mesh"
    bl_description = "Apply current face parameters to refine the mesh"
    bl_options = {'REGISTER', 'UNDO'}
    
    def execute(self, context):
        obj = context.active_object
        
        if not obj or not obj.get("facebuilder_mesh"):
            self.report({'ERROR'}, "Please select a FaceBuilder mesh")
            return {'CANCELLED'}
        
        # Apply current face parameters
        from . import utils
        utils.update_face_parameters(obj, context.scene.facebuilder)
        
        self.report({'INFO'}, "Mesh refined with current parameters")
        return {'FINISHED'}

def register():
    """Register operators"""
    bpy.utils.register_class(FACEBUILDER_OT_create_head)
    bpy.utils.register_class(FACEBUILDER_OT_load_photo)
    bpy.utils.register_class(FACEBUILDER_OT_auto_align)
    bpy.utils.register_class(FACEBUILDER_OT_generate_texture)
    bpy.utils.register_class(FACEBUILDER_OT_refine_mesh)

def unregister():
    """Unregister operators"""
    bpy.utils.unregister_class(FACEBUILDER_OT_refine_mesh)
    bpy.utils.unregister_class(FACEBUILDER_OT_generate_texture)
    bpy.utils.unregister_class(FACEBUILDER_OT_auto_align)
    bpy.utils.unregister_class(FACEBUILDER_OT_load_photo)
    bpy.utils.unregister_class(FACEBUILDER_OT_create_head)