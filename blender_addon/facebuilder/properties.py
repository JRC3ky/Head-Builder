"""
FaceBuilder Properties - Scene and Object properties for FaceBuilder
"""

import bpy
from bpy.props import (
    FloatProperty,
    IntProperty,
    BoolProperty,
    StringProperty,
    EnumProperty,
    CollectionProperty,
    PointerProperty
)
from bpy.types import PropertyGroup

class FaceBuilderPhotoItem(PropertyGroup):
    """Property group for storing reference photos"""
    name: StringProperty(name="Photo Name", default="")
    filepath: StringProperty(name="File Path", subtype='FILE_PATH', default="")
    view_type: EnumProperty(
        name="View Type",
        items=[
            ('FRONT', 'Front View', 'Frontal face view'),
            ('PROFILE', 'Profile View', 'Side profile view'),
            ('THREE_QUARTER', '3/4 View', 'Three quarter angle view'),
            ('BACK', 'Back View', 'Back of head view'),
        ],
        default='FRONT'
    )
    is_aligned: BoolProperty(name="Is Aligned", default=False)

class FaceBuilderProperties(PropertyGroup):
    """Main property group for FaceBuilder settings"""
    
    # Face Parameters
    face_width: FloatProperty(
        name="Face Width",
        description="Adjust the width of the face",
        default=1.0,
        min=0.1,
        max=3.0,
        step=0.01,
        update=lambda self, context: update_face_mesh(self, context)
    )
    
    face_height: FloatProperty(
        name="Face Height", 
        description="Adjust the height of the face",
        default=1.0,
        min=0.1,
        max=3.0,
        step=0.01,
        update=lambda self, context: update_face_mesh(self, context)
    )
    
    eye_distance: FloatProperty(
        name="Eye Distance",
        description="Adjust the distance between eyes",
        default=1.0,
        min=0.1,
        max=2.0,
        step=0.01,
        update=lambda self, context: update_face_mesh(self, context)
    )
    
    nose_height: FloatProperty(
        name="Nose Height",
        description="Adjust the height of the nose",
        default=1.0,
        min=0.1,
        max=2.0,
        step=0.01,
        update=lambda self, context: update_face_mesh(self, context)
    )
    
    mouth_width: FloatProperty(
        name="Mouth Width",
        description="Adjust the width of the mouth",
        default=1.0,
        min=0.1,
        max=2.0,
        step=0.01,
        update=lambda self, context: update_face_mesh(self, context)
    )
    
    chin_height: FloatProperty(
        name="Chin Height",
        description="Adjust the height of the chin",
        default=1.0,
        min=0.1,
        max=2.0,
        step=0.01,
        update=lambda self, context: update_face_mesh(self, context)
    )
    
    # Mesh Settings
    subdivision_level: IntProperty(
        name="Subdivision Level",
        description="Level of mesh subdivision for detail",
        default=2,
        min=0,
        max=5
    )
    
    enable_mirror: BoolProperty(
        name="Mirror Modifier",
        description="Enable mirror modifier for symmetrical editing",
        default=True
    )
    
    enable_smoothing: BoolProperty(
        name="Smooth Shading",
        description="Enable smooth shading for the mesh",
        default=True
    )
    
    # Photo Collection
    reference_photos: CollectionProperty(type=FaceBuilderPhotoItem)
    active_photo_index: IntProperty(name="Active Photo", default=0)
    
    # Generation Settings
    mesh_resolution: EnumProperty(
        name="Mesh Resolution",
        items=[
            ('LOW', 'Low (2K vertices)', 'Low resolution mesh for fast editing'),
            ('MEDIUM', 'Medium (8K vertices)', 'Medium resolution for most use cases'),
            ('HIGH', 'High (32K vertices)', 'High resolution for detailed work'),
        ],
        default='MEDIUM'
    )
    
    auto_align: BoolProperty(
        name="Auto Alignment",
        description="Automatically align reference photos",
        default=True
    )
    
    generate_textures: BoolProperty(
        name="Generate Textures",
        description="Automatically generate textures from photos",
        default=True
    )

def update_face_mesh(self, context):
    """Update face mesh when parameters change"""
    if context.object and context.object.get("facebuilder_mesh"):
        # Update mesh based on new parameters
        from . import utils
        utils.update_face_parameters(context.object, self)

def register():
    """Register properties"""
    bpy.utils.register_class(FaceBuilderPhotoItem)
    bpy.utils.register_class(FaceBuilderProperties)
    
    # Add properties to scene
    bpy.types.Scene.facebuilder = PointerProperty(type=FaceBuilderProperties)

def unregister():
    """Unregister properties"""
    del bpy.types.Scene.facebuilder
    
    bpy.utils.unregister_class(FaceBuilderProperties)
    bpy.utils.unregister_class(FaceBuilderPhotoItem)