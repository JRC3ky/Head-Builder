"""
FaceBuilder Utilities - Helper functions for mesh manipulation
"""

import bpy
import bmesh
from mathutils import Vector
import numpy as np

def update_face_parameters(obj, facebuilder_props):
    """Update face mesh based on current parameters"""
    if not obj or obj.type != 'MESH':
        return
    
    # Enter edit mode
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.mode_set(mode='EDIT')
    
    # Get bmesh representation
    bm = bmesh.from_mesh(obj.data)
    bm.faces.ensure_lookup_table()
    bm.verts.ensure_lookup_table()
    
    # Apply face parameters to vertices
    apply_face_width(bm, facebuilder_props.face_width)
    apply_face_height(bm, facebuilder_props.face_height)
    apply_eye_distance(bm, facebuilder_props.eye_distance)
    apply_nose_height(bm, facebuilder_props.nose_height)
    apply_mouth_width(bm, facebuilder_props.mouth_width)
    apply_chin_height(bm, facebuilder_props.chin_height)
    
    # Update mesh
    bmesh.update_edit_mesh(obj.data)
    bm.free()
    
    # Return to object mode
    bpy.ops.object.mode_set(mode='OBJECT')

def apply_face_width(bm, width_factor):
    """Apply face width parameter to mesh"""
    for vert in bm.verts:
        # Scale X coordinate based on face width
        vert.co.x *= width_factor

def apply_face_height(bm, height_factor):
    """Apply face height parameter to mesh"""
    for vert in bm.verts:
        # Scale Z coordinate based on face height
        vert.co.z *= height_factor

def apply_eye_distance(bm, distance_factor):
    """Apply eye distance parameter to mesh"""
    for vert in bm.verts:
        # Affect vertices in eye region (upper face, middle Z)
        if 0.2 < vert.co.z < 0.6:
            if abs(vert.co.y) < 0.3:  # Front of face
                vert.co.x *= distance_factor

def apply_nose_height(bm, height_factor):
    """Apply nose height parameter to mesh"""
    for vert in bm.verts:
        # Affect vertices in nose region
        if -0.1 < vert.co.z < 0.3:
            if vert.co.y > 0.8:  # Front of face
                # Move nose forward/backward
                nose_influence = 1.0 - abs(vert.co.x) * 2  # Stronger at center
                if nose_influence > 0:
                    vert.co.y += (height_factor - 1.0) * 0.2 * nose_influence

def apply_mouth_width(bm, width_factor):
    """Apply mouth width parameter to mesh"""
    for vert in bm.verts:
        # Affect vertices in mouth region
        if -0.4 < vert.co.z < -0.1:
            if vert.co.y > 0.5:  # Front of face
                mouth_influence = 1.0 - abs(vert.co.z + 0.25) * 4  # Peak at mouth level
                if mouth_influence > 0:
                    vert.co.x *= (1.0 + (width_factor - 1.0) * mouth_influence)

def apply_chin_height(bm, height_factor):
    """Apply chin height parameter to mesh"""
    for vert in bm.verts:
        # Affect vertices in chin region (lower face)
        if vert.co.z < -0.2:
            chin_influence = min(1.0, (-vert.co.z - 0.2) * 2)  # Stronger at bottom
            if chin_influence > 0:
                vert.co.z -= (height_factor - 1.0) * 0.3 * chin_influence

def create_face_landmarks():
    """Create face landmark points for alignment"""
    landmarks = {
        'left_eye': Vector((-0.3, 0.8, 0.3)),
        'right_eye': Vector((0.3, 0.8, 0.3)),
        'nose_tip': Vector((0.0, 1.0, 0.0)),
        'mouth_left': Vector((-0.2, 0.9, -0.2)),
        'mouth_right': Vector((0.2, 0.9, -0.2)),
        'chin': Vector((0.0, 0.7, -0.5)),
    }
    return landmarks

def align_photo_to_mesh(photo_obj, mesh_obj, view_type='FRONT'):
    """Align reference photo to mesh based on landmarks"""
    landmarks = create_face_landmarks()
    
    if view_type == 'FRONT':
        # Position photo in front of mesh
        photo_obj.location = (0, -3, 0)
        photo_obj.rotation_euler = (0, 0, 0)
    elif view_type == 'PROFILE':
        # Position photo to the side
        photo_obj.location = (3, 0, 0)
        photo_obj.rotation_euler = (0, 0, 1.5708)  # 90 degrees
    elif view_type == 'THREE_QUARTER':
        # Position at 45-degree angle
        photo_obj.location = (2, -2, 0)
        photo_obj.rotation_euler = (0, 0, 0.785)  # 45 degrees

def generate_uv_layout(obj):
    """Generate UV layout for texture mapping"""
    if not obj or obj.type != 'MESH':
        return
    
    # Select object and enter edit mode
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.mode_set(mode='EDIT')
    
    # Select all faces
    bpy.ops.mesh.select_all(action='SELECT')
    
    # Mark seams for face (simplified)
    bpy.ops.mesh.mark_seam(clear=False)
    
    # Unwrap UV
    bpy.ops.uv.unwrap(method='ANGLE_BASED', margin=0.001)
    
    # Return to object mode
    bpy.ops.object.mode_set(mode='OBJECT')

def create_skin_material():
    """Create a realistic skin material"""
    mat = bpy.data.materials.new(name="FaceBuilder_Skin_Advanced")
    mat.use_nodes = True
    
    # Clear existing nodes
    nodes = mat.node_tree.nodes
    nodes.clear()
    
    # Create nodes
    output = nodes.new(type='ShaderNodeOutputMaterial')
    principled = nodes.new(type='ShaderNodeBsdfPrincipled')
    
    # Add subsurface scattering for skin
    principled.inputs['Subsurface'].default_value = 0.15
    principled.inputs['Subsurface Radius'].default_value = (1.0, 0.2, 0.1)
    principled.inputs['Subsurface Color'].default_value = (0.9, 0.4, 0.3, 1.0)
    
    # Base skin color
    principled.inputs['Base Color'].default_value = (0.8, 0.6, 0.5, 1.0)
    principled.inputs['Roughness'].default_value = 0.4
    principled.inputs['Specular'].default_value = 0.3
    
    # Connect nodes
    mat.node_tree.links.new(principled.outputs['BSDF'], output.inputs['Surface'])
    
    return mat

def add_face_modifiers(obj):
    """Add appropriate modifiers for face mesh"""
    # Mirror modifier for symmetry
    if not any(mod.type == 'MIRROR' for mod in obj.modifiers):
        mirror = obj.modifiers.new(name="Mirror", type='MIRROR')
        mirror.axis[0] = True  # X-axis mirror
        mirror.use_clip = True
    
    # Subdivision surface for smoothness
    if not any(mod.type == 'SUBSURF' for mod in obj.modifiers):
        subsurf = obj.modifiers.new(name="SubSurf", type='SUBSURF')
        subsurf.levels = 2
    
    # Smooth corrective for organic shapes
    if not any(mod.type == 'CORRECTIVE_SMOOTH' for mod in obj.modifiers):
        smooth = obj.modifiers.new(name="CorrectiveSmooth", type='CORRECTIVE_SMOOTH')
        smooth.iterations = 2