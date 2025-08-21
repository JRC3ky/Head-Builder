# Assets Directory

This directory contains assets used by the Head Builder addon.

## Structure

- **meshes/**: Base head meshes and geometry templates
  - Place .blend, .obj, .fbx files here
  - Use descriptive names like "base_head_male.blend"

- **textures/**: Texture files for heads
  - Skin textures, normal maps, roughness maps
  - Supported formats: .png, .jpg, .exr, .hdr
  - Organize by type (diffuse/, normal/, roughness/, etc.)

- **materials/**: Pre-configured Blender materials
  - .blend files containing material node setups
  - Material presets for different skin types

## Usage in Code

Access assets using relative paths from the addon directory:

```python
import os
addon_dir = os.path.dirname(__file__)
mesh_path = os.path.join(addon_dir, "assets", "meshes", "base_head.blend")
```

## Guidelines

1. Keep file sizes reasonable for distribution
2. Use power-of-2 texture dimensions when possible
3. Include both high and low resolution versions for performance
4. Document any special requirements or dependencies